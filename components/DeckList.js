/**
 * Created by david2099 on 08/10/17.
 */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { white } from '../utils/colors'

class DeckList extends React.Component {
    render () {
        return (
            <View style={styles.container}>
                <Text>This is a deck list</Text>
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
})

export default DeckList