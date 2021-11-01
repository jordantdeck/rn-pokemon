import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
const pokemonData = require("./pokemon-data.json")

export const PokemonModel = types
  .model("Pokemon")
  .props({
    id: types.identifier,
    name: types.string,
    types: types.array(types.string),
    sprite: types.string,
    base_experience: types.number,
    description: types.string,
    favorite: types.optional(types.boolean, false)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    toggleFavorite() {
      self.favorite = !self.favorite
    },
  }))
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  pokemon: types.array(PokemonModel),
  currentPokemon: types.maybe(types.reference(PokemonModel))
}).actions(self => ({
  afterCreate() { 
    self.pokemon = pokemonData.pokemon
  },
  setPokemon(pokemon) {
    self.currentPokemon = pokemon
  },
}))
.views(self => ({
  get pokemonByFavorite() {
    return self.pokemon.slice().sort((a, b) => a.favorite ? -1 : 1)
  },
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface Pokemon extends Instance<typeof PokemonModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
