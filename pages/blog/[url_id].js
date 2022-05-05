import { gql } from "@apollo/client";
import Image from "next/image";
import client from "../../apollo-client";
import Layout from "../../components/Layout";
import { formatearFecha } from "../../helpers";
import styles from "../../styles/Entrada.module.css";

const EntradaBlog = ({ blog }) => {
	const {
		id,
		attributes: {
			titulo,
			resumen,
			contenido,
			publishedAt,
			imagen: {
				data: {
					attributes: { url },
				},
			},
		},
	} = blog.data.blogs.data[0];
	return (
		<Layout pagina={titulo}>
			<main className="contenedor">
				<h1 className="heading">{titulo}</h1>
				<article className={styles.entrada}>
					<Image
						priority="true"
						layout="responsive"
						width={800}
						height={600}
						src={url}
						alt={`imagen entrada ${titulo}`}
					/>
					<div className={styles.contenido}>
						<p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
						<p className={styles.texto}>{contenido}</p>
					</div>
				</article>
			</main>
		</Layout>
	);
};

/*
SSG
paginas estaticas
esta configuracion en rutas dinamicas es necesario getStaticPaths
para que en el momento del build se genere las paginas estaticas
*/
export async function getStaticPaths() {
	const blogs = await client.query({
		query: gql`
			query {
				blogs {
					data {
						id
						attributes {
							url_id
						}
					}
				}
			}
		`,
	});
	const {
		data: {
			blogs: { data },
		},
	} = blogs;
	const paths = data.map((entrada) => ({
		params: { url_id: entrada.attributes.url_id },
	}));
	return {
		paths,
		fallback: false,
	};
}
export async function getStaticProps({ params: { url_id } }) {
	const blog = await client.query({
		query: gql`
			query {
				blogs(filters: { url_id: { eq: "${url_id}" } }) {
					data {
						id
						attributes {
							titulo
							resumen
							contenido
							publishedAt
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
			}
		`,
	});
	return {
		props: {
			blog,
		},
	};
}
// export async function getServerSideProps({ query: { id } }) {
// 	const blog = await client.query({
// 		query: gql`
// 			query {
// 				blog(id: ${id}) {
// 					data {
// 						id
// 						attributes {
// 							titulo
// 							resumen
// 							contenido
// 							imagen {
// 								data {
// 									id
// 									attributes {
// 										url
// 									}
// 								}
// 							}
// 						}
// 					}
// 				}
// 			}
// 		`,
// 	});
// 	console.log(blog);
// 	return {
// 		props: {
// 			blog,
// 		},
// 	};
// }

export default EntradaBlog;
