import styles from './ListItem.module.css'

export default function ListItem({ emoji, name, count }) {
	return (
		<div className={styles['list-item']}>
			<div className={styles['emoji-wrapper']}>
				<span>{emoji}</span>
			</div>
			<div className={styles['text-wrapper']}>
				<span className={styles['name']}>{name}</span>
				<span className={styles['count']}>{count + `${count === 1 ? ' item' : ' items'}`}</span>
			</div>
		</div>
	)
}
