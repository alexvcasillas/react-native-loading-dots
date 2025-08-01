## React Native Loading Dots

Smooth dot loading component for your React Native project.

![Showcase of React Native Loading Dots](https://github.com/alexvcasillas/react-native-loading-dots/blob/master/ios-demo.gif?raw=true)

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

### Advanced Usage with Animation Controls

```js
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import LoadingDots from "react-native-loading-dots";

function AdvancedLoadingScreen() {
  const [paused, setPaused] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  const handleComplete = () => {
    setCycleCount((prev) => prev + 1);
  };

  return (
    <View style={styles.loadingScreen}>
      <View style={styles.dotsWrapper}>
        <LoadingDots
          dots={3}
          colors={["#ff6b6b", "#4ecdc4", "#45b7d1"]}
          size={25}
          bounceHeight={30}
          paused={paused}
          onComplete={handleComplete}
          duration={800}
          accessibilityLabel="Custom loading animation"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPaused(!paused)}
      >
        <Text>{paused ? "Resume" : "Pause"} Animation</Text>
      </TouchableOpacity>
      <Text>Animation cycles completed: {cycleCount}</Text>
    </View>
  );
}
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

```
@type Number
default 0
```

This prop controls the horizontal space (in pixels) between each dot.

### borderRadius

```
@type Number
```

This prop will control the border radius of the dots in case you want a specific amount of border radius. If you don't fill this prop it will use a rounded border radius with the formula: `size / 2`.

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

### paused

```js
@type Boolean
default false
```

This prop allows you to pause and resume the loading animation. When set to `true`, the animation will stop, and when set to `false`, it will resume.

### onComplete

```js
@type Function
default null
```

This prop accepts a callback function that will be called at the end of each animation cycle. Useful for tracking animation progress or implementing custom behaviors.

### duration

```js
@type Number
default 600
```

This prop controls the duration of each animation phase in milliseconds. The total animation cycle duration will be approximately `duration * 3` (up, down, return to center).
