import playListData from "./src/constants";
import TrackPlayer, { RepeatMode, Event } from 'react-native-track-player';

export async function setupPlayer() {
    let isSetup = false;
    try {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
            isSetup = true;
        } else {
            throw new Error('No current track');
        }
    } catch (e) {
        await TrackPlayer.setupPlayer();
        isSetup = true;
    } finally {
        return isSetup;
    }
}

export async function addTrack() {
    try {
        await TrackPlayer.add(playListData);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    } catch (error) {
        console.error("Error adding track:", error);
    }
}

export async function playBackService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    });
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    });
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
    });
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    });
}