/**
 * @format
 */

// import { AppRegistry } from 'react-native';
import { Navigation } from "react-native-navigation";
import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.setDefaultOptions({
    topBar: {
        visible: false
    }
})
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'com.myApp.WelcomeScreen'
                        }
                    }
                ]
            }
        }
    });
});

