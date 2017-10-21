/**
 * Created by david2099 on 08/10/17.
 */
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { white, purple, orange } from "../utils/colors"

class Question extends React.Component {

    render () {
        const { question, showAnswer, setShowAnswer, updateScore } = this.props
        return (
            <View style={styles.questionContainer}>
                {!showAnswer ?
                    <View style={[styles.centering, {flexDirection: 'column', alignSelf: 'stretch'}]}>
                        <Text style={styles.questionTitle}>{question.question}</Text>
                        <TouchableOpacity
                            style={{alignItems: 'center', marginTop: 12}}
                            onPress={() => setShowAnswer(true)}>
                            <Text style={[styles.buttonText, {alignItems: 'flex-end'}]}>SHOW ANSWER</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={[styles.centering, {flexDirection: 'column', alignSelf: 'stretch'}]}>
                        <Text style={styles.questionTitle}>{question.answer}</Text>
                        <TouchableOpacity
                            style={{alignItems: 'center', marginTop: 12}}
                            onPress={() => setShowAnswer(false)}>
                            <Text style={[styles.buttonText, {alignItems: 'flex-end'}]}>SHOW QUESTION</Text>
                        </TouchableOpacity>
                    </View>
                }

                <View style={[styles.centering, {flexDirection: 'column', alignSelf: 'stretch'}]}>
                    <TouchableOpacity
                        style={[styles.touchable, {
                            marginTop: 50,
                            alignItems: 'center',
                            backgroundColor: purple
                        }]}
                        onPress={() => updateScore(true)}>
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
                        onPress={() => updateScore(false)}>
                        <Text style={[styles.buttonText, {
                            alignItems: 'flex-end',
                            color: white
                        }]}>INCORRECT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    questionContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        flexDirection: 'column'
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