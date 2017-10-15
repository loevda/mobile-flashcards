/**
 * Created by david2099 on 08/10/17.
 */
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native';
import { white, orange, purple, red } from "../utils/colors";
import { Ionicons } from '@expo/vector-icons'

class DeckDetail extends React.Component {

    static navigationOptions = {
        title: "Decks list",
    }

    startQuiz = () => {
        const { deck } = this.props.navigation.state.params
        const { navigate } = this.props.navigation
        deck.questions.length > 0 ?
            navigate("Quiz", { deck: deck })
            :
            Alert.alert(
                'Start quiz',
                'You need to add at least 1 question to your deck before you can start the quiz.',
                [
                    {text: 'OK', onPress: () => null},
                ],
                { cancelable: false }
            )
    }

    render () {
        const { deck } = this.props.navigation.state.params
        const { navigate} = this.props.navigation
        return (
            <View style={[styles.container, styles.centering]}>
                <Text style={styles.deckTitle}>{deck.title.toUpperCase()}</Text>
                <Text>{deck.questions.length} questions</Text>
                <View style={styles.subContainer}>
                    <TouchableOpacity
                        style={[styles.touchable, { backgroundColor: purple }]}
                        onPress={() => navigate('AddQuestion', { deck: deck })}>
                        <Text style={styles.buttonText}>Add question</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.touchable, { backgroundColor: orange }]}
                        onPress={() => this.startQuiz()}>
                        <Text style={styles.buttonText}>Start quiz</Text>
                    </TouchableOpacity>
                </View>
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
        paddingTop: 20,
        flexDirection: 'column'
    },
    subContainer: {
        flex: 2,
        paddingTop: 24,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        marginTop: 30,
    },
    touchable: {
        borderRadius: 7,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10,
        height: 44,
        backgroundColor: white,
        margin: 10,
    },
    deckTitle: {
        fontSize: 24,
        fontWeight: "700",
        paddingTop: 40,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "300",
        color: white,
    }
})

export default DeckDetail