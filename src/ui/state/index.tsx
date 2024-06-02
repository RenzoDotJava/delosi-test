import React from 'react'
import styles from "./state.module.scss";

const State: React.FC<StateProps> = ({ icon, title, subtitle }) => {
  return (
    <div className={styles['state-container']}>
      {icon}
      <label className={styles['title']}>{title}</label>
      <label className={styles['subtitle']}>{subtitle}</label>
    </div>
  )
}

export default State