import { dashboardStore } from '../../store/stores'
import IconButton from '../common/IconButton'

import CloseSvg from '/src/assets/icons/close.svg?react'
import Button from '../common/Button'

import styles from './CreateList.module.css'

export default function DeleteList() {
	return (
		<div className={styles['create-list'] + ' card'}>
			<div className={styles['header']}>
				<span className={styles['title']}>Create list</span>
				<IconButton icon={<CloseSvg />} />
			</div>
			<div className={styles['content']}></div>
			<div className={styles['buttons-wrapper']}>
				<Button type='secondary' name='Cancel' />
				<Button type='primary' name='Create' />
			</div>
		</div>
	)
}
