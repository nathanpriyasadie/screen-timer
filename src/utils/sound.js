
import Sound from 'react-native-sound';

Sound.setCategory('Playback');
export const gunSound = new Sound('gun.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
});