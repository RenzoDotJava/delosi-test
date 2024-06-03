import React from 'react'
import styles from "./textarea.module.scss";

const Textarea: React.FC<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>> = ({ ...props }) => {
  return <textarea className={styles['container']} {...props} />
}

export default Textarea