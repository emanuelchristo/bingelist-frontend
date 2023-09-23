import styles from './Inputs.module.css'

export default function Button({ type, name, onClick }) {
	return (
		<button className={`${styles['button']} ${styles[type]}`} onClick={onClick}>
			{name}
		</button>
	)
}
