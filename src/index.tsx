import * as React from 'react';
import type { LayoutRectangle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  runOnJS,
  type SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';

// Clone of the marquee text
const ScrollingTextClone = ({
  index,
  children,
  anim,
  textLayout,
}: React.PropsWithChildren<{
  index: number;
  anim: SharedValue<number>;
  textLayout: SharedValue<LayoutRectangle>;
}>) => {
  // Animated styles to position the cloned text
  const styles = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: (index - 1) * (textLayout.value.width + 10), // Spacing after each clone text
      transform: [
        {
          translateX: -(
            (anim.value % (textLayout.value.width + 10)) // Scroll the text horizontally
          ),
        },
      ],
    };
  }, [index, textLayout]);

  // Return the cloned text element with animated styles
  return <Animated.View style={styles}>{children}</Animated.View>;
};

// Marquee text component
export const MarqueeText = React.memo(
  ({
    speed = 1,
    text = '',
    textStyles = {},
  }: React.PropsWithChildren<{
    speed?: number;
    text: string;
    textStyles?: {};
  }>) => {
    // Store measurements of the parent layout and text
    const parentLayout = useSharedValue<LayoutRectangle>({
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    });
    const textLayout = useSharedValue<LayoutRectangle>({
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    });

    // number clones of the text are needed for scrolling
    const [numberOfClones, setNumberOfClones] = React.useState(0);

    // animated value for the scrolling animation
    const scrollAnimationValue = useSharedValue(0);

    const frameRateMs = 30; // frame rate

    // update the animation on each animation
    useFrameCallback((frameInfo) => {
      if (frameInfo.timeSincePreviousFrame === null) {
        return;
      }

      const frameDelta = frameInfo.timeSincePreviousFrame / frameRateMs;

      scrollAnimationValue.value += speed * frameDelta; // Update the scroll animation
    }, true);

    // update the number of clones based on text size
    useAnimatedReaction(
      () => {
        // If the text or parent container size is zero - zero clones
        if (
          textLayout.value.width === 0 ||
          parentLayout.value.width === 0 ||
          textLayout.value.height === 0 ||
          parentLayout.value.height === 0
        ) {
          return 0;
        }
        // Calculate the number of clones needed based on the parent layout
        return (
          Math.round(parentLayout.value.width / textLayout.value.width) + 1 // Adding extra clones to ensure the loop continues
        );
      },
      (v) => {
        if (v === 0) {
          return; // No clones if the measurement values are zero
        }
        runOnJS(setNumberOfClones)(v + 2); // Set the clone count in JS thread (runOnJS avoids Reanimated thread issues)
      },
      []
    );

    return (
      <Animated.View
        onLayout={(ev) => {
          parentLayout.value = ev.nativeEvent.layout; // dimensions of the parent container
        }}
        pointerEvents="box-none"
      >
        <Animated.View style={styles.row} pointerEvents="box-none">
          <Animated.ScrollView
            horizontal
            style={styles.scrollContainer}
            pointerEvents="box-none"
          >
            <View
              onLayout={(ev) => {
                textLayout.value = ev.nativeEvent.layout; // width of the text
              }}
            >
              <Text style={textStyles}>{text}</Text>
            </View>
          </Animated.ScrollView>
          {numberOfClones > 0 &&
            // Render the clones
            [...Array(numberOfClones).keys()].map((index) => {
              return (
                <ScrollingTextClone
                  key={`clone-${index}`}
                  index={index}
                  anim={scrollAnimationValue}
                  textLayout={textLayout}
                >
                  <Text style={textStyles}>{text}</Text>
                </ScrollingTextClone>
              );
            })}
        </Animated.View>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  scrollContainer: { opacity: 0, zIndex: -9999 }, // invisible scrollView
  row: { flexDirection: 'row', overflow: 'hidden' }, //cloned texts in a horizontal row
});
