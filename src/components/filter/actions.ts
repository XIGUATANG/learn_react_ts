import { SET_FILTER } from './actionTypes'

export interface filterAction {
  type: string
  filter: string
}
export const setFilter: (type: string) => filterAction = filterType => ({
  type: SET_FILTER,
  filter: filterType
})
