import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Ads from './components/Ads'
// import AutoInput from './components/AutoInput'
// import Counter from './components/Counter'
import MouseTracker from './components/MouseTracker'
import { PositionType } from './components/MouseTracker/MouseTracker'
// import TodoList from './components/TodoList'
// import Watch from './components/Watch'
// import Welcome from './components/Welcome'

// const renderAds = (value: PositionType) => <Ads x={value.x} y={value.y} visible />

function App() {
  const [, render] = useState({})

  // const renderAds = useCallback((value: PositionType) => <Ads x={value.x} y={value.y} visible />, [])
  // const renderAds = useMemo(() => {
  //   return (value: PositionType) => <Ads x={value.x} y={value.y} visible />
  // }, [])

  const renderAds = useRef<any>((value: PositionType) => <Ads x={value.x} y={value.y} visible />)

  useEffect(() => {
    renderAds.current = (value: PositionType) => <Ads x={value.x} y={value.y} visible />
  }, [])

  return (
    <div style={{ height: '10000px' }}>
      {/* <TodoList />
      <Watch />
      <Counter />
      <Welcome />
      <AutoInput /> */}
      <div>
        <button onClick={() => render({})}>Force Rerender</button>
      </div>
      <MouseTracker render={renderAds.current} />
      {/* <Ads visible /> */}
    </div>
  )
}

export default App
