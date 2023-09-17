import { Todo } from '../../@types/todo.type'

type DeleteTodoAction = { type: 'delete_todo'; payload: Todo[] }
type FinishEditTodoAction = { type: 'finish_edit_todo'; payload: Todo[] }
type DoneTodoAction = { type: 'done_todo'; payload: Todo[] }
type AddTodoAction = { type: 'add_todo'; payload: Todo }
type InitialTodosAction = { type: 'initial_todos' }
export type ActionType = InitialTodosAction | AddTodoAction | DoneTodoAction | FinishEditTodoAction | DeleteTodoAction

export const initialTodoAction = () => {
  return { type: 'initial_todos' } as InitialTodosAction
}

export const addTodoAction = (payload: Todo) => {
  return { type: 'add_todo', payload } as AddTodoAction
}

export const doneTodoAction = (payload: Todo[]) => {
  return { type: 'done_todo', payload } as DoneTodoAction
}

export const finishEditTodoAction = (payload: Todo[]) => {
  return { type: 'finish_edit_todo', payload } as FinishEditTodoAction
}

export const deleteTodoAction = (payload: Todo[]) => {
  return { type: 'delete_todo', payload } as DeleteTodoAction
}
