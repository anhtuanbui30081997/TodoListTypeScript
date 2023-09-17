import { useReducer } from 'react'
import styles from './counter.module.scss'
import { init, initialState, log } from '../../reducer/Counter/reducer'
import { decreaseAgeAction, increaseAgeAction, increaseXAgeAction } from '../../reducer/Counter/actions'

export default function Counter() {
  const [state, dispacth] = useReducer(log(), initialState, init)

  const handleDecreaseAge = () => {
    dispacth(decreaseAgeAction())
  }

  const handleIncreaseAge = () => {
    dispacth(increaseAgeAction())
  }

  const increaseXAge = (value: number) => {
    dispacth(increaseXAgeAction(value))
  }
  return (
    <div className={styles.counter}>
      <button className={styles.decreaseBtn} onClick={handleDecreaseAge}>
        Decrease age
      </button>
      <div className={styles.age}>Hello! you are {state.age}</div>
      <button className={styles.increaseBtn} onClick={handleIncreaseAge}>
        Increase age
      </button>
      <button className={styles.increaseBtn} onClick={() => increaseXAge(3)} style={{ color: 'blue' }}>
        Increase X age
      </button>
    </div>
  )
}
