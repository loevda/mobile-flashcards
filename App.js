import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Alert
} from 'react-native'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import * as DeckApi from './utils/api'
import { setLocalNotification } from './utils/helpers'
import MainNavigator from './routes'

function FlashCardStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default class App extends React.Component {

    state = {
        decks: [],
        loading: true
    }

    loadDecks = () => {
        this.setState({ loading: true })
        DeckApi.getDecks().then((response) => {
            if (response !== null) {
                const res = JSON.parse(response)
                const decks = Object.keys(res).map((key) => {
                    return res[key]
                })
                this.setState({ decks: decks })
            }
            this.setState({ loading: false })
        }).catch((error) => {
            console.log(error)
            this.setState({ loading: false })
        })
    }

    clearDecks = () => {
        DeckApi.clearDecks().then(() => this.setState({ decks: []}))
    }

    saveDeckTitle = (deckTitle) => {
        const { decks } = this.state
        const filteredDecks = decks.filter((item) => item.title === deckTitle)
        filteredDecks.length > 0 ?
            Alert.alert(
                'Deck already exists',
                `The deck you are trying to create with the title '${deckTitle}' already exists.`,
                [
                    {text: 'OK', onPress: () => null},],
                { cancelable: false }
            )
            :
            DeckApi.saveDeckTitle(deckTitle).then(() => {
                this.loadDecks()
            })
    }

    addQuestion = (deck, question) => {
        const questions = deck.questions
        questions.push(question)
        const newDeck = {title: deck.title, questions: questions}
        DeckApi.addCardToDeck(newDeck)
        this.loadDecks()
        return
    }

    componentDidMount() {
        this.loadDecks()
        setLocalNotification()
    }

    render() {
        screenProps = {
            decks: this.state.decks,
            loading: this.state.loading,
            clearDecks: this.clearDecks,
            saveDeckTitle: this.saveDeckTitle,
            addQuestion: this.addQuestion,
        }
        return (
            <View style={{flex: 1}}>
                <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
                <MainNavigator screenProps={screenProps}  />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
