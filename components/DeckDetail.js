/**
 * Created by david2099 on 08/10/17.
 */
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { white, orange, purple, red } from "../utils/colors";
import { Ionicons } from '@expo/vector-icons'
import { coreStyles } from '../utils/helpers'

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
            <View style={[styles.container, coreStyles.centering]}>
                <Text style={[coreStyles.deckTitle, {paddingTop: 40}]}>{deck.title.toUpperCase()}</Text>
                <Text>{deck.questions.length} questions</Text>
                <View style={styles.subContainer}>
                    <TouchableOpacity
                        style={[coreStyles.touchable, { backgroundColor: purple }]}
                        onPress={() => navigate('AddQuestion', { deck: deck })}>
                        <Text style={[coreStyles.buttonText, {color: white}]}>Add question</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[coreStyles.touchable, { backgroundColor: orange }]}
                        onPress={() => this.startQuiz()}>
                        <Text style={[coreStyles.buttonText, {color: white}]}>Start quiz</Text>
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
    subContainer: {
        flex: 2,
        paddingTop: 24,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        marginTop: 30,
    },
})

export default DeckDetail