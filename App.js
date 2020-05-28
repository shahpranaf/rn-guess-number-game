import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';


import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { AppLoading } from 'expo';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}


export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} 
      onFinish={() => setDataLoaded(true)} 
      onError={ (err) => console.error(err) } />
  }

  const configureNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>;
  // content = (
  //   <GameOverScreen roundsNumber={1} guessedNumber={1} onRestart={configureNewGame} />
  // );
  

  if(userNumber && guessRounds <=0 ) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  }

  if(guessRounds > 0 ) {
    content = <GameOverScreen roundsNumber={guessRounds} guessedNumber={userNumber} onRestart={configureNewGame} />;
  }


  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a number"/>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});