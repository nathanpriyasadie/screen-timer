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
        fontSize: 100,
        color: 'black'
    },
    clockContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})