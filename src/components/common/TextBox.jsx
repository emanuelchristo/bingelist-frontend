import CloseSvg from '/src/assets/icons/close.svg?react'

import styles from './Inputs.module.css'

export default function TextBox({ icon, label, placeholder, clear, onChange, type, value = '' }) {
	return (
		<div>
			{!!label && <span className={styles['label']}>{label}</span>}
			<div className={styles['select']} aria-label='select'>
				{!!icon && <div className={styles['icon-wrapper']}>{icon}</div>}
				<input type={type ?? 'text'} placeholder={placeholder} value={value} onChange={onChange} />
				<div className={styles['select-chevron-wrapper']}>
					<CloseSvg />
				</div>
			</div>
		</div>
	)
}
