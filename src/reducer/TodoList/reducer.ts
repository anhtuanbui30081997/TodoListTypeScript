import { ActionType } from './action'
import { Todo } from '../../@types/todo.type'

export const initialTodos: Todo[] = []

const reducerTodos = (state: Todo[], action: ActionType) => {
  switch (action.type) {
    case 'initial_todos':
      const todosString = localStorage.getItem('todos')
      const todosObj: Todo[] = JSON.parse(todosString || '[]')
      return [...todosObj]
    case 'add_todo':
      return [...state, action.payload]
    case 'done_todo':
      return [...action.payload]
    case 'finish_edit_todo':
      return [...action.payload]
    case 'delete_todo':
      return [...action.payload]
    default:
      throw Error('Invalid action type')
  }
}

export default reducerTodos
