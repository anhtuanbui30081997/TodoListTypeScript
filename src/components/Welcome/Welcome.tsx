import React, { useState, createContext, useContext, useId, useMemo, useCallback } from 'react'
import styles from './welcome.module.scss'

interface ThemeType {
  theme: {
    color: 'light' | 'dark'
  }
  onChangeTheme: (color: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeType>({
  theme: {
    color: 'light'
  },
  onChangeTheme: () => {}
})

export default function Welcome() {
  const [theme, setTheme] = useState<ThemeType['theme']>({ color: 'dark' })
  const [, forceRender] = useState({})

  const onChangeTheme = useCallback((color: 'light' | 'dark') => {
    setTheme((prev) => ({ ...prev, color }))
  }, [])

  const pleaseRender = () => forceRender({})

  // Note: chu y khong nen gan gia cho value cua useContext la mot object vi khi re render lai component thi se
  // tao ra mot value moi nen no se gay ra re render o cac component con
  // cach khac phuc la sd useMemo cho object khoi tao trong value

  const valueContext = useMemo(() => {
    return { theme, onChangeTheme }
  }, [theme, onChangeTheme])

  return (
    <div className={styles.welcome}>
      <ThemeContext.Provider value={valueContext}>
        <Form />
        <Label />
        <button onClick={pleaseRender}>Please Render Welcome</button>
      </ThemeContext.Provider>
    </div>
  )
}

function Form() {
  return (
    <Panel title='Welcome useContext'>
      <Button>Sign Up</Button>
      <Button>Sign In</Button>
    </Panel>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext)
  return (
    <section className={theme.color === 'dark' ? styles.panel_dark : styles.panel_light}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext)
  return <button className={theme.color === 'dark' ? styles.button_dark : styles.button_light}>{children}</button>
}

const Label = React.memo(() => {
  const { theme, onChangeTheme } = useContext(ThemeContext)
  const id = useId()
  console.log('render')
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type='checkbox'
        checked={theme.color === 'dark'}
        onChange={(e) => onChangeTheme(e.target.checked ? 'dark' : 'light')}
      />
      Use dark mode
    </label>
  )
})
