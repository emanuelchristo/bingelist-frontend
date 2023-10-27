import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage'
import NotFoundPage from './pages/NotFoundPage'
import ListPanel from './components/DashboardPage/ListPanel'
import DiscoverPanel from './components/DashboardPage/DiscoverPanel'
import SearchPanel from './components/DashboardPage/SearchPanel'
import RandomPanel from './components/DashboardPage/RandomPanel'
import SimilarPanel from './components/DashboardPage/SimilarPanel'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/dashboard' element={<DashboardPage />}>
					<Route path='discover' element={<DiscoverPanel />} />
					<Route path='search' element={<SearchPanel />} />
					<Route path='random' element={<RandomPanel />} />
					<Route path='similar' element={<SimilarPanel />} />
					<Route path='list/:listId' element={<ListPanel />} />
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</>
	)
}

export default App
