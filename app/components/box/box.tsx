import * as React from "react"
import { StyleProp, View, ViewStyle, ScaledSize, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Theme, useTheme } from "../../context/theme"
export interface BoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  padding?: number | object;
  margin?: number;
  backgroundColor?: string;
}

interface GetBreakPointForScreenSizeArgs {
  theme: Theme;
  dimensions: ScaledSize
}

const GetBreakPointForScreenSize = ({ theme, dimensions }: GetBreakPointForScreenSizeArgs): string => {
  const sortedBreakpoints = Object.entries<number>(theme.breakpoints).sort(
    (valA, valB) => {
      return valA[1] - valB[1]
    }
  )

  // @ts-ignore - TS doesn't know about the type of the first element of the array
  return sortedBreakpoints.reduce((acc, [breakpoint, minWidth]) => {
    if (dimensions.width >= minWidth) return breakpoint[0]
    return acc
  }, null)
}

interface GetResponsiveValueArgs {
  value: number | string | object;
  dimensions: ScaledSize;
  theme: Theme;
}

const getResponsiveValue = ({value, dimensions, theme}: GetResponsiveValueArgs) => {
  if (typeof value === 'object') {
    return value[GetBreakPointForScreenSize({theme, dimensions})]
  }
  return value
}

/**
 * Describe your component here
 */
export const Box = observer(function Box({style, padding, margin, backgroundColor, ...rest}: BoxProps) {
  const {theme} = useTheme()
  const dimensions = Dimensions.get('window')

  return (
    <View style={{
      margin: margin ? theme.spacing[getResponsiveValue({value: margin, dimensions, theme})] : undefined,
      padding: padding ? theme.spacing[getResponsiveValue({value: padding, dimensions, theme})] : undefined,
      backgroundColor: backgroundColor ? theme.color[getResponsiveValue({value: backgroundColor, dimensions, theme})] : undefined,
      // @ts-ignore - TS doesn't know about the type of the first element of the array
      ...style
    }}
    {...rest}
    />
  )
})
