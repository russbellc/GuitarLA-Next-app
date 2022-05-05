import { useState, useEffect } from "react";
import "../styles/normalize.css";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

/* Este es la funcion para usar graphQL */
function MyApp({ Component, pageProps }) {
	const [carrito, setCarrito] = useState([]);

	useEffect(() => {
		const carritoLS = JSON.parse(localStorage.getItem("carrito")) ?? [];
		if (carritoLS.length !== 0) {
			setCarrito(carritoLS);
		}
	}, []);
	// useEffect(() => {
	// 	const carritoLS = JSON.parse(localStorage.getItem("carrito")) ?? [];
	// 	setCarrito(carritoLS);
	// 	if (carritoLS.length !== 0) {
	// 		setCarrito(carritoLS);
	// 	}
	// }, []);

	useEffect(() => {
		localStorage.setItem("carrito", JSON.stringify(carrito));
	}, [carrito]);
	// useEffect(() => {
	// 	localStorage.setItem("carrito", JSON.stringify(carrito));
	// }, [carrito]);

	const agregarCarrito = (producto) => {
		//evitar duplicado
		if (carrito.some((articulo) => articulo.id === producto.id)) {
			const carritoActualizado = carrito.map((articulo) => {
				if (articulo.id === producto.id) {
					articulo.cantidad = producto.cantidad;
				}
				return articulo;
			});
			setCarrito(carritoActualizado);
		} else {
			setCarrito([...carrito, producto]);
		}
	};
	const actualizarCantidad = (producto) => {
		const carritoActualizado = carrito.map((articulo) => {
			if (articulo.id === producto.id) {
				articulo.cantidad = producto.cantidad;
			}
			return articulo;
		});
		setCarrito(carritoActualizado);
	};

	const eliminarProducto = (producto) => {
		const carritoActualizado = carrito.filter(
			(articulo) => articulo.id !== producto
		);
		setCarrito(carritoActualizado);
	};
	return (
		<ApolloProvider client={client}>
			<Component
				{...pageProps}
				carrito={carrito}
				agregarCarrito={agregarCarrito}
				actualizarCantidad={actualizarCantidad}
				eliminarProducto={eliminarProducto}
			/>
		</ApolloProvider>
	);
}

/* Este es la funcion por defecto sin graphQL */
// function MyApp({ Component, pageProps }) {
// 	return <Component {...pageProps} />;
// }

export default MyApp;
