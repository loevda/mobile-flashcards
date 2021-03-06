/**
 * Created by david2099 on 08/10/17.
 */
import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Platform,
    TextInput,
    StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { white, purple } from '../utils/colors'

class AddDeck extends React.Component {

    state = {
        deckTitle: ""
    }

    submitDeck() {
        const { navigate } = this.props.navigation
        this.props.screenProps.saveDeckTitle(this.state.deckTitle)
        this.setState({ deckTitle: ""})
        navigate('Decks')
    }

    render () {

        return (
            <View style={styles.container}>

                <Text style={styles.label}>What is the title of your new deck?</Text>

                <TextInput
                    onChangeText={(deckTitle) => this.setState({deckTitle})}
                    defaultValue={this.state.deckTitle}
                    style={styles.input}
                />

                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={() => this.submitDeck()}>
                    <Text style={styles.submitBtnText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    label: {
        fontSize: 24,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: '300',
        alignSelf: 'stretch',
    },
    input: {
        height: 70,
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: 10,
        marginBottom: 20,
        padding: 20,
        fontSize: 24,
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        alignSelf: 'stretch',
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
})

export default AddDeck