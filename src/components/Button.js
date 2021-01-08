import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Vibration } from 'react-native'

export default function Button({ text, containerStyle, onPress, ...props }) {
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, containerStyle]}
            onPress={() => {
                onPress()
                // Vibration.vibrate(100)
            }}
            {...props}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'blue',
        padding: 20,
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'white'
    }
})