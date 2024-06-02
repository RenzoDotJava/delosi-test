'use client'
import { Textarea } from '@/ui'
import { useMatrix } from '@/context/MatrixContext'
import { Matrices } from '@/components/templates';
import { MAX_SIZE_CANVAS, MAX_SIZE_MATRIX } from '@/constants';
import styles from "./main.module.scss";

const MainPage = () => {
  const { matrix, matrices, isLoading, handleChangeMatrix, getOutputMatrixString, copyToClipboard } = useMatrix()

  return (
    <div className={styles['main-container']}>
      <h1>Rotador de matrices NxN</h1>
      <div>
        <h4>Descripción:</h4>
        <p>Este programa te permitirá rotar una matriz NxN 90 grados a la izquierda. Podrás copiar la salida y ver en pantalla tanto la matriz de entrada como rotada.</p>
        <h4>Restricciones:</h4>
        <p>- Solo se podrá ver en pantalla matrices con un tamaño menor o igual a {MAX_SIZE_CANVAS}</p>
        <p>- Solo se podrá rotar matrices con un tamaño menor o igual a {MAX_SIZE_MATRIX}</p>
      </div>
      <div>
        <div className={styles['field']}>
          <label>Matriz de entrada: </label>
          <Textarea placeholder='Ex: [ [ 1 , 2 ] , [ 3 , 4 ] ]' value={matrix} onChange={handleChangeMatrix} />
        </div>
        <div className={styles['field']}>
          <div>
            <label>Matriz de salida: </label>
            <button onClick={copyToClipboard} disabled={isLoading || matrices === null || matrix.length === 0}>Copiar</button>
          </div>
          <Textarea placeholder='Ex: [ [ 2 , 4 ] , [ 1 , 3 ] ]' value={getOutputMatrixString()} disabled />
        </div>
      </div>
      <Matrices />
    </div>
  )
}

export default MainPage

//[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
//[[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1]]
//[[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1]]
//[[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1]]