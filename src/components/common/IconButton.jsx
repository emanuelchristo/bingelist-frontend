import styles from './IconButton.module.css'

export default function IconButton({ size, icon, onClick }) {
	return (
		<button className={`${styles['icon-button']} ${size === 'lg' ? styles['lg'] : ''}`} onClick={onClick}>
			{icon}
		</button>
	)
}
