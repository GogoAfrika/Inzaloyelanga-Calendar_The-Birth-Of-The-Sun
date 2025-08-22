import { useAppStore } from '../store/appStore'

export function Profile() {
	const selectedLanguage = useAppStore((s) => s.selectedLanguage)
	const consent = useAppStore((s) => s.consentDefaults)
	const updateConsent = useAppStore((s) => s.updateConsentDefaults)

	return (
		<div style={{ padding: 16 }}>
			<h2>Profile & Settings</h2>
			<p>Language: {selectedLanguage}</p>
			<h3>Consent defaults</h3>
			<label style={{ display: 'block', marginBottom: 8 }}>
				<input type="checkbox" checked={consent.shareWithCommunity} onChange={(e) => updateConsent({ shareWithCommunity: e.target.checked })} /> Share with community
			</label>
			<label style={{ display: 'block', marginBottom: 8 }}>
				<input type="checkbox" checked={consent.allowMapUse} onChange={(e) => updateConsent({ allowMapUse: e.target.checked })} /> Allow map use
			</label>
			<label style={{ display: 'block', marginBottom: 8 }}>
				<input type="checkbox" checked={consent.requireAnonymize} onChange={(e) => updateConsent({ requireAnonymize: e.target.checked })} /> Require anonymize
			</label>
		</div>
	)
}