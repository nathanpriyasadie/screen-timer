import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { timeParser } from '../utils/time';

export default function Clock({ timeLeft }) {
    return (
        <View style={styles.clockContainer}>
            <Text style={styles.textContainer}>{timeParser(timeLeft)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        fontSize: 40,
        color: 'black',
        fontFamily: 'Poppins-Regular',
        marginBottom: -20
    },
    clockContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})