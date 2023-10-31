import { forwardRef } from 'react'

import CloseSvg from '/src/assets/icons/close.svg?react'

import styles from './Inputs.module.css'

const TextBox = forwardRef(
	({ icon, label, placeholder, clear, focus, onKeyDown = () => {}, onChange = () => {}, type, value = '' }, ref) => {
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
						onKeyDown={onKeyDown}
						ref={ref}
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
)

TextBox.displayName = 'TextBox'

export default TextBox
