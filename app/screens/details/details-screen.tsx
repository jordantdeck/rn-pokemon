import React from "react"
import { observer } from "mobx-react-lite"
import { Screen, Text, Header, Box, AutoImage as Image, Button } from "../../components"
import { TStyle, useTheme, VStyle } from "../../context/theme"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"

const ROOT: VStyle = ({}) => ({
  flex: 1,
})

const TITLE: VStyle = ({spacing}) => ({
  marginVertical: spacing[2],
  alignItems: "center"
})

const DETAIL_HEADER: TStyle = ({spacing}) => ({
  fontSize: spacing[4],
})

const IMAGE: VStyle = ({}) => ({
  alignSelf: "center",
  width: 300,
  height: 300,
})

const DETAIL_TABLE: VStyle = ({color, spacing}) => ({
  backgroundColor: color.pokemonItemBg,
  marginHorizontal: spacing[2],
  borderRadius: spacing[3],
})

const DESCRIPTION: TStyle = ({color, spacing}) => ({
  color: color.text,
  fontSize: 30,
  padding: spacing[2],
  textAlign: "center",
})

const FAVORITE: VStyle = ({spacing, color}) => ({
  marginVertical: spacing[2],
  marginHorizontal: spacing[2],
  alignItems: "center",
  borderColor: color.text,
  borderWidth: 1,
  borderRadius: spacing[2],
  paddingHorizontal: spacing[2],
  paddingVertical: spacing[1],
})

export const DetailsScreen = observer(function DetailsScreen() {
  // Pull in one of our MST stores
  const rootStore = useStores()
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const {theme} = useTheme()

  const pokemon = rootStore.currentPokemon

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT(theme)} preset="scroll">
      <Header 
        onLeftPress={goBack}
        leftIcon="back"
      />
      <Box style={TITLE(theme)}>
        <Text preset="header" style={DETAIL_HEADER(theme)} text={pokemon.name} />  
      </Box>
      <Box style={IMAGE(theme)}>
        <Image source={{uri: pokemon.sprite}} style={{flex: 1, resizeMode: 'contain', height: undefined, width: undefined}} />
      </Box>
      <Box style={DETAIL_TABLE(theme)}>
        <Text style={DESCRIPTION(theme)} text={pokemon.description} />
      </Box>
      <Box>
        <Button style={FAVORITE(theme)} text={pokemon.favorite ? "Unfavorite" : "Favorite"} onPress={pokemon.toggleFavorite} />
      </Box>
    </Screen>
  )
})
