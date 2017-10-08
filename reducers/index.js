/**
 * Created by david2099 on 08/10/17.
 */
import { ADD_DECK, ADD_QUESTION } from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
        case ADD_DECK :
            return state
        case ADD_QUESTION :
            return state
        default :
            return state
    }
}

export default decks
