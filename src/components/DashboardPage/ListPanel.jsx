import MoreSvg from '/src/assets/icons/more.svg?react'
import GridSvg from '/src/assets/icons/grid.svg?react'
import AddSvg from '/src/assets/icons/add.svg?react'
import SearchSvg from '/src/assets/icons/search.svg?react'

import IconButton from '../common/IconButton'
import TextBox from '../common/TextBox'
import MovieGridItem from '../common/MovieGridItem'
import MovieGrid from '../common/MovieGrid'

import styles from './ListPanel.module.css'

export default function ListPanel() {
	return (
		<div className={styles['list-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className={styles['list-heading']}>
					<div className={styles['emoji-wrapper']}>
						<span>🔥</span>
					</div>
					<div className={styles['text-wrapper']}>
						<span className={styles['name']}>Thrillers 90s</span>
						<span className={styles['count']}>12 items</span>
					</div>
					<IconButton icon={<MoreSvg />} />
				</div>
				<div className={styles['controls-wrapper']}>
					<TextBox icon={<SearchSvg />} placeholder='Search...' clear={true} onChange={() => {}} />
					<IconButton icon={<GridSvg />} size='lg' />
					<IconButton icon={<AddSvg />} size='lg' />
				</div>
			</div>
			<MovieGrid>
				<MovieGridItem />
				<MovieGridItem />
				<MovieGridItem />
				<MovieGridItem />
			</MovieGrid>
		</div>
	)
}
