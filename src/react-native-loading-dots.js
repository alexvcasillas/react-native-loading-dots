import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated, Easing } from "react-native";

const defaultColors = [
  "#4dabf7",
  "#3bc9db",
  "#38d9a9",
  "#69db7c"
];

function LoadingDots({ dots = 4, colors = defaultColors, size = 20, borderRadius }) {
  const [animations, setAnimations] = useState([]);
  const [reverse, setReverse] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const dotAnimations = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < dots; i++) {
      dotAnimations.push(new Animated.Value(0));
    }
    setAnimations(dotAnimations);
  }, []);

  useEffect(() => {
    if (animations.length === 0) return;
    loadingAnimation(animations, reverse);
    appearAnimation();
  }, [animations]);

  function appearAnimation() {
    Animated.timing(opacity, {
      toValue: 1,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  }

  function floatAnimation(node, reverseY, delay) {
    const floatSequence = Animated.sequence([
      Animated.timing(node, {
        toValue: reverseY ? 20 : -20,
        easing: Easing.bezier(0.41, -0.15, 0.56, 1.21),
        delay,
        useNativeDriver: true
      }),
      Animated.timing(node, {
        toValue: reverseY ? -20 : 20,
        easing: Easing.bezier(0.41, -0.15, 0.56, 1.21),
        delay,
        useNativeDriver: true
      }),
      Animated.timing(node, {
        toValue: 0,
        delay,
        useNativeDriver: true
      })
    ]);
    return floatSequence;
  }

  function loadingAnimation(nodes, reverseY) {
    Animated.parallel(
      nodes.map((node, index) => floatAnimation(node, reverseY, index * 100))
    ).start(() => {
      setReverse(!reverse);
    });
  }

  useEffect(() => {
    if (animations.length === 0) return;
    loadingAnimation(animations, reverse);
  }, [reverse, animations]);

  return (
    <Animated.View style={[styles.loading, { opacity }]}>
      {animations.map((animation, index) => (
        <Animated.View
          // eslint-disable-next-line react/no-array-index-key
          key={`loading-anim-${index}`}
          style={[
            { width: size, height: size, borderRadius: borderRadius || size / 2 },
            { backgroundColor: colors[index] || "#4dabf7" },
            { transform: [{ translateY: animation }] }
          ]}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default LoadingDots;
