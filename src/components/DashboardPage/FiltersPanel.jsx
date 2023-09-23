import FilterSvg from '/src/assets/icons/filter.svg?react'

import styles from './FiltersPanel.module.css'

export default function FiltersPanel() {
	return (
		<div className={styles['filters-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className='flex items-center gap-[8px]'>
					<FilterSvg className={styles['filter-icon']} />
					<span className={styles['title']}>Filters</span>
				</div>
			</div>
		</div>
	)
}
