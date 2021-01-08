import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Vibration,
    AppState,
} from 'react-native';
import BackgroundTask from 'react-native-background-task'
import BackgroundTimer from "react-native-background-timer";
import Clock from '../components/Clock';
import Button from '../components/Button';
import { getTime } from '../utils/time';
import { gunSound } from '../utils/sound';
import {
    LocalNotification,
    ScheduledLocalNotification
} from '../services/LocalPushController'
import { WORK_TIME } from '../constant/time';
import { getAppState } from '../hooks/appState';

export default function Home() {
    const appState = getAppState()
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [paused, setPaused] = useState(false)
    const [mode, setMode] = useState("work")

    const handleButtonPress = () => {
        LocalNotification()
    }

    useEffect(() => {
        const intervalId = BackgroundTimer.setInterval(() => {
            handleTimeChange()
        }, 1000);

        return () => {
            BackgroundTimer.clearInterval(intervalId)
        }
    })


    useEffect(() => {
        setTimeLeft(getTime(mode))
    }, [mode])


    function handleTimeChange() {
        if (timeLeft === 0) {
            handleNextCycle()
        } else {
            !paused && setTimeLeft(timeLeft - 1)
        }
    }

    function handleReset() {
        setTimeLeft(getTime(mode))
    }

    function handleNextCycle() {
        setMode(mode === 'work' ? 'rest' : 'work')
        gunSound.play()
        appState === 'background' && LocalNotification()
    }

    return (
        <View style={[styles.container, { backgroundColor: paused ? 'yellow' : mode === 'work' ? 'lightgreen' : 'red' }]}>
            <Clock timeLeft={timeLeft} />
            <Text style={styles.modeText}>{paused ? 'PAUSED' : mode === 'work' ? 'WORK' : 'REST'}</Text>
            <Text>{appState}</Text>
            <View style={styles.buttonsContainer}>
                <Button text={paused ? "Continue" : 'Pause'}
                    onPress={() => setPaused(!paused)}
                    containerStyle={[styles.pauseButton, { backgroundColor: paused ? 'green' : 'red' }]} />
                <View style={styles.bottomButtonsContainer}>
                    <Button text="Reset" onPress={() => handleReset()} />
                    <Button text="Next Cycle" onPress={() => handleNextCycle()} />
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        padding: '10%',
    },
    buttonsContainer: {
        bottom: '10%',
        width: '100%',
        position: 'absolute'
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        marginTop: 90
    },
    modeText: {
        fontSize: 40
    }
})