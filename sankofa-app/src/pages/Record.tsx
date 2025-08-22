import { useEffect, useRef, useState } from 'react'
import localforage from 'localforage'
import { useAppStore } from '../store/appStore'

localforage.config({
	name: 'sankofa',
	storeName: 'stories'
})

export function RecordStory() {
	const mediaRecorderRef = useRef<MediaRecorder | null>(null)
	const [permission, setPermission] = useState<'unknown' | 'granted' | 'denied'>('unknown')
	const [chunks, setChunks] = useState<Blob[]>([])
	const [recording, setRecording] = useState(false)
	const [lastSavedId, setLastSavedId] = useState<string | null>(null)
	const consentDefaults = useAppStore((s) => s.consentDefaults)

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ audio: true })
			.then(() => setPermission('granted'))
			.catch(() => setPermission('denied'))
	}, [])

	function startRecording() {
		setChunks([])
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			const mr = new MediaRecorder(stream)
			mediaRecorderRef.current = mr
			mr.ondataavailable = (e) => {
				if (e.data && e.data.size > 0) setChunks((prev) => [...prev, e.data])
			}
			mr.start()
			setRecording(true)
		})
	}

	function stopRecording() {
		const mr = mediaRecorderRef.current
		if (!mr) return
		mr.onstop = async () => {
			const blob = new Blob(chunks, { type: 'audio/webm' })
			const id = `story_${Date.now()}`
			await localforage.setItem(id, {
				id,
				createdAt: new Date().toISOString(),
				consent: consentDefaults,
				blob
			})
			setLastSavedId(id)
			setChunks([])
		}
		mr.stop()
		setRecording(false)
	}

	return (
		<div style={{ padding: 16 }}>
			<h2>Record Oral History</h2>
			<p>Permission: {permission}</p>
			<div style={{ display: 'flex', gap: 12 }}>
				<button onClick={startRecording} disabled={recording || permission !== 'granted'}>Start</button>
				<button onClick={stopRecording} disabled={!recording}>Stop & Save</button>
			</div>
			{lastSavedId && <p>Saved: {lastSavedId}</p>}
			<section style={{ marginTop: 16 }}>
				<h3>Consent defaults</h3>
				<ul>
					<li>Share with community: {String(consentDefaults.shareWithCommunity)}</li>
					<li>Allow map use: {String(consentDefaults.allowMapUse)}</li>
					<li>Require anonymize: {String(consentDefaults.requireAnonymize)}</li>
				</ul>
			</section>
		</div>
	)
}