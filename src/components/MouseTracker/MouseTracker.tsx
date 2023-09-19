import React, { useState } from 'react'

export interface PositionType {
  x: number
  y: number
}

export function MouseTracker({ render }: { render: (value: PositionType) => JSX.Element }) {
  const [position, setPosition] = useState<PositionType>({ x: 0, y: 0 })
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    })
  }
  console.log('MouseTracker')
  return (
    <div onMouseMove={handleMouseMove}>
      <p style={{ color: 'red' }}>Mouse Tracker</p>
      {render(position)}
    </div>
  )
}

export default React.memo(MouseTracker)

// HOC
export function withMouseTracker<T>(Component: React.ComponentType<T & PositionType>) {
  return (props: Omit<T, keyof PositionType>) => {
    const [position, setPosition] = useState<PositionType>({ x: 0, y: 0 })
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setPosition({
        x: event.clientX,
        y: event.clientY
      })
    }
    return (
      <div onMouseMove={handleMouseMove}>
        <p style={{ color: 'red' }}>Mouse Tracker</p>
        <Component {...(props as T)} {...position} />
      </div>
    )
  }
}
