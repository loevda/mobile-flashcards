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

class Quiz extends React.Component {

    static navigationOptions = {
        title: "Exit quiz",
    }

    state = {
        position: 1,
    }

    nextPos = () => {
        const { position } = this.state
        const { deck } = this.props.navigation.state.params
        position < deck.questions.length ?
            this.setState({ position: (position + 1)})
            :
            null
    }

    prevPos = () => {
        const { position } = this.state
        position > 1 ?
            this.setState({ position: (position - 1)})
            :
            null
    }

    render () {
        const { deck  } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 24, fontWeight: "700"}}>{deck.title}</Text>
                <Text>Question {this.state.position} of {deck.questions.length}</Text>
                <View style={styles.subContainer}>
                    <View style={styles.row}>
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
                    <View style={styles.halfView}>
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
                <Question question={deck.questions[this.state.position-1]} />
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

export default Quiz