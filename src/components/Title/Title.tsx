import React from 'react'
import styles from './title.module.scss'

type TitleProps = {
  address: {
    street: string
  }
  handleClickTitle: (value: any) => void
}

function equal(prevProp: TitleProps, nextProp: TitleProps) {
  return prevProp.address.street === nextProp.address.street
}

function Title(props: TitleProps) {
  console.log(props)
  return (
    <h1 className={styles.title} onClick={() => props.handleClickTitle(100)}>
      To do list typescript
    </h1>
  )
}

export default React.memo(Title)
