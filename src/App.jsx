import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/dashboard' element={<DashboardPage />} />
			</Routes>
		</>
	)
}

export default App
