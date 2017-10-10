/**
 * Created by david2099 on 08/10/17.
 */
import { SAVE_DECK_TITLE, ADD_QUESTION } from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
        case SAVE_DECK_TITLE :
            return { ...state,
                [action.deckTitle]: { title: action.deckTitle, questions: [] }
            }
        case ADD_QUESTION :
            return state
        default :
            return state
    }
}

export default decks
