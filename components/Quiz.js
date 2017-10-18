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
import { find } from 'lodash'

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
        position < deck.questions.length ?
            this.setState({ position: (position + 1)})
            :
            null
        this.setState({ showAnswer: false })
    }

    prevPos = () => {
        const { position } = this.state
        position > 1 ?
            this.setState({ position: (position - 1)})
            :
            null
        this.setState({ showAnswer: false })
    }

    render () {
        const { deck  } = this.props.navigation.state.params
        const { correct, incorrect } = this.state
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 24, fontWeight: "700"}}>{deck.title}</Text>
                <Text>Question {this.state.position} of {deck.questions.length}</Text>
                <View style={styles.subContainer}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        {this.state.position > 1 ?
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={() => this.prevPos()}>
                                <Text style={[styles.buttonText, {alignItems: 'flex-end'}]}>PREVIOUS</Text>
                            </TouchableOpacity>
                            :
                            <Text/>
                        }
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        {this.state.position < deck.questions.length ?
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={() => this.nextPos()}>
                                <Text style={[styles.buttonText, {alignItems: 'flex-end'}]}>NEXT</Text>
                            </TouchableOpacity>
                            :
                            <Text/>
                        }
                    </View>
                </View>
                <Question
                    question={deck.questions[this.state.position-1]}
                    showAnswer={this.state.showAnswer}
                    setShowAnswer={this.setShowAnswer}
                    updateAnswered={this.updateAnswered}
                    isQuestionAnswered={this.isQuestionAnswered}
                />
                <View style={{flexDirection: 'row'}}>
                    <Text style={{flex: 1, justifyContent: 'flex-start'}}>{correct} correct answers</Text>
                    <Text style={{flex: 1, alignItems: 'flex-end'}}>{incorrect} incorrect answers</Text>
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
        justifyContent: 'flex-start'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    subContainer: {
        paddingTop: 14,
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        marginTop: 20,
        marginBottom: 30,
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