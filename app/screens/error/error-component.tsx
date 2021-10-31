import React, { ErrorInfo } from "react"
import { TextStyle, View, ViewStyle, ScrollView, ImageStyle } from "react-native"
import { Button, Icon, Text } from "../../components"
import { TStyle, useTheme, VStyle } from "../../context/theme"

const CONTAINER: VStyle = ({color}) => ({
  alignItems: "center",
  flex: 1,
  padding: 16,
  paddingVertical: 50,
  backgroundColor: color.background,
})

const ERROR_DETAILS_CONTAINER: VStyle = ({color}) => ({
  width: "100%",
  maxHeight: "60%",
  backgroundColor: color.line,
  marginVertical: 15,
  paddingHorizontal: 10,
  paddingBottom: 15,
  borderRadius: 6,
})

const BTN_RESET: VStyle = ({color}) => ({
  paddingHorizontal: 40,

  backgroundColor: color.primary,
})

const TITLE_ERROR: TStyle = ({color}) => ({
  color: color.error,
  fontWeight: "bold",
  paddingVertical: 15,
})

const FRIENDLY_SUBTITLE: TStyle = ({color}) => ({
  color: color.primaryDarker,
  fontWeight: "normal",
  paddingVertical: 15,
})

const CONTENT_ERROR: TStyle = ({color}) => ({
  color: color.error,
  fontWeight: "bold",
  paddingVertical: 15,
})

// Uncomment this and the Text component in the ErrorComponent if
// you want to see a backtrace in your error reporting screen.
// const CONTENT_BACKTRACE: TextStyle = {
//   color: color.dim,
// }

const ICON: ImageStyle = {
  marginTop: 30,
  width: 64,
  height: 64,
}

export interface ErrorComponentProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}

/**
 * Describe your component here
 */
export const ErrorComponent = (props: ErrorComponentProps) => {
  const {theme} = useTheme()
  return (
    <View style={CONTAINER(theme)}>
      <Icon style={ICON} icon="bug" />
      <Text style={TITLE_ERROR(theme)} tx={"errorScreen.title"} />
      <Text style={FRIENDLY_SUBTITLE(theme)} tx={"errorScreen.friendlySubtitle"} />
      <View style={ERROR_DETAILS_CONTAINER(theme)}>
        <ScrollView>
          <Text selectable style={CONTENT_ERROR(theme)} text={`${props.error}`} />
          {/* <Text selectable style={CONTENT_BACKTRACE} text={`${props.errorInfo.componentStack}`} /> */}
        </ScrollView>
      </View>
      <Button style={BTN_RESET(theme)} onPress={props.onReset} tx="errorScreen.reset" />
    </View>
  )
}
