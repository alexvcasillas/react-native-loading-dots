import { Image } from 'expo-image';
import { StyleSheet, View, Easing } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LoadingDots from 'react-native-loading-dots';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Loading Dots</ThemedText>
        <ThemedText type="subtitle">v1.4.1</ThemedText>
      </ThemedView>
      <View style={{flex: 1, width: '100%', flexDirection: 'column', gap: 24 }}>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{paddingBottom: 20}}>Default Timing Animation</ThemedText>
        <View style={styles.loadingContainer}>
          <LoadingDots />
        </View>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{paddingBottom: 20}}>Spring Animation</ThemedText>
        <View style={styles.loadingContainer}>
          <LoadingDots 
            animationType="spring"
            animationOptions={{ tension: 200, friction: 5 }}
          />
        </View>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{paddingBottom: 20}}>Bouncy Spring</ThemedText>
        <View style={styles.loadingContainer}>
          <LoadingDots 
            animationType="spring"
            animationOptions={{ tension: 100, friction: 3 }}
          />
        </View>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{paddingBottom: 20}}>Timing with Bounce Easing</ThemedText>
        <View style={styles.loadingContainer}>
          <LoadingDots 
            animationType="timing"
            animationOptions={{ 
              duration: 800, 
              easing: Easing.bounce 
            }}
            />
          </View>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{paddingBottom: 20}}>Custom Colors & Size</ThemedText>
        <View style={styles.loadingContainer}>
          <LoadingDots 
            dots={3}
            colors={['#ff6b6b', '#4ecdc4', '#45b7d1']}
            size={25}
            animationType="spring"
            animationOptions={{ tension: 150, friction: 7 }}
          />
        </View>
        </ThemedView>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  loadingContainer: {
    maxWidth: 150,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
