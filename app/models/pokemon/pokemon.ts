import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PokemonModel = types
  .model("Pokemon")
  .props({
    id: types.identifier,
    name: types.string,
    types: types.array(types.string),
    sprite: types.string,
    base_experience: types.number,
    description: types.string,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export type PokemonType = Instance<typeof PokemonModel>
export interface Pokemon extends PokemonType {}
type PokemonSnapshotType = SnapshotOut<typeof PokemonModel>
export interface PokemonSnapshot extends PokemonSnapshotType {}
export const createPokemonDefaultModel = () => types.optional(PokemonModel, {})
