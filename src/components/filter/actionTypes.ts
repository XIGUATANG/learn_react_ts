import { FilterTypes } from '../constants'

export const SET_FILTER: string = 'FILTER/SET'

export interface ActionType {
  type: string
  filter: FilterTypes
}
