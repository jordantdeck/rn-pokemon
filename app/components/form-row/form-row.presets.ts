import { ViewStyle } from "react-native"
import { VStyle } from "../../context/theme"

/**
 * The size of the border radius.
 */
const RADIUS = 8

/**
 * The default style of the container.
 */
const ROOT: VStyle = ({color, spacing}) => ({
  borderWidth: 1,
  borderColor: color.line,
  padding: spacing[2],
})

/**
 * What each of the presets look like.
 */
export const PRESETS = (theme) => {
  const {color} = theme
  return {
  /**
   * Rounded borders on the the top only.
   */
  top: {
    ...ROOT(theme),
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    borderBottomWidth: 0,
  },
  /**
   * No rounded borders.
   */
  middle: {
    ...ROOT(theme),
    borderBottomWidth: 0,
  },
  /**
   * Rounded borders on the bottom.
   */
  bottom: {
    ...ROOT(theme),
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
  },
  /**
   * Rounded borders everywhere.
   */
  soloRound: {
    ...ROOT(theme),
    borderRadius: RADIUS,
  },
  /**
   * Straight borders everywhere.
   */
  soloStraight: {
    ...ROOT(theme),
  },
  /**
   * Transparent borders useful to keep things lined up.
   */
  clear: {
    ...ROOT(theme),
    borderColor: color.transparent,
  },
}}

/**
 * The names of the presets supported by FormRow.
 */
export type FormRowPresets = keyof typeof PRESETS
