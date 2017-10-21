/**
 * Created by david2099 on 19/10/17.
 */
import { AsyncStorage, StyleSheet } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { white, purple } from './colors'

const FLASHCARD_NOTIFICATION_KEY = 'MobileFlashCards:notifications'

export function clearLocalNotification () {
    return AsyncStorage.removeItem(FLASHCARD_NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
        title: 'Study reminder!',
        body: "👋 don't forget to study today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(FLASHCARD_NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(10)
                            tomorrow.setMinutes(15)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(FLASHCARD_NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}
