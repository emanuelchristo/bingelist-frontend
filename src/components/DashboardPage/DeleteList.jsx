import { useState, useEffect } from 'react'
import { dashboardStore } from '../../store/stores'
import IconButton from '../common/IconButton'

import CloseSvg from '/src/assets/icons/close.svg?react'
import Button from '../common/Button'

import styles from './DeleteList.module.css'
import { observer } from 'mobx-react-lite'

const DeleteList = observer(() => {
	const [list, setList] = useState(null)

	useEffect(() => {
		const list = dashboardStore.getListById(dashboardStore.deleteListId)
		setList(list)
	}, [])

	return (
		<div className={styles['delete-list'] + ' card'}>
			<div className={styles['header']}>
				<span className={styles['title']}>Delete list</span>
				<IconButton icon={<CloseSvg />} onClick={dashboardStore.cancelDeleteList} />
			</div>
			<div className={styles['content']}>
				<div className={styles['list-heading']}>
					<div className={styles['emoji-wrapper']}>
						<span>{list?.emoji}</span>
					</div>
					<div className={styles['text-wrapper']}>
						<span className={styles['name']}>{list?.name}</span>
						<span className={styles['count']}>{`${list?.count} ${list?.count == 1 ? 'item' : 'items'}`}</span>
					</div>
				</div>
				<p className={styles['warning-text']}>This list will be permanently deleted</p>
			</div>
			<div className={styles['buttons-wrapper']}>
				<Button type='secondary' name='Cancel' onClick={dashboardStore.cancelDeleteList} />
				<Button type='primary' name='Delete' onClick={dashboardStore.okDeleteList} />
			</div>
		</div>
	)
})

export default DeleteList
