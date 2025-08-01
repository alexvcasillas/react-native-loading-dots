import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated, Easing } from "react-native";

const defaultColors = ["#4dabf7", "#3bc9db", "#38d9a9", "#69db7c"];

/**
 * React Component that creates a smooth loading animation with dots
 * or custom components
 * @param {number} dots
 * @param {string[]} colors
 * @param {number} size
 * @param {number} bounceHeight
 * @param {number} borderRadius
 * @param {number} gap
 * @param {React.ReactNode[]} components
 * @param {string} accessibilityLabel
 * @param {string} accessibilityHint
 * @param {boolean} paused
 * @param {function} onComplete
 * @param {number} duration
 * @returns React.JSX.Element
 */
function LoadingDots({
  dots = 4,
  colors = defaultColors,
  size = 20,
  bounceHeight = 20,
  borderRadius,
  components = null,
  gap = 0,
  accessibilityLabel = "Loading",
  accessibilityHint = "Content is loading, please wait",
  paused = false,
  onComplete = null,
  duration = 600,
}) {
  // Prop validation for better developer experience
  if (__DEV__) {
    if (dots < 1) {
      console.warn('LoadingDots: dots should be >= 1, received:', dots);
    }
    if (size < 0) {
      console.warn('LoadingDots: size should be >= 0, received:', size);
    }
    if (bounceHeight < 0) {
      console.warn('LoadingDots: bounceHeight should be >= 0, received:', bounceHeight);
    }
    if (gap < 0) {
      console.warn('LoadingDots: gap should be >= 0, received:', gap);
    }
    if (borderRadius !== undefined && borderRadius < 0) {
      console.warn('LoadingDots: borderRadius should be >= 0, received:', borderRadius);
    }
    if (colors && !Array.isArray(colors)) {
      console.warn('LoadingDots: colors should be an array, received:', typeof colors);
    }
    if (components && !Array.isArray(components)) {
      console.warn('LoadingDots: components should be an array, received:', typeof components);
    }
    if (typeof paused !== 'boolean') {
      console.warn('LoadingDots: paused should be a boolean, received:', typeof paused);
    }
    if (onComplete && typeof onComplete !== 'function') {
      console.warn('LoadingDots: onComplete should be a function, received:', typeof onComplete);
    }
    if (duration < 0) {
      console.warn('LoadingDots: duration should be >= 0, received:', duration);
    }
  }

  const [animations, setAnimations] = useState([]);
  const [reverse, setReverse] = useState(false);
  const [isRunning, setIsRunning] = useState(!paused);

  const opacity = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    const dotAnimations = [];
    let animationsAmount =
      !!components && Array.isArray(components) ? components.length : dots;
    for (let i = 0; i < animationsAmount; i++) {
      dotAnimations.push(new Animated.Value(0));
    }
    setAnimations(dotAnimations);

    // Cleanup function to stop animations on unmount
    return () => {
      dotAnimations.forEach(animation => {
        animation.stopAnimation();
      });
      opacity.stopAnimation();
    };
  }, []);

  // Handle pause/resume
  useEffect(() => {
    setIsRunning(!paused);
  }, [paused]);

  useEffect(() => {
    if (animations.length === 0) return;
    if (isRunning) {
      loadingAnimation(animations, reverse);
    } else {
      // Stop current animation when paused
      if (animationRef.current) {
        animationRef.current.stop();
      }
    }
    appearAnimation();
  }, [animations, isRunning]);

  function appearAnimation() {
    Animated.timing(opacity, {
      toValue: 1,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }

  function floatAnimation(node, reverseY, delay) {
    const floatSequence = Animated.sequence([
      Animated.timing(node, {
        toValue: reverseY ? bounceHeight : -bounceHeight,
        easing: Easing.bezier(0.41, -0.15, 0.56, 1.21),
        delay,
        duration: duration / 3,
        useNativeDriver: true,
      }),
      Animated.timing(node, {
        toValue: reverseY ? -bounceHeight : bounceHeight,
        easing: Easing.bezier(0.41, -0.15, 0.56, 1.21),
        delay,
        duration: duration / 3,
        useNativeDriver: true,
      }),
      Animated.timing(node, {
        toValue: 0,
        delay,
        duration: duration / 3,
        useNativeDriver: true,
      }),
    ]);
    return floatSequence;
  }

  function loadingAnimation(nodes, reverseY) {
    if (!isRunning) return;
    
    const animationSequence = Animated.parallel(
      nodes.map((node, index) => floatAnimation(node, reverseY, index * 100))
    );
    
    animationRef.current = animationSequence;
    
    animationSequence.start((finished) => {
      if (finished && isRunning) {
        // Call onComplete callback at the end of each cycle
        if (onComplete && typeof onComplete === 'function') {
          onComplete();
        }
        setReverse(!reverse);
      }
    });
  }

  useEffect(() => {
    if (animations.length === 0) return;
    if (isRunning) {
      loadingAnimation(animations, reverse);
    }
  }, [reverse, animations, isRunning]);

  return (
    <Animated.View 
      style={[styles.loading, { opacity, gap }]}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="progressbar"
      accessible={true}
    >
      {animations.map((animation, index) =>
        components ? (
          <Animated.View
            key={`loading-anim-${index}`}
            style={[{ transform: [{ translateY: animation }] }]}
          >
            {components[index]}
          </Animated.View>
        ) : (
          <Animated.View
            key={`loading-anim-${index}`}
            style={[
              {
                width: size,
                height: size,
                borderRadius: borderRadius || size / 2,
              },
              { backgroundColor: colors[index] || "#4dabf7" },
              { transform: [{ translateY: animation }] },
            ]}
          />
        )
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default LoadingDots;
