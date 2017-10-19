/**
 * Created by david2099 on 08/10/17.
 */
import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'MobileFlashCards:decks'


export const getDecks = async () => {
    try {
        return await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    }catch (error) {
        console.log("invalid query")
    }
}

export const saveDeckTitle = async (deckTitle) => {
    return await AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [deckTitle]: { title: deckTitle, questions: []}
    }))
}

export const addCardToDeck = async (deck) => {
    return await AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [deck.title]: deck
    }))
}

export const clearDecks = async () => {
    return await AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify({}))
}