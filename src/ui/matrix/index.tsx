import React from 'react'
import styles from './matrix.module.scss'
import getMatrixTemplate from '@/utils/getMatrixTemplate';

const Matrix: React.FC<GridProps> = ({ matrix, id }) => {

  const createGrid = () => {
    const gridItems: React.JSX.Element[] = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        gridItems.push(
          <div key={`${i} + ${j}`} className={styles['grid-item']}>
            {matrix[i][j]}
          </div>
        )
      }
    }
    return gridItems;
  };

  return (
    <div
      id={id}
      data-testid={id}
      className={styles['grid-container']}
      style={{
        gridTemplateColumns: getMatrixTemplate(matrix.length),
        gridTemplateRows: getMatrixTemplate(matrix.length),
      }}
    >
      {createGrid()}
    </div>
  )
}

export default Matrix