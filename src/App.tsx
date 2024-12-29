import React ,{ useEffect,useState} from 'react';

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {setupPlayer,addTrack} from '../musicPlayerServices'


function App(): React.JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    let isSetup=await setupPlayer();
    if(isSetup){
      await addTrack()
    }
    setIsPlayerReady(isSetup);
  }

  useEffect(()=>{
    setup()
  })
  
  if(!isPlayerReady){
    return(
      <SafeAreaView>
        <ActivityIndicator/>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView>
      <StatusBar/>
      <Text>Spotify </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container:{
  flex:1
 }
});

export default App;
