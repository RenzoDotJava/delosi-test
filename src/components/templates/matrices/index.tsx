import React from 'react'
import { FaSmileBeam } from "react-icons/fa";
import { ImSad2 } from "react-icons/im";
import { Loader, Matrix, State } from '@/ui'
import { useMatrix } from '@/context/MatrixContext';
import { MAX_SIZE_CANVAS } from '@/constants';
import styles from "./matrices.module.scss";

const Matrices = () => {
  const { matrices, error, isLoading, debouncedMatrix } = useMatrix()

  const renderContent = () => {
    if (isLoading) return <State icon={<Loader />} title='Rotando matriz!' subtitle='Esto puede tardar un momento' />
    else if (debouncedMatrix.trim() === '') return <State icon={<FaSmileBeam size={52} />} title='Comencemos a rotar!' subtitle='Ingrese una matriz NxN' />
    else if (error) return <State icon={<ImSad2 size={52} />} title='Ups!' subtitle={error} />
    else if (matrices) {
      if (matrices.parsedMatrix.length > MAX_SIZE_CANVAS) return <State icon={<ImSad2 size={52} />} title='Lo siento!' subtitle='No puedo dibujar una matriz tan grande' />
      return (
        <>
          <div className={styles['matrix']}>
            <label>Matriz de entrada</label>
            <Matrix matrix={matrices.parsedMatrix} />
          </div>
          <div className={styles['matrix']}>
            <label>Matriz rotada</label>
            <Matrix matrix={matrices.rotatedMatrix} />
          </div>
        </>
      )
    }
  }

  return (
    <div className={styles['matrices-container']}>
      {renderContent()}
    </div>
  )
}

export default Matrices