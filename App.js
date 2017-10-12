import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    StatusBar
} from 'react-native';
import { TabNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import { Constants } from 'expo'
import * as DeckApi from './utils/api'

function FlashCardStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}


const Tabs = TabNavigator({
    Decks: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        },
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

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
        DeckApi.saveDeckTitle(deckTitle).then(() => {
            this.loadDecks()
        })
    }

    componentDidMount() {
        this.loadDecks()
    }

    render() {
        screenProps = {
            decks: this.state.decks,
            loading: this.state.loading,
            clearDecks: this.clearDecks,
            saveDeckTitle: this.saveDeckTitle
        }
        return (
            <View style={{flex: 1}}>
                <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
                <Tabs screenProps={screenProps}  />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
