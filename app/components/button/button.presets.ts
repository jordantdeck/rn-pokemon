import { ViewStyle, TextStyle } from "react-native"
import { TStyle, VStyle, Theme } from "../../context/theme"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: VStyle = ({spacing}) => ({
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
})

const BASE_TEXT: TStyle = ({spacing}) => ({
  paddingHorizontal: spacing[3],
})

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = (theme: Theme) => {
  const { color } = theme

  return {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW(theme), backgroundColor: color.error } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW(theme),
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}}

export type ViewPresetNames = keyof ReturnType<typeof viewPresets>

export const textPresets = (theme: Theme) => {
  const { color } = theme
  const baseText = BASE_TEXT(theme)
  return {
  primary: { ...baseText, fontSize: 9, color: color.text } as TextStyle,
  link: {
    ...baseText,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof ReturnType<typeof textPresets>
