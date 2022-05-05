import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Nosotros.module.css";

const Nosotros = () => {
	return (
		<Layout pagina="Nosotros">
			<main className="contenedor">
				<h2 className="heading">Nosotros</h2>

				<div className={styles.contenido}>
					<Image
						layout="responsive"
						width={600}
						height={450}
						src="/nosotros.jpg"
					/>
					<div>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
							proin sagittis nisl rhoncus mattis rhoncus. Tincidunt augue
							interdum velit euismod in pellentesque massa placerat duis.
							Rhoncus aenean vel elit scelerisque mauris pellentesque. Facilisis
							sed odio morbi quis commodo odio. Mi quis hendrerit dolor magna.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
							proin sagittis nisl rhoncus mattis rhoncus. Tincidunt augue
							interdum velit euismod in pellentesque massa placerat duis.
							Rhoncus aenean vel elit scelerisque mauris pellentesque. Facilisis
							sed odio morbi quis commodo odio. Mi quis hendrerit dolor magna.
						</p>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default Nosotros;
