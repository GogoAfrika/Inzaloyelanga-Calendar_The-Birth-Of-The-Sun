import { useEffect, useState } from 'react'
import localforage from 'localforage'
import { Howl } from 'howler'

type StoredStory = {
	id: string
	createdAt: string
	consent: any
	blob: Blob
}

export function Library() {
	const [stories, setStories] = useState<StoredStory[]>([])

	useEffect(() => {
		let mounted = true
		async function load() {
			const keys = await localforage.keys()
			const entries: StoredStory[] = []
			for (const key of keys) {
				if (!key.startsWith('story_')) continue
				const item = await localforage.getItem<any>(key)
				if (item) entries.push(item as StoredStory)
			}
			if (mounted) setStories(entries.sort((a,b) => a.createdAt.localeCompare(b.createdAt)))
		}
		load()
		return () => { mounted = false }
	}, [])

	function play(story: StoredStory) {
		const url = URL.createObjectURL(story.blob)
		const sound = new Howl({ src: [url], format: ['webm'] })
		sound.play()
	}

	return (
		<div style={{ padding: 16 }}>
			<h2>Library</h2>
			{stories.length === 0 && <p>No stories saved yet.</p>}
			<ul>
				{stories.map((s) => (
					<li key={s.id}>
						<button onClick={() => play(s)}>Play</button>
						{' '}{s.id} — {new Date(s.createdAt).toLocaleString()}
					</li>
				))}
			</ul>
		</div>
	)
}