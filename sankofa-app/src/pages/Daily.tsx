import { useEffect, useState } from 'react'
import { useAppStore } from '../store/appStore'

type ContentPack = {
	proverbs: Record<string, { text: string, gloss: string }[]>
}

export function Daily() {
	const language = useAppStore((s) => s.selectedLanguage)
	const [proverb, setProverb] = useState<string>('')

	useEffect(() => {
		async function load() {
			try {
				const res = await fetch('/content-pack.json')
				const data: ContentPack = await res.json()
				const list = data.proverbs[language] || []
				if (list.length > 0) {
					const idx = new Date().getDate() % list.length
					setProverb(`${list[idx].text} — ${list[idx].gloss}`)
				}
			} catch {
				setProverb('')
			}
		}
		load()
	}, [language])

	return (
		<div style={{ padding: 16 }}>
			<h2>Daily Practice</h2>
			<ol>
				<li><strong>Affirmation</strong>: I carry the wisdom of my people.</li>
				<li><strong>Proverb</strong>: {proverb || 'Ubuntu ngumuntu ngabantu.'}</li>
				<li><strong>Micro-lesson</strong>: Learn 3 words in your chosen language.</li>
				<li><strong>Reflection</strong>: What story will I preserve this week?</li>
			</ol>
		</div>
	)
}