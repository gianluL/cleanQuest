


import React from 'react'
import styles from './UserItem.module.css'  

const UserItem = ({userData}) => {
  return (
    <li className={styles.UserItem} >
      <p className={styles.pos} >1</p>
      <p className={styles.username} >Farid</p>
      <p className={styles.points}>0pts</p> 
    </li>
  )
}

export default UserItem