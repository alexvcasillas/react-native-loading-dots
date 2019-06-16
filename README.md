## React Native Loading Dots

Smooth dot loading component for your React Native project.

![Showcase of React Native Loading Dots](https://github.com/alexvcasillas/react-native-loading-dots/blob/master/ios-demo.gif?raw=true)

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
  )
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  dotsWrapper: {
    width: 100
  }
})
```

The above code will produce the same outcome as the demo screen capture.

## Customization

You can pass a few props to configure the outcome a little:

### dots

```js
@type {Number}
default 4
```

This prop will change the number of dots that will be displayed in the animation.

### colors

```js
@type {String[]}
default ["#4dabf7", "#3bc9db", "#38d9a9", "#69db7c"]
```

This prop will change the color of the dots in the given array order. If you declare the array but the length doesn't match with the amount of dots defined, the dot that cannot take a color from this array will instead use a fallback color of `"#4dabf7"`.