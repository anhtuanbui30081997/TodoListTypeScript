import { Todo } from '../../@types/todo.type'
import PropTypes from 'prop-types'
import styles from './taskList.module.scss'
import { TodoTypes } from '../../PropTypes/todo.propTypes'

interface TaskListProps {
  doneTaskList?: boolean
  todoList: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEdit: (id: string) => void
  deleteTodo: (id: string) => void
}

function TaskList(props: TaskListProps) {
  const { doneTaskList, todoList, handleDoneTodo, startEdit, deleteTodo } = props

  const handleChecked = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTodo(id, event.target.checked)
  }

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoan thanh' : ' Chua hoan thanh'}</h2>
      <div className={styles.tasks}>
        {todoList.map((todo: Todo) => {
          return (
            <div className={styles.task} key={todo.id}>
              <input
                type='checkbox'
                className={styles.taskCheckbox}
                checked={todo.done}
                onChange={handleChecked(todo.id)}
              />
              <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
              <div className={styles.taskActions}>
                <button className={styles.taskBtn} onClick={() => startEdit(todo.id)}>
                  🖋️
                </button>
                <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
                  🗑️
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todoList: PropTypes.arrayOf(TodoTypes),
  handleDoneTodo: PropTypes.func.isRequired,
  startEdit: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}

export default TaskList
