import { observer } from 'mobx-react-lite'
import { dashboardStore } from '../../store/stores'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import FilterSvg from '/src/assets/icons/filter.svg?react'
import SortSvg from '/src/assets/icons/sort.svg?react'
import TimerSvg from '/src/assets/icons/timer.svg?react'
import FiltersDisabledSvg from '/src/assets/icons/filters-disabled.svg?react'
import LanguageSvg from '/src/assets/icons/language.svg?react'
import RatingIcon from '/src/assets/logos/rating.png'

import Toggle from '../common/Toggle'
import Button from '../common/Button'
import Select from '../common/Select'
import Chip from '../common/Chip'
import Spinner from '../common/Spinner'

import styles from './FiltersPanel.module.css'

const FiltersPanel = observer(() => {
	const location = useLocation()

	const [page, setPage] = useState(null)
	const [filtersSettings, setFiltersSettings] = useState({})
	const [filtersActive, setFiltersActive] = useState(false)

	useEffect(() => {
		const page = location.pathname.split('/')[2]
		setPage(page)

		if (!['browse', 'random', 'list'].includes(page)) {
			dashboardStore.filtersActive = false
			dashboardStore.filtersDisabled = true
			setFiltersSettings(null)
			setFiltersActive(false)
			dashboardStore.currFilters = null
			return
		}

		if (dashboardStore.filtersConfig.fetchState !== 'success') return

		dashboardStore.filtersDisabled = false

		const currFiltersSettings = { ...dashboardStore.filtersConfig[page].filtersSettings }
		setFiltersSettings(currFiltersSettings)

		if (page === 'browse') {
			if (!dashboardStore.appliedBrowseFilters)
				dashboardStore.appliedBrowseFilters = JSON.parse(
					JSON.stringify(dashboardStore.filtersConfig.browse.defaultFilters)
				)
			dashboardStore.currFilters = JSON.parse(JSON.stringify(dashboardStore.appliedBrowseFilters))
			dashboardStore.filtersChanged = false
			setFiltersActive(dashboardStore.browseFiltersActive)
		} else if (page === 'random') {
			if (!dashboardStore.appliedRandomFilters)
				dashboardStore.appliedRandomFilters = JSON.parse(
					JSON.stringify(dashboardStore.filtersConfig.random.defaultFilters)
				)
			dashboardStore.currFilters = JSON.parse(JSON.stringify(dashboardStore.appliedRandomFilters))
			dashboardStore.filtersChanged = false
			setFiltersActive(dashboardStore.randomFiltersActive)
		} else if (page === 'list') {
			if (!dashboardStore.appliedListFilters)
				dashboardStore.appliedListFilters = JSON.parse(JSON.stringify(dashboardStore.filtersConfig.list.defaultFilters))
			dashboardStore.currFilters = JSON.parse(JSON.stringify(dashboardStore.appliedListFilters))
			dashboardStore.filtersChanged = false
			setFiltersActive(dashboardStore.listFiltersActive)
		}
	}, [
		location,
		dashboardStore.filtersConfig,
		dashboardStore.listFiltersActive,
		dashboardStore.browseFiltersActive,
		dashboardStore.randomFiltersActive,
	])

	return (
		<div className={styles['filters-panel'] + ' card'}>
			<div className={styles['header']}>
				<div className='flex items-center gap-[8px]'>
					<FilterSvg className={styles['filter-icon']} />
					<span className={styles['title']}>Filters</span>
				</div>
				<Toggle
					disabled={dashboardStore.filtersDisabled}
					checked={filtersActive}
					onChange={() => dashboardStore.toggleFiltersActive(page)}
				/>
			</div>

			{dashboardStore.filtersConfig.fetchState !== 'success' && (
				<div className={styles['loader-wrapper']}>
					<Spinner />
				</div>
			)}

			{dashboardStore.filtersDisabled && dashboardStore.filtersConfig.fetchState === 'success' && (
				<div className={styles['filters-disabled-wrapper']}>
					<div className={styles['filters-disabled']}>
						<FiltersDisabledSvg />
						<span>Disabled</span>
					</div>
				</div>
			)}

			{dashboardStore.filtersConfig.fetchState === 'success' && !dashboardStore.filtersDisabled && (
				<div className={`${styles['inputs-container']} ${!filtersActive ? styles['filters-inactive'] : ''}`}>
					{!!filtersSettings && (
						<div className={styles['inputs-wrapper']}>
							{/* SORT */}
							{!!filtersSettings.sortOptions && (
								<Select
									icon={<SortSvg />}
									label='Sort'
									options={filtersSettings.sortOptions}
									selected={dashboardStore.currFilters?.sort}
									onChange={(e) => dashboardStore.handleFilterChange('sort', e.target.value)}
								/>
							)}

							{/* TYPE */}
							{!!filtersSettings.type && (
								<div>
									<span className={styles['label']}>Type</span>
									<div className={styles['chips-wrapper']}>
										{filtersSettings.type.map((item) => (
											<Chip
												key={item.value}
												name={item.name}
												selected={dashboardStore.currFilters?.type === item.value}
												onClick={() => dashboardStore.handleFilterChange('type', item.value)}
											/>
										))}
									</div>
								</div>
							)}

							{/* GENRE */}
							{!!filtersSettings?.genres && (
								<div>
									<span className={styles['label']}>Genre</span>
									<div className={styles['chips-wrapper']}>
										{filtersSettings.genres?.map((item) => (
											<Chip
												key={item.value}
												name={item.name}
												selected={dashboardStore.currFilters?.genres?.includes(item.value)}
												onClick={() => dashboardStore.handleFilterChange('genres', item.value)}
											/>
										))}
									</div>
								</div>
							)}

							{/* YEAR */}
							{!!filtersSettings?.yearOptions && (
								<div>
									<span className={styles['label']}>Year</span>
									<div className={styles['year-selects-wrapper']}>
										<div className={styles['year-select-wrapper']}>
											<span>From</span>
											<Select
												options={filtersSettings.yearOptions}
												selected={dashboardStore.currFilters?.yearFrom}
												onChange={(e) => dashboardStore.handleFilterChange('year-from', e.target.value)}
											/>
										</div>
										<div className={styles['year-select-wrapper']}>
											<span>To</span>
											<Select
												options={filtersSettings.yearOptions}
												selected={dashboardStore.currFilters?.yearTo}
												onChange={(e) => dashboardStore.handleFilterChange('year-to', e.target.value)}
											/>
										</div>
									</div>
								</div>
							)}

							{/* RATING */}
							{!!filtersSettings?.ratingOptions && (
								<div className={styles['rating-wrapper']}>
									<div className={styles['rating-label-wrapper']}>
										<span>Min</span>
										<img className={styles['rating-icon']} src={RatingIcon} />
									</div>
									<div className={styles['rating-select-wrapper']}>
										<Select
											options={filtersSettings.ratingOptions}
											selected={dashboardStore.currFilters.minRating}
											onChange={(e) => dashboardStore.handleFilterChange('minRating', e.target.value)}
										/>
									</div>
								</div>
							)}

							{/* LANGUAGE */}
							{!!filtersSettings?.languageOptions && (
								<Select
									icon={<LanguageSvg />}
									label='Language'
									options={filtersSettings.languageOptions}
									selected={dashboardStore.currFilters?.language}
									onChange={(e) => dashboardStore.handleFilterChange('language', e.target.value)}
								/>
							)}

							{/* DURATION */}
							{!!filtersSettings?.durationOptions && (
								<Select
									icon={<TimerSvg />}
									label='Duration'
									options={filtersSettings.durationOptions}
									selected={dashboardStore.currFilters?.duration}
									onChange={(e) => dashboardStore.handleFilterChange('duration', e.target.value)}
								/>
							)}

							{/* 18+ */}
							{!!filtersSettings?.adult && (
								<div className={styles['adult']}>
									<span>Include 18+</span>
									<Toggle
										checked={dashboardStore.currFilters.adult}
										onChange={() => dashboardStore.handleFilterChange('adult')}
									/>
								</div>
							)}
						</div>
					)}
				</div>
			)}

			<div className={`${styles['bottom-wrapper']} ${!filtersActive ? styles['filters-inactive'] : ''}`}>
				<Button type='secondary' name='Reset' onClick={() => dashboardStore.resetFilter(page)} />
				<Button
					type='primary'
					name='Apply'
					onClick={() => dashboardStore.applyFilters(page)}
					disabled={!dashboardStore.filtersChanged}
				/>
			</div>
		</div>
	)
})

export default FiltersPanel
