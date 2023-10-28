import styles from './Tabs.module.css'

export default function Tabs({ tabs, selectedTab, onChange }) {
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
