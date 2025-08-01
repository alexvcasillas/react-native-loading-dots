import { JSX } from "react";

export interface LoadingDotsProps {
  /** Number of dots to display */
  dots?: number;
  /** Array of color strings for the dots */
  colors?: string[];
  /** Size of each dot */
  size?: number;
  /** Height of the bounce animation for the dots */
  bounceHeight?: number;
  /** Border radius of the dots */
  borderRadius?: number;
  /** Gap between the dots */
  gap?: number;
  /** Custom components to use instead of default dots */
  components?: React.ReactNode[];
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Accessibility hint for screen readers */
  accessibilityHint?: string;
  /** Type of animation to use: "timing" or "spring" */
  animationType?: "timing" | "spring";
  /** Options for the animation (tension, friction, duration, etc.) */
  animationOptions?: {
    tension?: number;
    friction?: number;
    duration?: number;
    easing?: any;
    velocity?: number;
    deceleration?: number;
    [key: string]: any;
  };
}

declare const LoadingDots: (props: LoadingDotsProps) => JSX.Element;

export default LoadingDots; 