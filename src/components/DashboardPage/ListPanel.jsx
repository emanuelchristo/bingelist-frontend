import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { dashboardStore } from '../../store/stores'
import { useState, useEffect } from 'react'

// import GridSvg from '/src/assets/icons/grid.svg?react'
import AddSvg from '/src/assets/icons/add.svg?react'
import EditSvg from '/src/assets/icons/edit.svg?react'
import MoreSvg from '/src/assets/icons/more.svg?react'
import SearchSvg from '/src/assets/icons/search.svg?react'
import DeleteSvg from '/src/assets/icons/delete.svg?react'

import Spinner from '../common/Spinner'
import TextBox from '../common/TextBox'
import MovieGrid from '../common/MovieGrid'
import IconButton from '../common/IconButton'
import ContextMenu from '../common/ContextMenu'

import styles from './ListPanel.module.css'

const ListPanel = observer(() => {
	const { listId } = useParams()
	const [showMoreMenu, setShowMoreMenu] = useState(false)

	useEffect(() => {
		if (!listId) return
		dashboardStore.fetchListDetials(listId)
	}, [listId])

	function handleMenuClick(value) {
		setShowMoreMenu(false)
		if (value === 'delete') dashboardStore.deleteList(listId)
		else if (value === 'edit') dashboardStore.editList(listId)
	}

	function handleAddMovie() {
		dashboardStore.getQuickSearch().then((movieId) => {})
	}

	return (
		<div className={styles['list-panel'] + ' card'}>
			{dashboardStore.listDetailsState !== 'success' ? (
				<div className={styles['loader-wrapper']}>
					<Spinner />
				</div>
			) : (
				<>
					<div className={styles['header']}>
						<div className={styles['list-heading']}>
							<div className={styles['emoji-wrapper']}>
								<span>{dashboardStore.listDetails?.emoji ?? '❌'}</span>
							</div>
							<div className={styles['text-wrapper']}>
								<span className={styles['name']}>{dashboardStore.listDetails?.name ?? '--'}</span>
								<span className={styles['count']}>{`${dashboardStore.listDetails?.count ?? '--'} ${
									dashboardStore.listDetails?.count == 1 ? 'item' : 'items'
								}`}</span>
							</div>
							<div className={styles['more-container']}>
								<IconButton icon={<MoreSvg />} onClick={() => setShowMoreMenu(true)} />
								<div className={styles['more-menu-wrapper']}>
									<ContextMenu
										options={[
											{ icon: <DeleteSvg />, name: 'Delete', value: 'delete' },
											{ icon: <EditSvg />, name: 'Edit', value: 'edit' },
										]}
										show={showMoreMenu}
										onClick={handleMenuClick}
										onClose={() => setShowMoreMenu(false)}
									/>
								</div>
							</div>
						</div>
						<div className={styles['controls-wrapper']}>
							<TextBox icon={<SearchSvg />} placeholder='Search...' clear={true} onChange={() => {}} />
							{/* <IconButton icon={<GridSvg />} size='lg' /> */}
							<IconButton icon={<AddSvg />} size='lg' onClick={handleAddMovie} />
						</div>
					</div>
					<MovieGrid movies={dashboardStore.listDetails?.movies} />
				</>
			)}
		</div>
	)
})

export default ListPanel
