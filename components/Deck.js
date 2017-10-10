/**
 * Created by david2099 on 08/10/17.
 */
import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

class Deck extends React.Component {
    render () {
        const { title, questions } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title.toUpperCase()}</Text>
                <Text>{questions.length} questions</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
    }
})

export default Deck