import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import { Colors } from "react-native/Libraries/NewAppScreen";

const GameOverScreen = (props) => {
	return (
		<View style={styles.screen}>
			<TitleText>The Game is Over</TitleText>
			<View style={styles.imageContainer}>
        <Image 
        //fadeDuration = {800} 
        // source={require("../assets/success.png")} 
        source={{ uri : "https://images.unsplash.com/photo-1545161296-d9c2c241f2ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"} } 
        style={styles.image} 
        resizeMode="cover" />
			</View>
			<View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{' '}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{' '}
          <Text style={styles.highlight}>{props.guessedNumber}</Text>.
        </BodyText>
      </View>

			<Button title="Restart Game" onPress={props.onRestart} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: 30,
	},
	image: {
		width: "100%",
		height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  }
});

export default GameOverScreen;
