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
import { NavigationActions } from 'react-navigation'
import { coreStyles } from '../utils/helpers'

class AddQuestion extends React.Component {

    static navigationOptions = {
        title: "Deck details",
    }

    state = {
        questionText: "",
        answerText: "",
    }

    addQuestion = () => {
        const { addQuestion } = this.props.screenProps
        const { deck } = this.props.navigation.state.params
        const { navigate } = this.props.navigation
        const { questionText, answerText } = this.state
        if (questionText.length > 10 && answerText.length > 2) {
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
            <View style={coreStyles.container}>

                <Text style={[coreStyles.label, {justifyContent: 'center'}]}>Type your question</Text>

                <TextInput
                    onChangeText={(questionText) => this.setState({questionText})}
                    defaultValue={this.state.questionText}
                    style={coreStyles.input}
                />

                <Text style={coreStyles.label}>Type your answer</Text>

                <TextInput
                    onChangeText={(answerText) => this.setState({answerText})}
                    defaultValue={this.state.answerText}
                    style={coreStyles.input}
                />

                <TouchableOpacity
                    style={Platform.OS === 'ios' ? coreStyles.iosSubmitBtn : coreStyles.AndroidSubmitBtn}
                    onPress={() => this.addQuestion()}>
                    <Text style={coreStyles.submitBtnText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default AddQuestion