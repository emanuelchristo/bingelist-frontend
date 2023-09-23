import styles from './Inputs.module.css'

export default function Toggle({ checked, onChange }) {
	return (
		<div className={`${styles['toggle']} ${checked ? styles['toggle-checked'] : ''}`} onClick={onChange}>
			<div className={styles['toggle-circle']}></div>
		</div>
	)
}
