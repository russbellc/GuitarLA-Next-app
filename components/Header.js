import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";

const Header = ({ guitarra }) => {
	const router = useRouter();
	return (
		<header className={styles.header}>
			<div className="contenedor">
				<div className={styles.barra}>
					<Link href="/">
						<a>
							<Image
								priority="true"
								src="/logo.svg"
								width={400}
								height={100}
								alt="Imagen Logo"
							/>
						</a>
					</Link>
					<nav className={styles.navegacion}>
						<Link href="/">Inicio</Link>
						<Link href="/nosotros">Nosotros</Link>
						<Link href="/blog">Blog</Link>
						<Link href="/tienda">Tienda</Link>
						<Link href="/carrito">
							<a>
								<Image
									layout="fixed"
									width={30}
									height={25}
									src="/carrito.png"
									alt="Imagen carrito"
								/>
							</a>
						</Link>
					</nav>
				</div>
				{guitarra && (
					<div className={styles.modelo}>
						<h2>Modelo {guitarra.attributes.nombre}</h2>
						<p>{guitarra.attributes.descripcion}</p>
						<p className={styles.precio}>S/ {guitarra.attributes.precio}</p>
						<Link href={`/guitarras/${guitarra.attributes.url_id}`}>
							<a className={styles.enlace}>Ver Producto</a>
						</Link>
					</div>
				)}
			</div>
			{router.pathname === "/" && (
				<div className={styles.guitarra}>
					<Image
						layout="fixed"
						width={500}
						height={1200}
						src="/header_guitarra.png"
						alt="imagen header guitarra"
					/>
				</div>
			)}
		</header>
	);
};

export default Header;
