import { SET_FILTER } from './actionTypes'
import { FilterTypes } from '../constants'
import { ActionType } from './actionTypes'

export default (state = FilterTypes.ALL, action: ActionType) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.filter
    }
    default:
      return state
  }
}
