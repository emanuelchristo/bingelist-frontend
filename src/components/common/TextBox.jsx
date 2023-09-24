import CloseSvg from '/src/assets/icons/close.svg?react'

import styles from './Inputs.module.css'

export default function TextBox({ icon, label, placeholder, clear, focus, onChange = () => {}, type, value = '' }) {
	return (
		<div className='w-full'>
			{!!label && <span className={styles['label']}>{label}</span>}
			<div className={styles['select']} aria-label='select'>
				{!!icon && <div className={styles['icon-wrapper']}>{icon}</div>}
				<input
					autoFocus={focus}
					type={type ?? 'text'}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				{!!clear && (
					<div className={styles['select-chevron-wrapper']}>
						<CloseSvg />
					</div>
				)}
			</div>
		</div>
	)
}
