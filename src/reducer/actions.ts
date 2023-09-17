export type ActionType = IncreaseAgeAction | DecreaseAgeAction | IncreaseXAgeAction
type IncreaseAgeAction = { type: 'increase_age' }
type DecreaseAgeAction = { type: 'decrease_age' }
type IncreaseXAgeAction = { type: 'increase_xage'; payload: number }

export const increaseAgeAction = (): IncreaseAgeAction => {
  return { type: 'increase_age' }
}
export const decreaseAgeAction = (): DecreaseAgeAction => {
  return { type: 'decrease_age' }
}
export const increaseXAgeAction = (payload: number): IncreaseXAgeAction => {
  return { type: 'increase_xage', payload }
}
