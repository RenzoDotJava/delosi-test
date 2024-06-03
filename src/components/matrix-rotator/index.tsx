'use client'
import { FaSmileBeam } from 'react-icons/fa';
import { ImSad2 } from 'react-icons/im';
import { useMatrix } from '@/context/MatrixContext'
import { Loader, Matrix, State, Textarea } from '@/ui'
import { MAX_SIZE_CANVAS, MAX_SIZE_CANVAS_EXCEEDED } from '@/constants';
import styles from "./matrix-rotator.module.scss";

const MatrixRotator = () => {
  const { matrix, matrices, error, debouncedMatrix, isLoading, handleChangeMatrix, getOutputMatrixString, copyToClipboard } = useMatrix()

  const renderContent = () => {
    if (isLoading) return <State icon={<Loader />} title='Rotando matriz!' subtitle='Esto puede tardar un momento' />
    else if (debouncedMatrix.trim() === '') return <State icon={<FaSmileBeam size={52} />} title='Comencemos a rotar!' subtitle='Ingrese una matriz NxN' />
    else if (error) return <State icon={<ImSad2 size={52} />} title='Ups!' subtitle={error} />
    else if (matrices) {
      if (matrices.parsedMatrix.length > MAX_SIZE_CANVAS) return <State icon={<ImSad2 size={52} />} title='Lo siento!' subtitle={MAX_SIZE_CANVAS_EXCEEDED} />
      return (
        <>
          <div className={styles['matrix']}>
            <label>Matriz de entrada</label>
            <Matrix id='input-canvas' matrix={matrices.parsedMatrix} />
          </div>
          <div className={styles['matrix']}>
            <label>Matriz rotada</label>
            <Matrix id='output-canvas' matrix={matrices.rotatedMatrix} />
          </div>
        </>
      )
    }
  }

  return (
    <>
      <div className={styles['matrix-rotator-container']}>
        <div className={styles['field']}>
          <label htmlFor="input-matrix">Matriz de entrada: </label>
          <Textarea id="input-matrix" data-testid="input-matrix" placeholder='Ex: [ [ 1 , 2 ] , [ 3 , 4 ] ]' value={matrix} onChange={handleChangeMatrix} />
        </div>
        <div className={styles['field']}>
          <div>
            <label htmlFor="output-matrix">Matriz de salida: </label>
            <button onClick={copyToClipboard} disabled={isLoading || matrices === null || matrix.length === 0}>Copiar</button>
          </div>
          <Textarea id="output-matrix" data-testid="output-matrix" placeholder='Ex: [ [ 2 , 4 ] , [ 1 , 3 ] ]' value={getOutputMatrixString()} disabled />
        </div>
      </div>
      <div className={styles['matrices-container']}>
        {renderContent()}
      </div>
    </>
  )
}

export default MatrixRotator