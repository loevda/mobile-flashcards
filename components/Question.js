/**
 * Created by david2099 on 08/10/17.
 */
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';
import { white, red, purple, orange } from "../utils/colors";

class Question extends React.Component {

    render () {
        const { question, showAnswer, setShowAnswer, updateAnswered, isQuestionAnswered } = this.props
        return (
            <View style={styles.questionContainer}>
                {!showAnswer ?
                    <View>
                        <Text style={styles.questionTitle}>{question.question}</Text>
                        <TouchableOpacity
                            style={{alignItems: 'center', marginTop: 12}}
                            onPress={() => setShowAnswer(true)}>
                            <Text style={[styles.buttonText, {alignItems: 'flex-end'}]}>SHOW ANSWER</Text>
                        </TouchableOpacity>
                        {!isQuestionAnswered() ?
                            <View>
                                <TouchableOpacity
                                    style={[styles.touchable, {
                                        marginTop: 50,
                                        alignItems: 'center',
                                        backgroundColor: purple
                                    }]}
                                    onPress={() => updateAnswered(true)}>
                                    <Text style={[styles.buttonText, {
                                        alignItems: 'flex-end',
                                        color: white
                                    }]}>CORRECT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.touchable, {
                                        marginTop: 10,
                                        alignItems: 'center',
                                        backgroundColor: orange
                                    }]}
                                    onPress={() => updateAnswered(false)}>
                                    <Text style={[styles.buttonText, {
                                        alignItems: 'flex-end',
                                        color: white
                                    }]}>INCORRECT</Text>
                                </TouchableOpacity>
                            </View>
                            :

                            <Text style={{marginTop: 20}}>You already answered this question</Text>
                        }
                    </View>
                    :
                        <View>
                            <Text style={styles.questionTitle}>{question.answer}</Text>
                            <TouchableOpacity
                                style={{alignItems: 'center', marginTop: 12}}
                                onPress={() => setShowAnswer(false)}>
                                <Text style={[styles.buttonText, {alignItems: 'flex-end'}]}>SHOW QUESTION</Text>
                            </TouchableOpacity>
                        </View>
                    }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    questionContainer: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'flex-start',
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
        backgroundColor: white,
    },
    questionTitle: {
        fontSize: 26,
        fontWeight: "300",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "300",
    }
})

export default Question