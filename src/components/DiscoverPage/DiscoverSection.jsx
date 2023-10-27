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

function Tabs({ tabs, selectedTab, onChange }) {
	return (
		<div className={styles['tabs']}>
			{tabs.map((item) => (
				<div
					key={item.value}
					className={`${item.value === selectedTab ? styles['tab-selected'] : ''} ${styles['tab-item']}`}
					onClick={() => onChange(item.value)}
				>
					{item.name}
				</div>
			))}
		</div>
	)
}
