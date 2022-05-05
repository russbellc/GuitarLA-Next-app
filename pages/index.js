import { gql } from "@apollo/client";
import client from "../apollo-client";
import Curso from "../components/Curso";
import Layout from "../components/Layout";
import Listado from "../components/listado";
import ListadoBlog from "../components/ListadoBlog";

export default function Home({ guitarras, curso, blogs }) {
	const guitarra_portada = guitarras.data.guitarras.data[2];
	return (
		<Layout pagina="Inicio" guitarra={guitarra_portada}>
			<main className="contenedor">
				<h1 className="heading">Nuestra Colección</h1>
				<Listado guitarras={guitarras} />
			</main>
			<Curso curso={curso} />
			<ListadoBlog entradas={blogs} />
		</Layout>
	);
}

export async function getServerSideProps() {
	const gqlGuitarras = `query {
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
	}`;
	const gqlCursos = `query {
		curso {
			data {
				id
				attributes {
					titulo
					descripcion
					curso_img {
						data {
							attributes {
								url
							}
						}
					}
				}
			}
		}
	}`;
	const gqlBlogs = `query {
		blogs(pagination:{limit:3},sort: "publishedAt:DESC") {
			data {
				id
				attributes {
					titulo
					resumen
					contenido
					publishedAt
					url_id
					imagen {
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
	}`;

	const [guitarras, curso, blogs] = await Promise.all([
		client.query({
			query: gql`
				${gqlGuitarras}
			`,
		}),
		client.query({
			query: gql`
				${gqlCursos}
			`,
		}),
		client.query({
			query: gql`
				${gqlBlogs}
			`,
		}),
	]);
	return {
		props: {
			guitarras,
			curso,
			blogs,
		},
	};
}
