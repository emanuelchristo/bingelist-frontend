import { dashboardStore } from '../../store/stores'
import { observer } from 'mobx-react-lite'
import IconButton from '../common/IconButton'
import ListItem from '../common/ListItem'
import PlaySvg from '/src/assets/icons/play.svg?react'
import AddSvg from '/src/assets/icons/add.svg?react'
import styles from './YourListsPanel.module.css'

const YourListsPanel = observer(() => {
	function sortList(list) {
		const temp = list.filter(() => 1)
		temp.sort((a, b) => a.name.localeCompare(b.name))
		return temp
	}

	return (
		<div className={styles['your-lists-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className='flex items-center gap-[8px]'>
					<PlaySvg className={styles['play-icon']} />
					<span className={styles['title']}>Your Lists</span>
				</div>
				<IconButton icon={<AddSvg />} onClick={dashboardStore.createNewList} />
			</div>
			<div className={styles['lists-container']}>
				<div className={styles['lists-wrapper']}>
					{sortList(dashboardStore.lists).map((item, index) => (
						<ListItem
							key={index}
							emoji={item.emoji}
							name={item.name}
							count={item.count}
							selected={dashboardStore.selectedListId === item.id}
							onClick={() => dashboardStore.handleListItemClick(item.id)}
						/>
					))}
				</div>
			</div>
		</div>
	)
})

export default YourListsPanel
