import Spinner from './Spinner'
import MovieGridItem from './MovieGridItem'

import styles from './MovieGrid.module.css'

export default function MovieGrid({ movies }) {
	return (
		<div className={styles['grid-container']}>
			{movies?.length > 0 ? (
				<div className={styles['grid']}>
					{movies?.map((item, index) => (
						<MovieGridItem key={item.media_type + item.id} data={item} />
					))}
				</div>
			) : (
				<div className={styles['loader-wrapper']}>
					<Spinner />
				</div>
			)}
		</div>
	)
}
