import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
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
 * @param {string} animationType
 * @param {object} animationOptions
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
  animationType = "timing",
  animationOptions = {},
}) {
  // Prop validation for better developer experience
  if (__DEV__) {
    if (dots < 1) {
      console.warn("LoadingDots: dots should be >= 1, received:", dots);
    }
    if (size < 0) {
      console.warn("LoadingDots: size should be >= 0, received:", size);
    }
    if (bounceHeight < 0) {
      console.warn(
        "LoadingDots: bounceHeight should be >= 0, received:",
        bounceHeight
      );
    }
    if (gap < 0) {
      console.warn("LoadingDots: gap should be >= 0, received:", gap);
    }
    if (borderRadius !== undefined && borderRadius < 0) {
      console.warn(
        "LoadingDots: borderRadius should be >= 0, received:",
        borderRadius
      );
    }
    if (colors && !Array.isArray(colors)) {
      console.warn(
        "LoadingDots: colors should be an array, received:",
        typeof colors
      );
    }
    if (components && !Array.isArray(components)) {
      console.warn(
        "LoadingDots: components should be an array, received:",
        typeof components
      );
    }
    if (!["timing", "spring"].includes(animationType)) {
      console.warn(
        'LoadingDots: animationType should be "timing" or "spring", received:',
        animationType
      );
    }
    if (animationOptions && typeof animationOptions !== "object") {
      console.warn(
        "LoadingDots: animationOptions should be an object, received:",
        typeof animationOptions
      );
    }
  }

  const [animations, setAnimations] = useState([]);
  const [reverse, setReverse] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;

  // Memoize the number of animations to prevent unnecessary recalculations
  const animationsAmount = useMemo(() => {
    return !!components && Array.isArray(components) ? components.length : dots;
  }, [components, dots]);

  useEffect(() => {
    const dotAnimations = [];
    for (let i = 0; i < animationsAmount; i++) {
      dotAnimations.push(new Animated.Value(0));
    }
    setAnimations(dotAnimations);

    // Cleanup function to prevent memory leaks
    return () => {
      dotAnimations.forEach((animation) => {
        animation.stopAnimation();
      });
      opacity.stopAnimation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationsAmount]);

  useEffect(() => {
    if (animations.length === 0) return;
    loadingAnimation(animations, reverse);
    appearAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animations]);

  const appearAnimation = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  // Create animation function based on type
  const createAnimation = useCallback(
    (value, toValue, delay = 0) => {
      const baseOptions = {
        delay,
        useNativeDriver: true,
        ...animationOptions,
      };

      switch (animationType) {
        case "spring":
          return Animated.spring(value, {
            toValue,
            tension: 100,
            friction: 8,
            ...baseOptions,
          });
        case "timing":
        default:
          return Animated.timing(value, {
            toValue,
            easing: Easing.bezier(0.41, -0.15, 0.56, 1.21),
            ...baseOptions,
          });
      }
    },
    [animationType, animationOptions]
  );

  const floatAnimation = useCallback(
    (node, reverseY, delay) => {
      const floatSequence = Animated.sequence([
        createAnimation(node, reverseY ? bounceHeight : -bounceHeight, delay),
        createAnimation(node, reverseY ? -bounceHeight : bounceHeight, delay),
        createAnimation(node, 0, delay),
      ]);
      return floatSequence;
    },
    [bounceHeight, createAnimation]
  );

  const loadingAnimation = useCallback(
    (nodes, reverseY) => {
      Animated.parallel(
        nodes.map((node, index) => floatAnimation(node, reverseY, index * 100))
      ).start(() => {
        setReverse(!reverse);
      });
    },
    [floatAnimation, reverse]
  );

  useEffect(() => {
    if (animations.length === 0) return;
    loadingAnimation(animations, reverse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reverse, animations]);

  // Memoize the dot styles to prevent unnecessary recalculations
  const dotStyles = useMemo(
    () => ({
      width: size,
      height: size,
      borderRadius: borderRadius || size * 0.5,
    }),
    [size, borderRadius]
  );

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
              dotStyles,
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

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(LoadingDots);
