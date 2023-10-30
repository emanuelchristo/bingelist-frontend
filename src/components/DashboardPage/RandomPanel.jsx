import MovieContent from '../common/MovieContent'
import ShuffleSvg from '/src/assets/icons/shuffle.svg?react'

import styles from './RandomPanel.module.css'

export default function RandomPanel() {
	return (
		<div className={styles['random-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className={styles['title-wrapper']}>
					<span className={styles['header-title']}>Random</span>
				</div>
				<div className={styles['controls-wrapper']}>
					<button className={styles['shuffle-button']}>
						<ShuffleSvg className={styles['shuffle-icon']} />
						<span>Shuffle</span>
					</button>
				</div>
			</div>
			<div className={styles['content']}>
				<MovieContent loading={true} />
			</div>
		</div>
	)
}
