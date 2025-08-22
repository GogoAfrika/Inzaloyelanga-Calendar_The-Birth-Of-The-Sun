import { NavLink } from 'react-router-dom'

export function NavBar() {
	return (
		<nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #e5e7eb' }}>
			<NavLink to="/" end>Home</NavLink>
			<NavLink to="/daily">Daily</NavLink>
			<NavLink to="/language">Language</NavLink>
			<NavLink to="/record">Record</NavLink>
			<NavLink to="/map">Map</NavLink>
			<NavLink to="/reading">Reading</NavLink>
			<NavLink to="/library">Library</NavLink>
			<NavLink to="/profile">Profile</NavLink>
		</nav>
	)
}