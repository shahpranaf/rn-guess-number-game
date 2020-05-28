import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

import MainButton from '../components/MainButton';

const StartGameScreen = (props) => {
	const [enteredValue, setEnteredValue] = useState();
	const [confirmed, setconfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [btnWidth, setBtnWidth] = useState(Dimensions.get('window').width / 4);

    useEffect( () => {
        const updateDimension = () => {
            setBtnWidth(Dimensions.get('window').width / 4);
        }
        Dimensions.addEventListener('change', updateDimension);

            return () => {
                Dimensions.removeEventListener('change', updateDimension);
            }
        }
    )

	const inputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const resetInputHandler = () => {
		setEnteredValue("");
		setconfirmed(false);
	};

	const confirmInutHandler = () => {
		const chosenNumber = parseInt(enteredValue);

		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert("Invalid number!", "Number has to be between 1 and 99", [
				{ text: "Okay", style: "destructive", onPress: resetInputHandler },
			]);
			return;
		}

		setconfirmed(true);
		setEnteredValue("");
		setSelectedNumber(chosenNumber);
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<BodyText>You selected</BodyText>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
			</Card>
		);
	}

	return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a new game.</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a number</BodyText>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                maxLength={2}
                                onChangeText={inputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={styles.btn}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}></Button>
                                </View>
                                <View style={styles.btn}>
                                    <Button title="Confirm" onPress={confirmInutHandler} color={Colors.primary}></Button>
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	title: {
        fontFamily: 'open-sans-bold',
		fontSize: 20,
		marginVertical: 10,
		textAlign: "center",
	},
	inputContainer: {
	    width: "80%",
		minWidth: 300,
        alignItems: "center",
        marginVertical: 20
	},
	input: {
		width: 50,
		textAlign: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingHorizontal: 15,
        width: "100%",
	},
	// btn: {
    //     // width: "40%",
    //     width: Dimensions.get('window').width / 5
    // },
    summaryContainer: {
        alignItems: 'center'
    }
});

export default StartGameScreen;
