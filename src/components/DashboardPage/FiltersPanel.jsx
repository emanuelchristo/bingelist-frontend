import { useState } from 'react'

import FilterSvg from '/src/assets/icons/filter.svg?react'
import SortSvg from '/src/assets/icons/sort.svg?react'
import TimerSvg from '/src/assets/icons/timer.svg?react'
import LanguageSvg from '/src/assets/icons/language.svg?react'
import ImdbSvg from '/src/assets/logos/imdb.svg'
import RTSvg from '/src/assets/logos/rt.svg'

import Button from '../common/Button'
import Select from '../common/Select'
import Chip from '../common/Chip'

import styles from './FiltersPanel.module.css'
import Toggle from '../common/Toggle'

const genres = [
	'Action',
	'Adventure',
	'Animation',
	'Comedy',
	'Crime',
	'Documentary',
	'Drama',
	'Family',
	'Fantasy',
	'History',
	'Horror',
	'Music',
	'Mystery',
	'Romance',
	'Sci Fi',
	'TV Movie',
	'Thriller',
	'War',
	'Western',
]

function genYearOptions() {
	const options = []
	const currYear = new Date().getFullYear()
	for (let i = 1950; i <= currYear; i++) options.push({ value: i, name: i })
	return options
}

function genImdbOptions() {
	const options = []
	for (let i = 0; i <= 10; i++) options.push({ value: i, name: i })
	return options
}

function genRtOptions() {
	const options = []
	for (let i = 0; i <= 100; i = i + 10) options.push({ value: i, name: i + '%' })
	return options
}

export default function FiltersPanel() {
	const [fitlersActive, setFiltersActive] = useState(false)

	return (
		<div className={styles['filters-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className='flex items-center gap-[8px]'>
					<FilterSvg className={styles['filter-icon']} />
					<span className={styles['title']}>Filters</span>
				</div>
				<Toggle checked={fitlersActive} onChange={() => setFiltersActive((val) => !val)} />
			</div>

			<div className={styles['inputs-container']}>
				<div className={styles['inputs-wrapper']}>
					{/* SORT */}
					<Select
						icon={<SortSvg />}
						label='Sort'
						options={[
							{ value: 'popularity', name: 'Popularity' },
							{ value: 'latest', name: 'Latest' },
						]}
						selected={'popularity'}
					/>

					{/* TYPE */}
					<div>
						<span className={styles['label']}>Type</span>
						<div className={styles['chips-wrapper']}>
							<Chip name='All' selected={false} />
							<Chip name='Movies' selected={true} />
							<Chip name='TV Shows' selected={false} />
						</div>
					</div>

					{/* GENRE */}
					<div>
						<span className={styles['label']}>Type</span>
						<div className={styles['chips-wrapper']}>
							{genres.map((item) => (
								<Chip key={item} name={item} selected={false} />
							))}
						</div>
					</div>

					{/* YEAR */}
					<div>
						<span className={styles['label']}>Year</span>
						<div className={styles['year-selects-wrapper']}>
							<div className={styles['year-select-wrapper']}>
								<span>From</span>
								<Select options={genYearOptions()} selected={1990} />
							</div>
							<div className={styles['year-select-wrapper']}>
								<span>To</span>
								<Select options={genYearOptions()} selected={2022} />
							</div>
						</div>
					</div>

					{/* IMDB */}
					<div className={styles['rating-wrapper']}>
						<div className={styles['rating-label-wrapper']}>
							<span>Min</span>
							<img src={ImdbSvg} />
						</div>
						<div className={styles['rating-select-wrapper']}>
							<Select options={genImdbOptions()} selected={4} />
						</div>
					</div>

					{/* Rotten Tomatoes */}
					<div className={styles['rating-wrapper']}>
						<div className={styles['rating-label-wrapper']}>
							<span>Min</span>
							<img src={RTSvg} />
						</div>
						<div className={styles['rating-select-wrapper']}>
							<Select options={genRtOptions()} selected={40} />
						</div>
					</div>

					{/* LANGUAGE */}
					<Select
						icon={<LanguageSvg />}
						label='Language'
						options={[
							{ value: 'english', name: 'English' },
							{ value: 'hindi', name: 'Hindi' },
						]}
						selected={'english'}
					/>

					{/* DURATION */}
					<Select
						icon={<TimerSvg />}
						label='Duration'
						options={[
							{ value: 'under-2hr', name: 'Under 2hr' },
							{ value: 'under-3hr', name: 'Under 3hr' },
						]}
						selected={'under-2hr'}
					/>

					{/* 18+ */}
					<div className={styles['adult']}>
						<span>Include 18+</span>
						<Toggle />
					</div>
				</div>
			</div>

			<div className={styles['bottom-wrapper']}>
				<Button type='secondary' name='Reset' />
				<Button type='primary' name='Apply' />
			</div>
		</div>
	)
}
