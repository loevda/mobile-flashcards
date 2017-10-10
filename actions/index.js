/**
 * Created by david2099 on 08/10/17.
 */
import * as DeckApi from '../utils/api'

export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const ADD_QUESTION = 'ADD_QUESTION'

export function saveDeckTitle (deckTitle) {
    return {
        type: SAVE_DECK_TITLE,
        deckTitle,
    }
}

export const saveDeckTitle = (deckTitle) => dispatch => (
    DeckApi.fetchAddPost(post)
        .then((post) => {
            dispatch(addPost(post))
        })
)


export function addQuestion (deck, question) {
    return {
        type: ADD_QUESTION,
        deck,
        question,
    }
}

