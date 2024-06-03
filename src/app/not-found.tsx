import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./page.module.scss"

export default function NotFound() {
  return (
    <div className={styles['not-found-container']}>
      <h1>404 - Página no encontrada</h1>
      <h4>La página que estás buscando no existe.</h4>
      <Link href='/' className={styles['link']}>
        <FaArrowLeft />
        Volver al rotador de matrices
      </Link>
    </div>
  )
}