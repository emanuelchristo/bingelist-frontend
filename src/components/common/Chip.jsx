import styles from './Inputs.module.css'

export default function Chip({ name, selected }) {
	return <div className={`${styles['chip']} ${selected ? styles['chip-selected'] : ''}`}>{name}</div>
}
