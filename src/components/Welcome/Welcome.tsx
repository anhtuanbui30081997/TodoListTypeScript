import { useState, createContext, useContext } from 'react'
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
  const onChangeTheme = (color: 'light' | 'dark') => {
    setTheme((prev) => ({ ...prev, color }))
  }
  return (
    <div className={styles.welcome}>
      <ThemeContext.Provider value={{ theme, onChangeTheme }}>
        <Form />
        <Label />
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

function Label() {
  const { theme, onChangeTheme } = useContext(ThemeContext)
  return (
    <label htmlFor='theme'>
      <input
        type='checkbox'
        checked={theme.color === 'dark'}
        onChange={(e) => onChangeTheme(e.target.checked ? 'dark' : 'light')}
      />
      Use dark mode
    </label>
  )
}
