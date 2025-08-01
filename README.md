## React Native Loading Dots

High-performance, accessible loading component with smooth dot animations for your React Native project.

![Showcase of React Native Loading Dots](https://github.com/alexvcasillas/react-native-loading-dots/blob/main/ios-demo.gif?raw=true)

## Installation

```
npm i react-native-loading-dots
```

```
yarn add react-native-loading-dots
```

## Usage

```js
import React from "react";
import { View, StyleSheet } from "react-native";
import LoadingDots from "react-native-loading-dots";

function LoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <View style={styles.dotsWrapper}>
        <LoadingDots />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dotsWrapper: {
    width: 100,
  },
});
```

The above code will produce the same outcome as the demo screen capture.

### Animation Examples

```js
// Spring animation with custom tension
<LoadingDots
  animationType="spring"
  animationOptions={{ tension: 200, friction: 5 }}
/>

// Bouncy spring animation
<LoadingDots
  animationType="spring"
  animationOptions={{ tension: 100, friction: 3 }}
/>

// Timing animation with bounce easing
<LoadingDots
  animationType="timing"
  animationOptions={{
    duration: 800,
    easing: Easing.bounce
  }}
/>

// Custom colors and size with spring animation
<LoadingDots
  dots={3}
  colors={['#ff6b6b', '#4ecdc4', '#45b7d1']}
  size={25}
  animationType="spring"
  animationOptions={{ tension: 150, friction: 7 }}
/>
```

## Customization

You can pass a few props to configure the outcome a little:

### dots

```js
@type Number
default 4
```

This prop will change the number of dots that will be displayed in the animation.

### colors

```js
@type String[]
default ["#4dabf7", "#3bc9db", "#38d9a9", "#69db7c"]
```

This prop will change the color of the dots in the given array order. If you declare the array but the length doesn't match with the amount of dots defined, the dot that cannot take a color from this array will instead use a fallback color of `"#4dabf7"`.

### size

```js
@type Number
default 20
```

This prop will control the size of each dot that will be displayed for the animation.

### gap

```js
@type Number
default 0
```

This prop controls the horizontal space (in pixels) between each dot.

### borderRadius

```js
@type Number
```

This prop will control the border radius of the dots in case you want a specific amount of border radius. If you don't fill this prop it will use a rounded border radius with the formula: `size * 0.5`.

### bounceHeight

```js
@type Number
default 20
```

This prop will control the height of the bouncing for the loading dots. The higher the value the higher the will bounce up and down. From `0` to `bounceHeight` and from `0` to `-bounceHeight`.

### components

```js
@type React.ReactNode[]
default null
```

This prop will allow you to pass an array of the elements that you'd like to be rendered instead of the colored dots. If you pass `components` the `dots`, `colors`, `size` and `borderRadius` props will be ignored.

### accessibilityLabel

```js
@type String
default "Loading"
```

This prop sets the accessibility label for screen readers to announce when focusing on the loading component.

### accessibilityHint

```js
@type String
default "Content is loading, please wait"
```

This prop provides additional context for screen readers about what the loading animation represents.

### animationType

```js
@type String
default "timing"
```

This prop allows you to choose the animation type. Available options:

- `"timing"` - Smooth timing-based animation (default)
- `"spring"` - Bouncy spring animation

### animationOptions

```js
@type Object
default {}
```

This prop allows you to customize the animation behavior. Options vary by animation type:

**For Spring Animation:**

```js
animationOptions={{
  tension: 100,    // Spring tension (default: 100)
  friction: 8,     // Spring friction (default: 8)
}}
```

**For Timing Animation:**

```js
animationOptions={{
  duration: 600,   // Animation duration in ms
  easing: Easing.bounce, // Easing function
}}
```

## Performance Features

- **Optimized re-renders** - Uses React.memo to prevent unnecessary updates
- **Memoized calculations** - Expensive operations are cached for better performance
- **Memory leak prevention** - Proper cleanup of animation values on unmount
- **Efficient animations** - Uses useCallback for stable animation functions
