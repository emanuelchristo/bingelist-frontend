import styles from './IconButton.module.css'

export default function IconButton({ icon, onClick }) {
	return (
		<button className={styles['icon-button']} onClick>
			{icon}
		</button>
	)
}
