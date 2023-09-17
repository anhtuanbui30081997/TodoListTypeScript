import { ActionType } from './actions'

export const initialState = {
  age: 26
}

export const init = (initialArg: typeof initialState) => {
  //   console.log('init')
  return { ...initialArg, age: initialArg.age + 4 }
}

export const log = () => {
  return (state: typeof initialState, action: ActionType) => {
    console.group(action.type)
    console.log('Previous state', state)
    const nextState = reducer(state, action)
    console.log('Next state', nextState)
    console.groupEnd()
    return nextState
  }
}

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case 'increase_age':
      return { ...state, age: state.age + 1 }
    case 'decrease_age':
      return { ...state, age: state.age - 1 }
    case 'increase_xage':
      return { ...state, age: state.age + action.payload }
    default:
      throw Error('Invalid Action', action)
  }
}

export default reducer
