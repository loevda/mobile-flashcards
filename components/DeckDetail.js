/**
 * Created by david2099 on 08/10/17.
 */
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { white, orange, purple } from "../utils/colors";
import { Ionicons } from '@expo/vector-icons'

class DeckDetail extends React.Component {
    render () {
        const { title, questions } = this.props
        return (
            <View style={styles.deckContainer}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => null}>
                    <Text style={styles.deckTitle}>{title.toUpperCase()}</Text>
                    <Text>{questions.length} questions</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckContainer: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1,
        justifyContent: 'center',
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    deckTitle: {
        fontSize: 20,
        fontWeight: "700",
    }
})

export default DeckDetail