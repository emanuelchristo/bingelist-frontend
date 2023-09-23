import IconButton from '../common/IconButton'
import ListItem from '../common/ListItem'
import PlaySvg from '/src/assets/icons/play.svg?react'
import AddSvg from '/src/assets/icons/add.svg?react'

import styles from './YourListsPanel.module.css'

const lists = [
	{ name: 'Thrillers 90s', count: 5, emoji: '🔥' },
	{ name: 'Romance', count: 32, emoji: '💗' },
	{ name: 'Neo Noir', count: 14, emoji: '🎞️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
	{ name: 'Slow Burn', count: 8, emoji: '✏️' },
]

export default function YourListsPanel() {
	return (
		<div className={styles['your-lists-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className='flex items-center gap-[8px]'>
					<PlaySvg className={styles['play-icon']} />
					<span className={styles['title']}>Your Lists</span>
				</div>
				<IconButton icon={<AddSvg />} />
			</div>
			<div className={styles['lists-container']}>
				<div className={styles['lists-wrapper']}>
					{lists.map((item, index) => (
						<ListItem key={index} emoji={item.emoji} name={item.name} count={item.count} />
					))}
				</div>
			</div>
		</div>
	)
}
