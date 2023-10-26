import styles from './MovieGrid.module.css'

export default function MovieGrid({ children }) {
	return (
		<div className={styles['grid-container']}>
			<div className={styles['grid']}>{children}</div>
		</div>
	)
}
