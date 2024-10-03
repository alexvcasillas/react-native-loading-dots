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
  gap?: number;
  /** Custom components to use instead of default dots */
  components?: React.ReactNode[];
}

declare const LoadingDots: (props: LoadingDotsProps) => JSX.Element;

export default LoadingDots;
