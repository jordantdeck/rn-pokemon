import { TextStyle } from "react-native"
import { TStyle } from "../../context/theme"

/**
 * All text will start off looking like this.
 */
const BASE: TStyle = ({color, typography}) => ({
  fontFamily: typography.primary,
  color: color.text,
  fontSize: 15,
})

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = (theme) => {
  const { color } = theme
  return({
    /**
       * The default text styles.
       */
    default: BASE(theme),

    /**
      * A bold version of the default text.
      */
    bold: { ...BASE(theme), fontWeight: "bold" } as TextStyle,

    /**
      * Large headers.
      */
    header: { ...BASE(theme), fontSize: 24, fontWeight: "bold" } as TextStyle,

    /**
      * Field labels that appear on forms above the inputs.
      */
    fieldLabel: { ...BASE(theme), fontSize: 13, color: color.dim } as TextStyle,

    /**
      * A smaller piece of secondary information.
      */
    secondary: { ...BASE(theme), fontSize: 9, color: color.dim } as TextStyle,
  })}
  

/**
 * A list of preset names.
 */
export type TextPresets = 'default' | 'bold' | 'header' | 'fieldLabel' | 'secondary'
