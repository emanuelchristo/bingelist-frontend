import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'

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

const FiltersPanel = observer(() => {
	return (
		<div className={styles['filters-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className='flex items-center gap-[8px]'>
					<FilterSvg className={styles['filter-icon']} />
					<span className={styles['title']}>Filters</span>
				</div>
				<Toggle checked={dashboardStore.filtersActive} onChange={dashboardStore.toggleFiltersActive} />
			</div>

			<div
				className={`${styles['inputs-container']} ${
					!dashboardStore.filtersActive ? styles['filters-disabled'] : ''
				}`}
			>
				<div className={styles['inputs-wrapper']}>
					{/* SORT */}
					<Select
						icon={<SortSvg />}
						label='Sort'
						options={dashboardStore.filterSettings.sortOptions}
						selected={dashboardStore.filters.sort}
						onChange={(e) => dashboardStore.handleFilterChange('sort', e.target.value)}
					/>

					{/* TYPE */}
					<div>
						<span className={styles['label']}>Type</span>
						<div className={styles['chips-wrapper']}>
							{dashboardStore.filterSettings.type.map((item) => (
								<Chip
									key={item.value}
									name={item.name}
									selected={dashboardStore.filters.type === item.value}
									onClick={() => dashboardStore.handleFilterChange('type', item.value)}
								/>
							))}
						</div>
					</div>

					{/* GENRE */}
					<div>
						<span className={styles['label']}>Genre</span>
						<div className={styles['chips-wrapper']}>
							{dashboardStore.filterSettings.genres.map((item) => (
								<Chip
									key={item.value}
									name={item.name}
									selected={dashboardStore.filters.genres.includes(item.value)}
									onClick={() => dashboardStore.handleFilterChange('genres', item.value)}
								/>
							))}
						</div>
					</div>

					{/* YEAR */}
					<div>
						<span className={styles['label']}>Year</span>
						<div className={styles['year-selects-wrapper']}>
							<div className={styles['year-select-wrapper']}>
								<span>From</span>
								<Select
									options={dashboardStore.filterSettings.yearOptions}
									selected={dashboardStore.filters.year.from}
									onChange={(e) => dashboardStore.handleFilterChange('year-from', e.target.value)}
								/>
							</div>
							<div className={styles['year-select-wrapper']}>
								<span>To</span>
								<Select
									options={dashboardStore.filterSettings.yearOptions}
									selected={dashboardStore.filters.year.to}
									onChange={(e) => dashboardStore.handleFilterChange('year-to', e.target.value)}
								/>
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
							<Select
								options={dashboardStore.filterSettings.imdbOptions}
								selected={dashboardStore.filters.minImdb}
								onChange={(e) => dashboardStore.handleFilterChange('minImdb', e.target.value)}
							/>
						</div>
					</div>

					{/* Rotten Tomatoes */}
					<div className={styles['rating-wrapper']}>
						<div className={styles['rating-label-wrapper']}>
							<span>Min</span>
							<img src={RTSvg} />
						</div>
						<div className={styles['rating-select-wrapper']}>
							<Select
								options={dashboardStore.filterSettings.rtOptions}
								selected={dashboardStore.filters.minRt}
								onChange={(e) => dashboardStore.handleFilterChange('minRt', e.target.value)}
							/>
						</div>
					</div>

					{/* LANGUAGE */}
					<Select
						icon={<LanguageSvg />}
						label='Language'
						options={dashboardStore.filterSettings.languageOptions}
						selected={dashboardStore.filters.language}
						onChange={(e) => dashboardStore.handleFilterChange('language', e.target.value)}
					/>

					{/* DURATION */}
					<Select
						icon={<TimerSvg />}
						label='Duration'
						options={dashboardStore.filterSettings.durationOptions}
						selected={dashboardStore.filters.duration}
						onChange={(e) => dashboardStore.handleFilterChange('duration', e.target.value)}
					/>

					{/* 18+ */}
					<div className={styles['adult']}>
						<span>Include 18+</span>
						<Toggle
							checked={dashboardStore.filters.adult}
							onChange={() => dashboardStore.handleFilterChange('adult')}
						/>
					</div>
				</div>
			</div>

			<div
				className={`${styles['bottom-wrapper']} ${
					!dashboardStore.filtersActive ? styles['filters-disabled'] : ''
				}`}
			>
				<Button type='secondary' name='Reset' onClick={dashboardStore.resetFilter} />
				<Button
					type='primary'
					name='Apply'
					onClick={dashboardStore.applyFilters}
					disabled={!dashboardStore.filtersChanged}
				/>
			</div>
		</div>
	)
})

export default FiltersPanel
