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
import { faPause, faForward, faUndo, faPlay, faBell, faBellSlash, faVolumeUp, faVolumeMute, faVolumeDown, faMusic } from '@fortawesome/free-solid-svg-icons';
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
import { Navigation } from 'react-native-navigation';
import { useOrientation } from '../hooks/useOrientation';

export default function HomeScreen() {
    const appState = getAppState()
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [paused, setPaused] = useState(false)
    const [volume, setVolume] = useState("mid")
    const [mode, setMode] = useState("work")
    const orientation = useOrientation()

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

    function handleVolumePress() {
        setVolume(volume === 'mid' ? 'high' : volume === 'high' ? 'mute' : 'mid')
    }

    return (
        <View style={orientation === 'LANDSCAPE' ? styles.containerLandscape : styles.containerPortrait}>
            <View style={orientation === 'LANDSCAPE' ? styles.settingContainerLandscape : styles.settingContainerPortrait}>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faBell} color={COLOR.lightGrey} size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleVolumePress()}>
                    <FontAwesomeIcon icon={volume === 'mid' ? faVolumeDown : volume === 'high' ? faVolumeUp : faVolumeMute} color={COLOR.lightGrey} size={20} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faMusic} color={COLOR.lightGrey} size={20} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.timeContainer}>
                    <ProgressCircle
                        percent={100 - (timeLeft / getTime(mode) * 100)}
                        radius={100}
                        borderWidth={25}
                        color={mode === 'work' ? COLOR.blue : COLOR.red}
                        shadowColor={COLOR.lightestGrey}
                        bgColor="#fff"
                    >
                        <Clock timeLeft={timeLeft} />
                        <Text style={styles.modeText}>{paused ? 'PAUSED' : mode === 'work' ? 'WORK' : 'REST'}</Text>
                        <Text>{orientation}</Text>
                    </ProgressCircle>
                </View>
            </View>
            <View style={orientation === 'LANDSCAPE' ? styles.buttonsContainerLandscape : styles.buttonsContainerPortrait}>
                <View style={orientation === 'LANDSCAPE' ? styles.bottomButtonsContainerLandscape : styles.bottomButtonsContainerPortrait}>
                    <TouchableOpacity onPress={() => handleReset()}>
                        <FontAwesomeIcon icon={faUndo} size={20} color={COLOR.lightGrey} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pauseButton} onPress={() => setPaused(!paused)} activeOpacity={70}>
                        <FontAwesomeIcon icon={paused ? faPlay : faPause} size={20} color={COLOR.darkGrey} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleNextCycle()}>
                        <FontAwesomeIcon icon={faForward} size={20} color={COLOR.lightGrey} />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    containerLandscape: {
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row',
        backgroundColor: '#E5E5E5'
    },
    containerPortrait: {
        alignItems: 'center',
        height: '100%',
        padding: '10%',
        backgroundColor: '#E5E5E5'
    },
    settingContainerLandscape: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
    },
    settingContainerPortrait: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
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
    },
    buttonsContainerPortrait: {
        width: '100%',
    },
    buttonsContainerLandscape: {
        flex: 1
    },
    bottomButtonsContainerLandscape: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%',
    },
    bottomButtonsContainerPortrait: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
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