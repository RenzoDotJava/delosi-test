import { MatrixRotator } from "@/components";
import { MAIN_PAGE_DESCRIPTION, MAIN_PAGE_TITLE, MAX_SIZE_CANVAS, MAX_SIZE_MATRIX } from "@/constants";
import styles from "./page.module.scss";

export default function MainPage() {
  return (
    <div className={styles['main-container']}>
      <h1>{MAIN_PAGE_TITLE}</h1>
      <div>
        <h4>Descripción:</h4>
        <p>{MAIN_PAGE_DESCRIPTION}</p>
        <h4>Restricciones:</h4>
        <p>- Solo se podrá ver en pantalla matrices con un tamaño menor o igual a {MAX_SIZE_CANVAS}</p>
        <p>- Solo se podrá rotar matrices con un tamaño menor o igual a {MAX_SIZE_MATRIX}</p>
      </div>
      <MatrixRotator />
    </div>
  )
}
