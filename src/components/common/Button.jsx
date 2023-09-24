import styles from './Inputs.module.css'

export default function Button({ type, name, onClick, disabled }) {
	return (
		<button className={`${styles['button']} ${styles[type]}`} disabled={disabled} onClick={onClick}>
			{name}
		</button>
	)
}
