import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Alert, ScrollView, Button, Dimensions } from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

import  { ScreenOrientation } from 'expo-screen-orientation';

const generateRandomNumber = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndnm = Math.floor(Math.random() * (max - min) + min);

	if (rndnm === exclude) {
		return generateRandomNumber(max, min, exclude);
	} else {
		return rndnm;
	}
};

const renderListItem = (guess, numOfRounds) => (
	<View key={guess} style={styles.listItem}>
		<BodyText>#{numOfRounds}</BodyText>
		<BodyText>{guess}</BodyText>
	</View>
);

const GameScreen = (props) => {
	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

	const initialGuess = generateRandomNumber(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;
	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = (direction) => {
		console.log(direction);

		if (
			(direction === "lower" && currentGuess < props.userChoice) ||
			(direction === "greater" && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: "Sorry", style: "cancel" }]);
			return;
		}

		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}

		const nextGuess = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextGuess);
		// setrounds(round => round + 1);
		setPastGuesses((currPastGuesses) => [nextGuess, ...currPastGuesses]);
	};

	return (
		<View style={styles.screen}>
			<BodyText>Opponent's Guess</BodyText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				{/* <View style={styles.buttonContainer}>
                    <View style={styles.btn}>

                        <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')}></Button>
                    </View>
                    <View style={styles.btn}>
                        <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')}></Button>
                    </View>
                </View> */}
				<MainButton onPress={nextGuessHandler.bind(this, "lower")}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, "greater")}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
		width: 400,
		maxWidth: "90%"
	},
	listContainer: {
		flex: 1,
		width: Dimensions.get('window').width > 500 ? "80%" : "60%"
	},
	list: {
		flexGrow: 1,
		alignItems: "center",
        justifyContent: "flex-end",
        fontSize: 24
	},
	listItem: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
        width: "100%"
	},
});

export default GameScreen;
