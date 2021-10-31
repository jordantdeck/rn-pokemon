import React, { FC } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Screen,
  AutoImage as Image,
  Box,
  Text
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { TStyle, useTheme, VStyle } from "../../context/theme" 
import { useStores } from "../../models"

const podedexLogo = require('./pokedexLogo.png')

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
  flexDirection: "row",
  marginVertical: spacing[2],
  alignItems: "center",
  backgroundColor: color.pokemonItemBg,
  borderRadius: spacing[2],
})

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    
    const { theme } = useTheme()

    const rootStore = useStores()

    return (
      <View testID="WelcomeScreen" style={FULL(theme)}>
        <Screen style={CONTAINER(theme)} preset="fixed">
          <Box style={POKEMON_LOGO(theme)}>
            <Image source={podedexLogo} style={{flex: 1, resizeMode: 'contain', height: undefined, width: undefined}} />
          </Box>
          <FlatList 
            data={rootStore.pokemon}
            renderItem={({item}) => 
              <TouchableOpacity style={POKEMON_LIST(theme)} onPress={() => {
                rootStore.setPokemon(item)
                navigation.navigate("details")
              }}>
                <Image source={{uri: item.sprite}} />
                <Text style={POKEMON_ITEM(theme)}>{item.name}</Text>
              </TouchableOpacity>
            }
          />
        </Screen>
      </View>
    )
  },
)
