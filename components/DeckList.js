/**
 * Created by david2099 on 08/10/17.
 */
import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'
import { white, purple } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import * as DeckApi from '../utils/api'
import Deck from './Deck'

class DeckList extends React.Component {

    state = {
        loaded: false,
        decks: []
    }

    componentDidMount() {
        DeckApi.getDecks().then((response) => {
            if (response !== null) {
                const res = JSON.parse(response)
                const decks = Object.keys(res).map((key) => {
                    return res[key]
                })
                this.setState({ decks: decks })
            }
            this.setState({ loaded: true })
        })
    }

    gotoAddDesk() {
        const { navigate } = this.props.navigation
        navigate('AddDeck')
    }

    clearAllDesk() {
        Alert.alert(
            'Clear all Desks',
            'Are you sure you want to clear all desks? This action is not reversible.',
            [
                {text: 'Yes, I\'m sure', onPress: () => {
                    DeckApi.clearDecks().then(() => this.setState({ decks: []}))
                }},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        )
    }

    render () {
        const { decks, loaded } = this.state

        if (!loaded) {
            return (
                <ActivityIndicator
                    animating={this.state.animating}
                    style={styles.centering}
                    size="large"
                />
            )
        }

        return (
            <View style={styles.container}>
            {decks.length > 0 ?
                <View>
                    <FlatList
                        data={this.state.decks}
                        keyExtractor={(item, index) => item.title}
                        renderItem={({ item, index }) => (
                            <Deck title={item.title} questions={item.questions} />
                        )}
                    />
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => this.clearAllDesk()}>
                        <Text style={{fontSize: 20}}>Clear all desks</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.centering}>
                    <Text style={styles.warningText}>No decks</Text>
                    <View style={styles.buttonAndIcon}>
                        <Text style={styles.smallWarning}>Start adding decks</Text>
                        <TouchableOpacity
                            style={{marginLeft: 10, marginTop: 6}}
                            onPress={() => this.gotoAddDesk()}>
                            <Ionicons
                                name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        flexDirection: 'column'
    },
    warningText: {
        fontSize: 30,
        fontWeight: "100",
    },
    smallWarning: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 4,
        flexDirection: 'column',
        fontSize: 20,
    },
    buttonAndIcon: {
        flexDirection: 'row',
    },
    clearButton: {
        borderRadius: 7,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        alignSelf: 'stretch',
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
})

export default DeckList