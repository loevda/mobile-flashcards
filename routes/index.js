/**
 * Created by david2099 on 22/10/17.
 */
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Platform } from 'react-native'
import { purple, white } from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Quiz from '../components/Quiz'
import DeckList from '../components/DeckList'
import AddDeck from '../components/AddDeck'
import DeckDetail from '../components/DeckDetail'
import AddQuestion from '../components/AddQuestion'


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

export default MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    },
    AddQuestion: {
        screen: AddQuestion,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    }
})