import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { dashboardStore } from '../../store/stores'

import Modal from '../common/Modal'
import Button from '../common/Button'
import Spinner from '../common/Spinner'
import IconButton from '../common/IconButton'

import CloseSvg from '/src/assets/icons/close.svg?react'

import styles from './DeleteListModal.module.css'

const DeleteList = observer(() => {
	const [list, setList] = useState(null)

	useEffect(() => {
		const list = dashboardStore.getListById(dashboardStore.deleteListId)
		setList(list)
	}, [dashboardStore.deleteListId])

	return (
		<Modal show={dashboardStore.showDeleteList} onClose={dashboardStore.cancelCreateList}>
			<div className={styles['delete-list'] + ' card'}>
				<div className={styles['header']}>
					<span className={styles['title']}>Delete list</span>
					<IconButton icon={<CloseSvg />} onClick={dashboardStore.cancelDeleteList} />
				</div>
				<div className={styles['content']}>
					<div className={styles['list-heading']}>
						<div className={styles['emoji-wrapper']}>
							<span>{list?.emoji ?? '❌'}</span>
						</div>
						<div className={styles['text-wrapper']}>
							<span className={styles['name']}>{list?.name ?? '--'}</span>
							<span className={styles['count']}>{`${list?.count ?? '--'} ${list?.count == 1 ? 'item' : 'items'}`}</span>
						</div>
					</div>
					<p className={styles['warning-text']}>This list will be permanently deleted</p>
					{dashboardStore.deleteListState === 'loading' && (
						<div className={styles['loader-wrapper']}>
							<Spinner />
						</div>
					)}
				</div>
				<div className={styles['buttons-wrapper']}>
					<Button type='secondary' name='Cancel' onClick={dashboardStore.cancelDeleteList} />
					<Button type='primary' name='Delete' onClick={dashboardStore.okDeleteList} />
				</div>
			</div>
		</Modal>
	)
})

export default DeleteList
