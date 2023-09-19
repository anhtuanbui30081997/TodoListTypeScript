import AutoInput from './components/AutoInput'
import Counter from './components/Counter'
import TodoList from './components/TodoList'
import Watch from './components/Watch'
import Welcome from './components/Welcome'

function App() {
  return (
    <div style={{ height: '10000px' }}>
      <TodoList />
      <Watch />
      <Counter />
      <Welcome />
      <AutoInput />
    </div>
  )
}

export default App
