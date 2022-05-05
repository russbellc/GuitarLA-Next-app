import Image from "next/image";
import Link from "next/link";
import { formatearFecha } from "../helpers";
import styles from "../styles/Entrada.module.css";

const Entrada = ({ entrada }) => {
	const {
		id,
		attributes: {
			titulo,
			resumen,
			publishedAt,
			url_id,
			imagen: {
				data: {
					attributes: { url },
				},
			},
		},
	} = entrada;
	return (
		<article>
			<Image
				src={url}
				width={800}
				height={600}
				layout="responsive"
				alt={`imagen blog ${titulo}`}
			/>
			<div className={styles.contenido}>
				<h3>{titulo}</h3>
				<p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
				<p className={styles.resumen}>{resumen}</p>
				<Link href={`/blog/${url_id}`}>
					<a className={styles.enlace}>Leer Entrada</a>
				</Link>
			</div>
		</article>
	);
};

export default Entrada;
