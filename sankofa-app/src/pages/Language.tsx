import { useAppStore } from '../store/appStore'

const wordsByLang: Record<string, { word: string, meaning: string }[]> = {
	sw: [
		{ word: 'uhuru', meaning: 'freedom' },
		{ word: 'heshima', meaning: 'respect' },
		{ word: 'jamii', meaning: 'community' },
	],
	ha: [
		{ word: 'yanci', meaning: 'freedom' },
		{ word: 'girmamā', meaning: 'respect' },
		{ word: 'al’umma', meaning: 'community' },
	],
}

export function Language() {
	const selectedLanguage = useAppStore((s) => s.selectedLanguage)
	const setSelectedLanguage = useAppStore((s) => s.setSelectedLanguage)
	const deck = wordsByLang[selectedLanguage] || []

	return (
		<div style={{ padding: 16 }}>
			<h2>Language</h2>
			<label>
				Language:
				<select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
					<option value="sw">Swahili</option>
					<option value="ha">Hausa</option>
				</select>
			</label>
			<ul style={{ marginTop: 12 }}>
				{deck.map((item) => (
					<li key={item.word}>{item.word} — {item.meaning}</li>
				))}
			</ul>
		</div>
	)
}