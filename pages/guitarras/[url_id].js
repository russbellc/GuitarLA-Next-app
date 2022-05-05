import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Layout from "../../components/Layout";
import Image from "next/image";
import styles from "../../styles/Guitarra.module.css";

const Producto = ({ guitarra, agregarCarrito }) => {
	const [cantidad, setCantidad] = useState(1);

	const {
		id,
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
	} = guitarra.data.guitarras.data[0];

	const handleSubmit = (e) => {
		e.preventDefault();

		if (cantidad < 1) {
			alert("cantidad no valida");
			return;
		}

		//Agregar al carrito
		const guitarraSeleccionada = {
			id,
			imagen: url,
			nombre,
			precio,
			cantidad
		}
		agregarCarrito(guitarraSeleccionada)
	};

	// console.log(guitarra.data.guitarras.data[0]);
	return (
		<Layout pagina={`${nombre}`}>
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
					<form className={styles.formulario} onSubmit={handleSubmit}>
						<label>Cantidad:</label>
						<select
							value={cantidad}
							onChange={(e) => setCantidad(parseInt(e.target.value))}
						>
							<option value="0">-- Seleccione --</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
						</select>
						<input type="submit" value="Agregar al Carrito" />
					</form>
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps({ query: { url_id } }) {
	const guitarra = await client.query({
		query: gql`
			query {
				guitarras(filters: { url_id: { eq: "${url_id}" } }) {
					data {
						id
						attributes {
							nombre
							precio
							descripcion
							publishedAt
							url_id
							guitar_img {
								data {
									id
									attributes {
										url
									}
								}
							}
						}
					}
				}
			}
		`,
	});
	return {
		props: {
			guitarra,
		},
	};
}

export default Producto;
