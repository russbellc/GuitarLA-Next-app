import { gql } from "@apollo/client";
import client from "../apollo-client";
import Layout from "../components/Layout";
import ListadoBlog from "../components/ListadoBlog";

const Blog = ({ entradas }) => {
	return (
		<Layout pagina="Blog">
			<main className="contenedor">
				<ListadoBlog entradas={entradas} />
			</main>
		</Layout>
	);
};
export async function getServerSideProps() {
	const blogs = await client.query({
		query: gql`
			query {
				blogs {
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
			}
		`,
	});
	return {
		props: {
			entradas: blogs,
		},
	};
}

export default Blog;
