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
    List,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'
import { white, purple } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import DeckDetail from './DeckDetail'

class DeckList extends React.Component {

    gotoAddDesk() {
        const { navigate } = this.props.navigation
        navigate('AddDeck')
    }

    gotoDeckDetail(item) {
        const { navigate } = this.props.navigation
        navigate('DeckDetail', { deck: item})
    }

    clearAllDesk() {
        const { clearDecks } = this.props.screenProps
        Alert.alert(
            'Clear all Desks',
            'Are you sure you want to clear all desks? This action is not reversible.',
            [
                {text: 'Yes, I\'m sure', onPress: () => clearDecks()},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        )
    }

    renderListFooter = () => {
        return (
            <View style={styles.bottomView}>
                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => this.clearAllDesk()}>
                    <Text style={{fontSize: 20}}>Clear all desks</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render () {
        const { loading, decks } = this.props.screenProps

        if (loading) {
            return (
                <ActivityIndicator
                    animating={true}
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
                        data={decks}
                        keyExtractor={(item, index) => item.title}
                        renderItem={({ item, index }) => (
                            <View style={styles.deckContainer}>
                                <TouchableOpacity
                                    style={styles.touchable}
                                    onPress={() => this.gotoDeckDetail(item)}>
                                    <Text style={styles.deckTitle}>{item.title.toUpperCase()}</Text>
                                    <Text>{item.questions.length} questions</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        ListFooterComponent={() => this.renderListFooter()}
                    />
                </View>
                :
                <View style={styles.centering}>
                    <Text style={styles.warningText}>No decks</Text>
                    <View style={styles.buttonAndIcon}>
                        <Text style={styles.smallWarning}>Start adding decks</Text>
                        <TouchableOpacity
                            style={{marginLeft: 10, marginTop: 6 }}
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
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    clearButton: {
        borderRadius: 7,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 8,
        alignSelf: 'stretch',
        backgroundColor: white,
        marginTop: 30,
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        borderWidth: StyleSheet.hairlineWidth,
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
    deckContainer: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1,
        justifyContent: 'center',
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    deckTitle: {
        fontSize: 20,
        fontWeight: "700",
    }
})

export default DeckList