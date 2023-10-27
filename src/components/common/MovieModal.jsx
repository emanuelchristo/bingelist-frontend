import { dashboardStore } from '../../store/stores'

import IconButton from '../common/IconButton'
import CastItem from './CastItem'
import CloseSvg from '/src/assets/icons/close.svg?react'
import PlaySvg from '/src/assets/icons/play-circle.svg?react'

import RtFresh from '/src/assets/logos/rt-fresh.svg'
import Imdb from '/src/assets/logos/imdb.svg'

import styles from './MovieModal.module.css'

export default function MovieModal() {
	return (
		<div className={styles['movie-modal'] + ' card'}>
			<div className={styles['header']}>
				<span className={styles['title']}>Movie</span>
				<IconButton icon={<CloseSvg />} onClick={dashboardStore.cancelMovieModal} />
			</div>
			<div className={styles['content-container']}>
				<div className={styles['main']}>
					<div className={styles['poster']}></div>
					<div className={styles['main-right']}>
						<h3 className={styles['movie-title']}>Blue Beetle</h3>
						<div className={styles['movie-meta-wrapper']}>
							<div className={styles['tag']}>Movie</div>
							<div className={styles['dot']}></div>
							<span className={styles['meta-text']}>2023</span>
							<div className={styles['dot']}></div>
							<span className={styles['meta-text']}>2h 8m</span>
							<div className={styles['dot']}></div>
							<span className={styles['meta-text']}>Action, Sci Fi</span>
						</div>
						<div className={styles['movie-meta-2-wrapper']}>
							<div className={styles['rt-wrapper']}>
								<img src={RtFresh} />
								<span>75%</span>
							</div>
							<div className={styles['separator']}></div>
							<div className={styles['imdb-wrapper']}>
								<img src={Imdb} />
								<span>7.1</span>
							</div>
							<div className={styles['separator']}></div>
							<div className={styles['country-wrapper']}>
								<span className={styles['flag']}>🇺🇸</span>
								<span>English</span>
							</div>
						</div>
						<button className={styles['trailer-button']}>
							<PlaySvg className={styles['play-icon']} />
							<span>Play trailer</span>
						</button>
					</div>
				</div>

				<div className={styles['synopsis']}>
					<span className={styles['section-title']}>Synopsis</span>
					<p className={styles['normal-text']}>
						Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he
						searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of
						alien biotechnology: the Scarab.
					</p>
				</div>

				<div className={styles['info-items']}>
					<div className={styles['info-item']}>
						<span className={styles['section-title']}>Director</span>
						<span className={styles['normal-text']}>Ángel Manuel Soto</span>
					</div>
				</div>

				<div className={styles['top-cast']}>
					<span className={styles['section-title']}>Top cast</span>
					<div className={styles['cast-wrapper']}>
						<CastItem
							name='Xolo Mariduena'
							role='Jamie Reyes'
							imgSrc='https://www.themoviedb.org/t/p/w276_and_h350_face/tJMI7BpjlhHSMpzSz9e1XxygnKd.jpg'
						/>
						<CastItem />
					</div>
				</div>
			</div>
		</div>
	)
}
