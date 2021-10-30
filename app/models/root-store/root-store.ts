import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { PokemonModel } from "../pokemon/pokemon"
const pokemonData = require("./pokemon-data.json")

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  pokemon: types.array(PokemonModel)
}).actions(self => ({
  afterCreate() { 
    self.pokemon = pokemonData.pokemon
  }
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface Player extends Instance<typeof PokemonModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
