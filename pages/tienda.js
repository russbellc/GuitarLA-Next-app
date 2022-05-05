import { gql } from "@apollo/client";
import client from "../apollo-client";
import Layout from "../components/Layout";
import Listado from "../components/listado";

const Tienda = ({ guitarras }) => {
	return (
		<Layout pagina="Tienda">
			<main className="contenedor">
				<h1 className="heading">Nuestra Coleccion</h1>
				<Listado guitarras={guitarras} />
			</main>
		</Layout>
	);
};

export async function getServerSideProps() {
	const guitarras = await client.query({
		query: gql`
			query {
				guitarras(pagination: { pageSize: 50 }, sort: "publishedAt:DESC") {
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
			guitarras,
		},
	};
}

export default Tienda;
