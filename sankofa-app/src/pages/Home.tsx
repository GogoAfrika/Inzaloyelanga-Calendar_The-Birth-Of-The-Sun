import { Link } from 'react-router-dom'

export function Home() {
	return (
		<div style={{ padding: 16 }}>
			<h1>Sankofa</h1>
			<p>Reclaim language, memory, and place.</p>
			<section>
				<h3>Today</h3>
				<p><em>Affirmation:</em> I am the bridge between ancestors and descendants.</p>
				<p><em>Proverb:</em> Asiyefunzwa na mamae hufunzwa na ulimwengu. (Swahili)</p>
			</section>
			<nav style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
				<Link to="/daily">Daily Practice</Link>
				<Link to="/language">Language</Link>
				<Link to="/record">Record Story</Link>
				<Link to="/map">Map of Memory</Link>
				<Link to="/reading">Reading Circle</Link>
				<Link to="/library">Library</Link>
			</nav>
		</div>
	)
}