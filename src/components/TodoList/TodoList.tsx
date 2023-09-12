import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import { Todo } from '../../@types/todo.type'
import styles from './todoList.module.scss'

type HandleNewTodos = (todos: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const handleAddTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
    syncReactToLocal((todosObj: Todo[]) => [...todosObj, todo])
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    const handle = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: done }
        }
        return todo
      })
    }
    setTodos(handle)
    syncReactToLocal(handle)
  }

  const startEditTodo = (id: string) => {
    const findTodo = todos.find((todo: Todo) => todo.id === id)
    if (findTodo) {
      setCurrentTodo(findTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishEditTodo = () => {
    const handle = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    }
    setTodos(handle)
    setCurrentTodo(null)
    syncReactToLocal(handle)
  }

  const deleteTodo = (id: string) => {
    const handle = (todosObj: Todo[]) => {
      const findIndexTodo = todosObj.findIndex((todo) => todo.id === id)
      if (findIndexTodo > -1) {
        const result = [...todosObj]
        result.splice(findIndexTodo, 1)
        return result
      }
      return todosObj
    }
    if (currentTodo) {
      setCurrentTodo(null)
    }
    setTodos(handle)
    syncReactToLocal(handle)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addTodo={handleAddTodo}
          currentTodo={currentTodo}
          editTodo={editTodo}
          finishEditTodo={finishEditTodo}
        />
        <TaskList
          todoList={notDoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEdit={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          todoList={doneTodos}
          doneTaskList={true}
          handleDoneTodo={handleDoneTodo}
          startEdit={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}

export default TodoList
