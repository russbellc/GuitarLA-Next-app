import Link from "next/link";
import styles from "../styles/Pagina404.module.css";

const NoEncontrado = () => {
	return (
		<div className={styles.pagina404}>
			<h1 className="heading">Página no encontrada</h1>
			<Link href="/">Volver al inicio</Link>
		</div>
	);
};

export default NoEncontrado;
