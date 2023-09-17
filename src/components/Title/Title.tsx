import React, { useRef } from 'react'
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
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const clickH1 = () => {
    console.log(h1Ref)
    if (h1Ref.current) {
      h1Ref.current.style.color = 'red'
    }
  }
  return (
    <h1 className={styles.title} ref={h1Ref} onClick={clickH1}>
      To do list typescript
    </h1>
  )
}

export default React.memo(Title)
