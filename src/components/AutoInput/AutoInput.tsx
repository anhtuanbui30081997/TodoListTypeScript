import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import styles from './autoInput.module.scss'

const Input = forwardRef<{ type: () => void }>((props, ref) => {
  const [value, setValue] = useState<string>('')
  const initialString = 'Thằng buối chàu học hành đến đâu rồi? Hoc hanh tu te vao'
  const inputRef = useRef<HTMLInputElement>(null)

  const type = () => {
    let index = 0
    inputRef.current?.focus()
    let interval: NodeJS.Timer = setInterval(() => {
      setValue(initialString.slice(0, index))
      if (index === initialString.length) {
        return clearInterval(interval)
      }
      index++
    }, 100)
  }

  useImperativeHandle(ref, () => {
    return { type }
  })
  return (
    <div className={styles.inputCom}>
      <div>AutoInput</div>
      <input type='text' className={styles.input} ref={inputRef} value={value} />
    </div>
  )
})

export default function AutoInput() {
  const inputFuncRef = useRef<{ type: () => void }>({ type: () => {} })
  const handleClick = () => {
    inputFuncRef.current.type()
  }
  return (
    <div className={styles.autoInput}>
      <button onClick={handleClick}>Click to show autoInput</button>
      <Input ref={inputFuncRef} />
    </div>
  )
}
