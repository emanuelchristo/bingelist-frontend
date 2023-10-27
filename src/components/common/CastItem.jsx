import styles from './CastItem.module.css'

export default function CastItem({ href, imgSrc, name, role }) {
	return (
		<a href={href} target='_blank' rel='noreferrer'>
			<div className={styles['cast-item']}>
				<div className={styles['photo']} style={{ backgroundImage: `url('${imgSrc}')` }}></div>
				<span className={styles['name']}>{name || '--'}</span>
				<span className={styles['role']}>{role || '--'}</span>
			</div>
		</a>
	)
}
