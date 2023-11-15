import ChevronDownSvg from '/src/assets/icons/chevron-down.svg?react'

import styles from './Inputs.module.css'

export default function Select({ icon, options, label, selected, onChange = () => {} }) {
	return (
		<div className='w-full'>
			{!!label && <span className={styles['label']}>{label}</span>}
			<div className={styles['select']} aria-label='select'>
				{!!icon && <div className={styles['icon-wrapper']}>{icon}</div>}
				<select className={styles['select-el']} value={selected} onChange={onChange}>
					{options.map((item, index) => (
						<option key={`${item}${index}`} value={item.value}>
							{item.name}
						</option>
					))}
				</select>
				<div className={styles['select-chevron-wrapper']}>
					<ChevronDownSvg />
				</div>
			</div>
		</div>
	)
}
