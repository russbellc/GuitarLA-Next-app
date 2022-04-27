import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, pagina }) => {
	return (
		<div>
			<Head>
				<title>GuitarLA - {pagina}</title>
				<meta name="description" content="Sitio web de venta de guitarras" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
