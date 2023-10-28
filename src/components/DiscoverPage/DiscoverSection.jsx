import Tabs from '../common/Tabs'

import styles from './DiscoverSection.module.css'

export default function DiscoverSection({ title, tabs, selectedTab, onChange, children }) {
	return (
		<div className={styles['discover-section']}>
			<div className={styles['section-header']}>
				<h3 className={styles['section-title']}>{title}</h3>
				{!!tabs && <Tabs selectedTab={selectedTab} tabs={tabs} onChange={onChange} />}
			</div>
			<div className={styles['movies-wrapper']}>{children}</div>
		</div>
	)
}
