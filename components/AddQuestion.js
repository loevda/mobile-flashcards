import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { white, purple } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

class AddQuestion extends React.Component {

    static navigationOptions = {
        title: "Deck details",
    }

    state = {
        questionText: "",
        answerText: ""
    }

    addQuestion = () => {
        const { addQuestion } = this.props.screenProps
        const { deck } = this.props.navigation.state.params
        const { navigate } = this.props.navigation
        const { questionText, answerText } = this.state
        if (questionText.length > 10 && answerText.length > 5) {
            addQuestion(deck, {question: questionText, answer: answerText })
            const backAction = NavigationActions.back({
                deck: deck
            })
            this.props.navigation.dispatch(backAction)
        }else{
            Alert.alert(
                'Add question',
                'You need to type a question at least 10 chars long and an answer at least 5 hars long.',
                [
                    {text: 'OK', onPress: () => null},
                ],
                { cancelable: false }
            )
        }

    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.label}>Type your question</Text>

                <TextInput
                    onChangeText={(questionText) => this.setState({questionText})}
                    defaultValue={this.state.questionText}
                    style={styles.input}
                />

                <Text style={styles.label}>Type your answer</Text>

                <TextInput
                    onChangeText={(answerText) => this.setState({answerText})}
                    defaultValue={this.state.answerText}
                    style={styles.input}
                />

                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={() => this.addQuestion()}>
                    <Text style={styles.submitBtnText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    label: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: '300',
    },
    input: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
        fontSize: 26,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})


export default AddQuestion