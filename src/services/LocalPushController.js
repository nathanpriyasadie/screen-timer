import PushNotification from 'react-native-push-notification'

PushNotification.createChannel(
    {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.configure({
    onNotification: function (notification) {
        console.log('LOCAL NOTIFICATION ==>', notification)
    },

    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios'
})

export const LocalNotification = () => {
    PushNotification.localNotification({
        channelId: 'channel-id',
        autoCancel: true,
        // bigText:
        //     'This is local notification demo in React Native app. Only shown, when expanded.',
        subText: 'Local Notification Demo',
        title: 'Local Notification Title',
        message: 'Times up',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
    })
}

export const ScheduledLocalNotification = () => {
    PushNotification.localNotificationSchedule({
        autoCancel: true,
        bigText:
            'This is local notification demo in React Native app. Only shown, when expanded.',
        subText: 'Local Notification Demo',
        title: 'Scheduled Notification Title',
        message: 'Scheduled Notification Message',
        vibrate: true,
        vibration: 500,
        playSound: true,
        soundName: 'default',
        actions: '["Yes", "No"]',
        date: new Date(Date.now() + 3 * 1000) // in 3 secs
    })
}