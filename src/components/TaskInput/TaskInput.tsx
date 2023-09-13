import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import styles from './taskInput.module.scss'
import { TodoTypes } from '../../PropTypes/todo.propTypes'
import connect from '../../HOC/connect'
import { debug, log } from '../../constants'
import Title from '../Title'

interface TaskInputProps {
  addTodo: (name: string) => void
  editTodo: (name: string) => void
  finishEditTodo: () => void
  currentTodo: Todo | null
}

function TaskInput(props: TaskInputProps & typeof injectedProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo, debug, log } = props
  const [todo, setTodo] = useState<string>('')

  const handleChangeInputTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTodo) {
      editTodo(event.target.value)
    } else {
      setTodo(event.target.value)
    }
  }
  const handleSubmitTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      setTodo('')
    } else {
      addTodo(todo)
      setTodo('')
    }
  }

  // khi re render thi se tao ra mot bien address co tham chieu moi nen component Title se re render lai
  // const address = {
  //   street: 'Truong Dinh'
  // }
  const address = useMemo(() => {
    return {
      street: 'Truong Dinh'
    }
  }, [currentTodo])

  // tuong tu nhu bien thi khi rerender lai component thi chung ta lai co function moi vi function la object
  // han che tao ra function moi dung useCallback
  const handleClickTitle = useCallback((value: any) => {
    console.log(value)
  }, [])

  return (
    <div className='mb-2'>
      <Title address={address} handleClickTitle={handleClickTitle} />
      <form className={styles.form} onSubmit={handleSubmitTodo}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : todo}
          onChange={handleChangeInputTodo}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])])
}

// export default connect(TaskInput)
const injectedProps = { debug: debug, log: log }
export default connect(injectedProps)(TaskInput)
