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
import ProgressCircle from 'react-native-progress-circle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPause, faForward, faUndo, faPlay, faCog } from '@fortawesome/free-solid-svg-icons';
import { noAuto } from '@fortawesome/fontawesome-svg-core';
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
import { COLOR } from '../constant/color';

export default function Home() {
    const appState = getAppState()
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [paused, setPaused] = useState(false)
    const [mode, setMode] = useState("work")

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
        <View style={styles.container}>
            <View style={styles.cogContainer}>
                <FontAwesomeIcon icon={faCog} color={COLOR.darkGrey} size={20} />
            </View>
            <View style={styles.timeContainer}>
                <ProgressCircle
                    percent={100 - (timeLeft / getTime(mode) * 100)}
                    radius={100}
                    borderWidth={25}
                    color={COLOR.blue}
                    shadowColor={COLOR.lightGrey}
                    bgColor="#fff"
                >
                    <Clock timeLeft={timeLeft} />
                    <Text style={styles.modeText}>{paused ? 'PAUSED' : mode === 'work' ? 'WORK' : 'REST'}</Text>
                </ProgressCircle>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.bottomButtonsContainer}>
                    <Button onPress={() => handleReset()}>
                        <FontAwesomeIcon icon={faUndo} size={20} color={COLOR.lightGrey} />
                    </Button>
                    <TouchableOpacity style={styles.pauseButton} onPress={() => setPaused(!paused)} activeOpacity={70}>
                        <FontAwesomeIcon icon={paused ? faPlay : faPause} size={20} color={COLOR.darkGrey} />
                    </TouchableOpacity>
                    <Button onPress={() => handleNextCycle()}>
                        <FontAwesomeIcon icon={faForward} size={20} color={COLOR.lightGrey} />
                    </Button>
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
        backgroundColor: '#E5E5E5'
    },
    cogContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        width: '100%'
    },
    timeContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
        width: 250,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginTop: 120,
    },
    buttonsContainer: {
        bottom: '10%',
        width: '100%',
        position: 'absolute'
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modeText: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular'
    },
    pauseButton: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    }
})