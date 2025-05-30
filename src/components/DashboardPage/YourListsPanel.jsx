import { dashboardStore } from '../../store/stores'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import IconButton from '../common/IconButton'
import ListItem from '../common/ListItem'
import Spinner from '../common/Spinner'

import PlaySvg from '/src/assets/icons/play.svg?react'
import AddSvg from '/src/assets/icons/add.svg?react'
import styles from './YourListsPanel.module.css'

const YourListsPanel = observer(() => {
	const { listId } = useParams()

	return (
		<div className={styles['your-lists-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className='flex items-center gap-[8px]'>
					<PlaySvg className={styles['play-icon']} />
					<span className={styles['title']}>Your Lists</span>
				</div>
				<IconButton icon={<AddSvg />} onClick={dashboardStore.createNewList} />
			</div>
			{dashboardStore.lists.fetchState !== 'success' ? (
				<div className={styles['loading-wrapper']}>
					<Spinner />
				</div>
			) : dashboardStore.getSortedYourLists().length > 0 ? (
				<div className={styles['lists-container']}>
					<div className={styles['lists-wrapper']}>
						{dashboardStore.getSortedYourLists().map((item) => (
							<Link to={`/dashboard/list/${item.listId}`} key={item.listId}>
								<ListItem emoji={item.emoji} name={item.name} count={item.count} selected={listId == item.listId} />
							</Link>
						))}
					</div>
				</div>
			) : (
				<div className={styles['empty-wrapper']}>Nothing yet</div>
			)}
		</div>
	)
})

export default YourListsPanel
