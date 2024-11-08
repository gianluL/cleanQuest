import React, { useContext } from 'react'
import styles from './Header.module.css'
import { RootLayoutContext } from '../../../Pages/RootLayout/RootLayout'

const Header = () => {
  const context = useContext(RootLayoutContext);
  return (
    <header className={styles['app-header']}>
      <h1 className={styles['app-title']}>{context.title}</h1>
    </header>
  )
}

export default Header