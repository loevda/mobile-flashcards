/**
 * Created by david2099 on 08/10/17.
 */
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

export function addQuestion (deck, question) {
    return {
        type: ADD_QUESTION,
        deck,
        question,
    }
}

