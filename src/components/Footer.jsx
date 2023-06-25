import styles from "./Footer.module.css";
const Footer = () => {
	return (
		<div className={styles.footer}>
			<p className={styles.copyright}>
				&copy; Copyright {new Date().getFullYear()} by Reminisce Inc.
			</p>
		</div>
	);
};

export default Footer;
