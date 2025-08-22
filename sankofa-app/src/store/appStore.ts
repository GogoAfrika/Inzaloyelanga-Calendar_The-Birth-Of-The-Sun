import { create } from 'zustand'

export type ConsentSettings = {
	shareWithCommunity: boolean
	allowMapUse: boolean
	requireAnonymize: boolean
}

export type AppState = {
	selectedLanguage: string
	consentDefaults: ConsentSettings
	setSelectedLanguage: (languageCode: string) => void
	updateConsentDefaults: (partial: Partial<ConsentSettings>) => void
}

export const useAppStore = create<AppState>((set) => ({
	selectedLanguage: 'sw',
	consentDefaults: {
		shareWithCommunity: true,
		allowMapUse: true,
		requireAnonymize: false,
	},
	setSelectedLanguage: (languageCode: string) => set({ selectedLanguage: languageCode }),
	updateConsentDefaults: (partial: Partial<ConsentSettings>) => set((state) => ({
		consentDefaults: { ...state.consentDefaults, ...partial },
	})),
}))