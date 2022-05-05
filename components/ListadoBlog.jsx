import Entrada from "./entrada";
import styles from "../styles/Blog.module.css";

const ListadoBlog = ({ entradas }) => {
	const {
		data: {
			blogs: { data },
		},
	} = entradas;
	return (
		<>
			<h2 className="heading">Blogs</h2>
			<div className={styles.blog}>
				{data.map((entrada) => (
					<Entrada key={entrada.id} entrada={entrada} />
				))}
			</div>
		</>
	);
};

export default ListadoBlog;
