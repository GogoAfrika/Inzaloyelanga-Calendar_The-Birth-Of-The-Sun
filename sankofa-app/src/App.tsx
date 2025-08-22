import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { NavBar } from './components/NavBar'
import { Home } from './pages/Home'
import { Daily } from './pages/Daily'
import { Language } from './pages/Language'
import { RecordStory } from './pages/Record'
import { MapPage } from './pages/Map'
import { Reading } from './pages/Reading'
import { Library } from './pages/Library'
import { Profile } from './pages/Profile'

function App() {
	return (
		<div className="app">
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/daily" element={<Daily />} />
				<Route path="/language" element={<Language />} />
				<Route path="/record" element={<RecordStory />} />
				<Route path="/map" element={<MapPage />} />
				<Route path="/reading" element={<Reading />} />
				<Route path="/library" element={<Library />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</div>
	)
}

export default App
