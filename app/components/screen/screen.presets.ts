import { ViewStyle } from "react-native"
import { Theme } from "../../context/theme"
/**
 * All screen keyboard offsets.
 */
export const offsets = {
  none: 0,
}

/**
 * The variations of keyboard offsets.
 */
export type KeyboardOffsets = keyof typeof offsets

/**
 * All the variations of screens.
 */
export const presets: (theme: Theme) => Record<ScreenPresets, Record<string, ViewStyle>> = ({color}) => ({
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: "100%",
    },
    inner: {
      justifyContent: "flex-start",
      alignItems: "stretch",
      height: "100%",
      width: "100%",
    },
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: "100%",
    },
    inner: { justifyContent: "flex-start", alignItems: "stretch" },
  },
})

/**
 * The variations of screens.
 */
export type ScreenPresets = "fixed" | "scroll"

/**
 * Is this preset a non-scrolling one?
 *
 * @param preset The preset to check
 */
export function isNonScrolling(theme: Theme, preset?: ScreenPresets) {
  // any of these things will make you scroll
  return !preset || !presets(theme)[preset] || preset === "fixed"
}
