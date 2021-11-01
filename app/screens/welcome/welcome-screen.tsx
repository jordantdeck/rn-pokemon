import React, { FC } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Screen,
  AutoImage as Image,
  Box,
  Text,
  Button
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { TStyle, useTheme, VStyle } from "../../context/theme" 
import { useStores } from "../../models"

const podedexLogo = require('./pokedexLogo.png')
const pokeball = require('./pokeball.png')

const FULL: VStyle = ({ color }) => ({ flex: 1,
  backgroundColor: color.background,
})
const CONTAINER: VStyle = ({ color, spacing }) => ({
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[2],
  //alignItems: "center",
})

const POKEMON_LOGO: VStyle = ({ color, spacing }) => ({
  backgroundColor: color.background,
  alignSelf: "center",
  width: 400,
  height: 200,
  paddingHorizontal: spacing[2],
})

const POKEMON_ITEM: TStyle = ({ color, spacing }) => ({
  alignItems: "center",
  justifyContent: "center",
  color: color.text,
  fontSize: spacing[3],
  paddingLeft: spacing[2],
})

const POKEMON_LIST: VStyle = ({ spacing, color }) => ({
  flex: 1,
  flexDirection: "row",
  marginVertical: spacing[2],
  alignItems: "center",
  backgroundColor: color.pokemonItemBg,
  borderRadius: spacing[2],
})

const THEME_TOGGLE: VStyle = ({ color, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
})

const TOGGLE_BUTTON: TStyle = ({ color, spacing }) => ({
  backgroundColor: color.transparent,
  borderColor: color.text,
  borderWidth: 1,
  borderRadius: spacing[2],
  paddingHorizontal: spacing[2],
  paddingVertical: spacing[1],
  marginRight: spacing[2],
})

const POKEBALL_BOX: VStyle = ({ color, spacing }) => ({
  flexDirection: "row",
  flex: 1,
  justifyContent: "flex-end",
})

const POKEBALL: VStyle = ({ color, spacing }) => ({
  width: spacing[3],
  height: spacing[3],
  marginRight: spacing[2],
  justifyContent: "flex-end"
})

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    
    const { theme, toggleTheme, themeName } = useTheme()

    const rootStore = useStores()

    return (
      <View testID="WelcomeScreen" style={FULL(theme)}>
        <Screen style={CONTAINER(theme)} preset="fixed">
          <Box style={POKEMON_LOGO(theme)}>
            <Image source={podedexLogo} style={{flex: 1, resizeMode: 'contain', height: undefined, width: undefined}} />
          </Box>
          <Box style={THEME_TOGGLE(theme)}>
            <Button style={TOGGLE_BUTTON(theme)} text={`Switch Theme: ${themeName}`} onPress={toggleTheme} />
          </Box>
          <FlatList 
            data={rootStore.pokemonByFavorite}
            renderItem={({item}) => 
              <TouchableOpacity style={POKEMON_LIST(theme)} onPress={() => {
                rootStore.setPokemon(item)
                navigation.navigate("details")
              }}>
                <Image source={{uri: item.sprite}} />
                <Text style={POKEMON_ITEM(theme)}>{item.name}</Text>
                {
                  item.favorite ? 
                    <Box style={POKEBALL_BOX(theme)}>
                      <Box style={POKEBALL(theme)}>
                        <Image source={pokeball} style={{flex: 1, resizeMode: 'contain', height: undefined, width: undefined}} />
                      </Box>
                    </Box> : null
                }
              </TouchableOpacity>
            }
          />
        </Screen>
      </View>
    )
  },
)
