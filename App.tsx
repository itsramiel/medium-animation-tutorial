import { StatusBar } from "expo-status-bar";
import { StyleSheet, Pressable, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const FAB_SIZE = 70;
const INITIAL_COLOR = "#d00000";
const FINAL_COLOR = "#4BB543";

const VIEW_HEIGHT = Math.sqrt(Math.pow(FAB_SIZE, 2) / 2);
const VIEW_WIDTH = 3;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function App() {
  const progress = useSharedValue<0 | 1>(0);

  const FabStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [INITIAL_COLOR, FINAL_COLOR]
      ),
    };
  }, []);

  const style1 = useAnimatedStyle(() => {
    const degress = interpolate(progress.value, [0, 1], [0, 50]);
    return {
      width: VIEW_WIDTH,
      height: VIEW_HEIGHT,
      backgroundColor: "white",
      position: "absolute",
      top: FAB_SIZE / 2 - VIEW_HEIGHT / 2,
      left: FAB_SIZE / 2 - VIEW_WIDTH / 2,
      // transform: [{ rotate: `${degress}deg` }],
    };
  }, []);
  const style2 = useAnimatedStyle(() => {
    const SHORTENED_HEIGHT = VIEW_HEIGHT * 0.3;
    const width = interpolate(
      progress.value,
      [0, 1],
      [VIEW_HEIGHT, SHORTENED_HEIGHT]
    );
    const deg = interpolate(progress.value, [0, 1], [0, 50]);
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [0, VIEW_HEIGHT / 2 - VIEW_WIDTH / 2]
    );
    const translateX = -interpolate(
      progress.value,
      [0, 1],
      [0, SHORTENED_HEIGHT / 2 - VIEW_WIDTH / 2]
    );
    return {
      width: width,
      height: VIEW_WIDTH,
      backgroundColor: "white",
      position: "absolute",
      top: FAB_SIZE / 2 - VIEW_WIDTH / 2,
      left: FAB_SIZE / 2 - width / 2,
      transform: [{ rotate: `${deg}deg` }, { translateY }, { translateX }],
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AnimatedPressable
        style={[styles.fabContainer, FabStyle]}
        onPress={() => (progress.value = withTiming(1))}
        onLongPress={() => (progress.value = withTiming(0))}
      >
        <Animated.View style={style1} />
        <Animated.View style={style2} />
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: INITIAL_COLOR,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
