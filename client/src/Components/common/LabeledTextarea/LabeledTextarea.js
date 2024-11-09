import React from 'react'
import styles from './LabeledTextarea.module.css'

const LabeledTextarea = ({label, id, name, onChange, ...props}) => {
  return (
    <div className={styles.LabeledTextarea}>
      <label>{label}</label>
      <textarea id={id} name={name} onChange={onChange} {...props} ></textarea>
    </div>
  )
}

export default LabeledTextarea