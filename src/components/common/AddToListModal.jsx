import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

import Modal from './Modal'
import Button from '../common/Button'
import Spinner from './Spinner'
import ListItem from '../common/ListItem'
import CloseSvg from '/src/assets/icons/close.svg?react'
import IconButton from './IconButton'

import styles from './AddToListModal.module.css'

const AddToListModal = observer(() => {
	return (
		<Modal show={dashboardStore.showAddToListModal} onClose={dashboardStore.cancelAddToList}>
			<div className={styles['add-to-list-modal'] + ' card'}>
				<div className={styles['header']}>
					<span className={styles['title']}>Add to list</span>
					<IconButton icon={<CloseSvg />} onClick={dashboardStore.cancelAddToList} />
				</div>
				{dashboardStore.movieLists.fetchState !== 'success' ? (
					<div className={styles['loader-wrapper']}>
						<Spinner />
					</div>
				) : (
					<div className={styles['lists-container']}>
						<div className={styles['lists-wrapper']}>
							{dashboardStore.getSortedYourLists().map((item) => (
								<ListItem
									key={item.listId}
									onClick={() => dashboardStore.toggleListInclude(item.listId)}
									emoji={item.emoji}
									name={item.name}
									count={item.count}
									noHoverAnim
									selected={dashboardStore.newListsState[item.listId]}
								/>
							))}
						</div>
						{dashboardStore.addToListState === 'loading' && (
							<div className={styles['ok-loader-wrapper']}>
								<Spinner />
							</div>
						)}
					</div>
				)}
				<div className={styles['buttons-wrapper']}>
					<Button type='secondary' name='Cancel' onClick={dashboardStore.cancelAddToList} />
					<Button type='primary' name='Save' onClick={dashboardStore.okAddToList} />
				</div>
			</div>
		</Modal>
	)
})

export default AddToListModal
