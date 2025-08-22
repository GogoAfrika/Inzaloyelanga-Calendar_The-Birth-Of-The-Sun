import { useEffect, useState } from 'react'

type Primer = { id: string, title: string, minutes: number }

export function Reading() {
	const [primers, setPrimers] = useState<Primer[]>([])
	useEffect(() => {
		async function load() {
			try {
				const res = await fetch('/content-pack.json')
				const data = await res.json()
				setPrimers(data.primers || [])
			} catch {
				setPrimers([])
			}
		}
		load()
	}, [])
	return (
		<div style={{ padding: 16 }}>
			<h2>Reading Circle</h2>
			<ul>
				{primers.map((p) => (
					<li key={p.id}>{p.title} — {p.minutes} min</li>
				))}
			</ul>
		</div>
	)
}