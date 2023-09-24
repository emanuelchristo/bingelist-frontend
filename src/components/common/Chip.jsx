import styles from './Inputs.module.css'

export default function Chip({ name, selected, onClick }) {
	return (
		<div className={`${styles['chip']} ${selected ? styles['chip-selected'] : ''}`} onClick={onClick}>
			{name}
		</div>
	)
}
