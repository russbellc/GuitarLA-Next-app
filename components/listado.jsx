import React from "react";
import Guitarra from "./Guitarra";
import styles from "../styles/Listado.module.css";

const Listado = ({ guitarras }) => {
	const {
		data: {
			guitarras: { data },
		},
	} = guitarras;
	// console.log(guitarras.data.guitarras.data);
	// console.log(data[0].attributes.nombre);
	return (
		<div className={styles.listado}>
			{data.map((guitarra) => (
				<Guitarra key={guitarra.id} guitarra={guitarra} />
			))}
		</div>
	);
};

export default Listado;
