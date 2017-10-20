/**
 * Created by david2099 on 08/10/17.
 */
import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { coreStyles } from '../utils/helpers'

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
            <View style={coreStyles.container}>

                <Text style={coreStyles.label}>What is the title of your new deck?</Text>

                <TextInput
                    onChangeText={(deckTitle) => this.setState({deckTitle})}
                    defaultValue={this.state.deckTitle}
                    style={coreStyles.input}
                />

                <TouchableOpacity
                    style={Platform.OS === 'ios' ? coreStyles.iosSubmitBtn : coreStyles.AndroidSubmitBtn}
                    onPress={() => this.submitDeck()}>
                    <Text style={coreStyles.submitBtnText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default AddDeck