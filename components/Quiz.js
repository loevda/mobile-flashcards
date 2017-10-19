/**
 * Created by david2099 on 08/10/17.
 */
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import { white, purple, orange } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import Question from './Question'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends React.Component {

    static navigationOptions = {
        title: "Exit quiz",
    }

    state = {
        position: 1,
        showAnswer: false,
        answered: [],
        correct: 0,
        incorrect: 0
    }

    componentDidMount() {
        clearLocalNotification()
            .then(setLocalNotification())
    }

    reset = () => {
        this.setState({
            position: 1,
            showAnswer: false,
            answered: [],
            correct: 0,
            incorrect: 0
        })
    }

    setShowAnswer = (value) => {
        this.setState({ showAnswer: value })
    }

    quizCompleted = () => {
        const { position } = this.state
        const { deck  } = this.props.navigation.state.params
        return (position > deck.questions.length && this.allQuestionAnswered())
    }

    allQuestionAnswered = () => {
        const { position, correct, incorrect } = this.state
        const { deck  } = this.props.navigation.state.params
        return (correct + incorrect === deck.questions.length)
    }

    isQuestionAnswered = () => {
        const { position, answered } = this.state
        return answered.filter((i) => {
                return i === position
            }).length > 0
    }

    updateAnswered = (res) => {
        const { deck  } = this.props.navigation.state.params
        let { answered, correct, incorrect } = this.state
        const { position } = this.state
        if (position <= deck.questions.length &&
            !this.isQuestionAnswered()) {
            answered.push(position)
            res ? correct += 1 : incorrect += 1
        }
        this.setState({ answered, correct, incorrect })
        this.nextPos()
    }

    nextPos = () => {
        const { position } = this.state
        const { deck } = this.props.navigation.state.params
        position < deck.questions.length + 1 ?
            this.setState({ position: (position + 1)})
            :
            null
        this.setState({ showAnswer: false })
    }

    render () {
        const { deck  } = this.props.navigation.state.params
        const { correct, incorrect, position } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                <Text style={{fontSize: 24, fontWeight: "700"}}>{deck.title}</Text>
                    {position > deck.questions.length ?
                        <Text>Quiz result</Text>
                        :
                        <Text style={{alignItems: 'center'}}>Question {this.state.position} of {deck.questions.length}</Text>
                    }

                </View>
                <View style={styles.subContainer}>
                    {this.quizCompleted() ?
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 24, marginBottom: 30}}>Quiz is completed!</Text>
                            <Text style={{fontSize: 18, marginBottom: 30,}}>{correct} out of {deck.questions.length} answered correctly.</Text>
                            <TouchableOpacity
                                style={[styles.touchable, {
                                    marginTop: 10,
                                    alignItems: 'center',
                                    backgroundColor: orange,
                                    marginBottom: 20,
                                }]}
                                onPress={() => this.reset()}>
                                <Text style={[styles.buttonText, {
                                    alignItems: 'flex-end',
                                    color: white
                                }]}>RESET QUIZ</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <Question
                            question={deck.questions[position-1]}
                            showAnswer={this.state.showAnswer}
                            setShowAnswer={this.setShowAnswer}
                            updateAnswered={this.updateAnswered}
                            isQuestionAnswered={this.isQuestionAnswered}
                        />

                    }
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'flex-end', paddingTop: 20, borderTopWidth: StyleSheet.hairlineWidth}}>
                    <Text style={{flex: 1, justifyContent: 'flex-start'}}>{correct} correct answer{correct !== 1 ? `s` : ``} </Text>
                    <Text style={{flex: 1, alignItems: 'flex-end'}}>{incorrect} incorrect answer{incorrect !== 1 ? `s` : ``} </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        padding: 20,
        backgroundColor: white,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    subContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    questionContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    touchable: {
        borderRadius: 7,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10,
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
    }
})

export default Quiz