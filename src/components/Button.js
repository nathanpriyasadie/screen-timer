import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Vibration } from 'react-native'

export default function Button({ children, containerStyle, onPress, ...props }) {
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, containerStyle]}
            onPress={() => {
                onPress()
                Vibration.vibrate(100)
            }}
            {...props}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 20,
        flex: 1,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'white'
    }
})