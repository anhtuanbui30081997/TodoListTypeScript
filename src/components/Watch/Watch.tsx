import React, { useEffect, useRef, useState } from 'react'
import styles from './watch.module.scss'

function WatchTimer() {
  const [seconds, setSeconds] = useState<number>(0)
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    console.log('chay mot lan')
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1)
      console.log('setInterval dang chay')
    }, 1000)
    return () => {
      console.log('component unmount!')
      clearInterval(intervalRef.current)
    }
  }, [intervalRef])

  return <div>WatchTimer: {seconds}</div>
}

function Watch() {
  const [visiable, setVisiable] = useState<boolean>(true)
  return (
    <div className={styles.watch}>
      <div className={styles.watchContainer}>
        <button onClick={() => setVisiable((prev) => !prev)}>Visiable Watch Timer</button>
        {visiable && <WatchTimer />}
      </div>
    </div>
  )
}

export default Watch
