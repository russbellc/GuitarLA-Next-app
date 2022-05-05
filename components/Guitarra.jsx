import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Guitarra.module.css";

const Guitarra = ({ guitarra }) => {
	const {
		attributes: {
			nombre,
			precio,
			descripcion,
			publishedAt,
			url_id,
			guitar_img: {
				data: {
					attributes: { url },
				},
			},
		},
	} = guitarra;
	return (
		<div className={styles.guitarra}>
			<Image
				priority="true"
				layout="responsive"
				width={160}
				height={350}
				src={url}
				alt={`Imagen ${nombre}`}
			/>
			<div className={styles.contenido}>
				<h3>{nombre}</h3>
				<p className={styles.resumen}>{descripcion}</p>
				<p className={styles.precio}>S/ {precio}</p>
				<Link href={`/guitarras/${url_id}`}>
					<a className={styles.enlace}>Ver Producto</a>
				</Link>
			</div>
		</div>
	);
};

export default Guitarra;
