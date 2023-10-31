import styles from './Inputs.module.css'

export default function Toggle({ checked, disabled, onChange }) {
	return (
		<div
			className={`${styles['toggle']} ${checked ? styles['toggle-checked'] : ''}`}
			onClick={() => {
				if (disabled) return
				onChange()
			}}
		>
			<div className={styles['toggle-circle']}></div>
		</div>
	)
}
