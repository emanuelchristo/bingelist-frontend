import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

import IconButton from './IconButton'
import CloseSvg from '/src/assets/icons/close.svg?react'
import Button from '../common/Button'
import ListItem from '../common/ListItem'

import styles from './AddToListModal.module.css'

const AddToListModal = observer(() => {
	const [selectedLists, setSelectedLists] = useState([])

	function handleOk() {}

	function handleListClick(listId) {
		console.log(listId)
		if (selectedLists.includes(listId)) {
			const temp = selectedLists.filter((item) => item !== listId)
			setSelectedLists(temp)
		} else {
			setSelectedLists([...selectedLists, listId])
		}
	}

	return (
		<div className={styles['add-to-list-modal'] + ' card'}>
			<div className={styles['header']}>
				<span className={styles['title']}>Add to list</span>
				<IconButton icon={<CloseSvg />} onClick={dashboardStore.handleAddToListCancel} />
			</div>
			<div className={styles['lists-container']}>
				<div className={styles['lists-wrapper']}>
					{dashboardStore.getLists().map((item) => (
						<ListItem
							key={item.id}
							onClick={() => handleListClick(item.id)}
							emoji={item.emoji}
							name={item.name}
							count={item.count}
							id={item.id}
							noHoverAnim
							selected={selectedLists.includes(item.id)}
						/>
					))}
				</div>
			</div>
			<div className={styles['buttons-wrapper']}>
				<Button type='secondary' name='Cancel' onClick={dashboardStore.handleAddToListCancel} />
				<Button type='primary' name='Add' onClick={handleOk} />
			</div>
		</div>
	)
})

export default AddToListModal
