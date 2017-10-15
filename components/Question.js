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

    state = {
        showAnswer: false
    }

    render () {
        const { question } = this.props
        return (
            <View>
                <View>
                    {!this.state.showAnswer ?
                        <View>
                            <Text>{question.question}</Text>
                            <TouchableOpacity
                                onPress={() => this.setState({ showAnswer: true })}>
                                <Text style={[styles.buttonText, {alignItems: 'flex-end'}]}>ANSWER</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            <Text>{question.answer}</Text>
                            <TouchableOpacity
                                onPress={() => this.setState({ showAnswer: false })}>
                                <Text style={[styles.buttonText, {alignItems: 'flex-end'}]}>QUESTION</Text>
                            </TouchableOpacity>
                        </View>
                    }
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
    row: {
        flex: 1,
        flexDirection: 'row',
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
    }
})

export default Question