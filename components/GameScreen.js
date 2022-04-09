import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";

import suspect1 from "../assets/Suspect1.png";
import suspect2 from "../assets/Suspect2.png";
import suspect3 from "../assets/Suspect3.png";
import human from "../assets/Human.png";
import neuro from "../assets/Neuro.png";
import staty from "../assets/Staty.png";
import styles from "./styles";
import getData from "./Utils.js"

let humanPoint = 0;
let robotPoint = 0;
let logs = [];

export default function GameScreen({ route, navigation }) {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      original:
        "La Maison Blanche fait pression pour que des inspecteurs nucléaires soient envoyés dès que possible pour surveiller la fermeture par la Corée du Nord de ses réacteurs nucléaires",
      englishReference:
        "White House Pushes for Nuclear Inspectors to Be Sent as Soon as Possible to Monitor North Korea's Closure of Its Nuclear Reactors",
      humanTranslation:
        "White House Urges Hastily Sending Nuclear Inspectors to Supervise North Korea's Nuclear Reactor Shutdown",
      humanScore: 0.91271,
      neuralTranslation:
        "White House is pushing for nuclear inspectors to be sent as soon as possible to monitor North Korea's closure of its nuclear reactors.",
      nerualScore: 0.957052,
      statisticalTranslation:
        "The White House pushed to nuclear inspectors be sent as soon as possible to oversee the closure of North Korea's nuclear reactors.",
      statisticalScore: 0.935441,
    },
    {
      id: 2,
      original:
        "Les experts estiment que le plutonium élémentaire que Pyongyang a produit au cours des 20 dernières années est suffisant pour créer douze armes nucléaires.",
      englishReference:
        "Experts believe that the elemental plutonium that Pyongyang has produced over the last 20 years is sufficient to create twelve nuclear weapons.",
      humanTranslation:
        "Experts believe that the plutonium produced by Pyongyang in the last 20 years is enough to manufacture 12 nuclear weapons.",
      humanScore: 0.968453,
      neuralTranslation:
        "Experts believe that the basic plutonium produced by Pyongyang over the past 20 years is sufficient to create 12 nuclear weapons.",
      nerualScore: 0.980668,
      statisticalTranslation:
        "Experts estimate that plutonium basic Pyongyang has produced over the last 20 years is enough to create 12 nuclear weapons.",
      statisticalScore: 0.968812,
    },
  ]);
  const [key, setKey] = useState(6);
  const [image1, setImage1] = useState(suspect1);
  const [image2, setImage2] = useState(suspect2);
  const [image3, setImage3] = useState(suspect3);
  const [showScore, setShowScore] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const initialState = [false, false, false];
  const [pressOption, setPressOption] = useState(initialState);
  const [lockOption, setLockOption] = useState(false);
  const { image } = route.params;
  const [humanScore, setHumanScore] = useState(0);
  const [robotScore, setRobotScore] = useState(0);
  
  useEffect(() => {
    //console.log("In useEffect");
  }, [currentQuestion]);

  const onSubmitNextPress = () => {
    if (currentQuestion >= questions.length) {
      navigation.navigate("Result", {
        key: "turing Question 1",
        key2: "Value",
      });
    }
    if (buttonText == "Submit") {
      if (pressOption[0] || pressOption[1] || pressOption[2]) {
        setImage1(human);
        setImage2(neuro);
        setImage3(staty);
        setShowScore(true);
		
        for (let i = 0; i < 3; i++) {
          if (pressOption[i] && questions[currentQuestion].key_human === i) {
            setHumanScore(humanScore + 1);
            humanPoint = humanScore;
          }
        }

        if (questions[currentQuestion].score_human >= questions[currentQuestion].score_neural
          && questions[currentQuestion].score_human >= questions[currentQuestion].score_stat) {
          setRobotScore(robotScore + 1);
          robotPoint = robotScore;
        }
        logs.push(questions[currentQuestion].id + ", " 
        + questions[currentQuestion].orig_fr + ", " + questions[currentQuestion].key_human);

        setButtonText("Next");
        setLockOption(true);
      } else {
        if (currentQuestion < questions.length) {
          alert("Please make a choice");
        }
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setLockOption(false);
      setImage1(suspect1);
      setImage2(suspect2);
      setImage3(suspect3);
      setShowScore(false);
      setButtonText("Submit");
      setPressOption(initialState);
    }
  };

  const pressOneOption = (index) => {
    if (lockOption) return;
    let newPressOption = [];
    for (let i = 0; i < 3; i++) {
      if (i === index) {
        newPressOption.push(true);
      } else {
        newPressOption.push(false);
      }
    }
    setPressOption(newPressOption);
  };

  const showOneQuestion = () => {
    const question = questions[currentQuestion];
    return (
      <SafeAreaView style={styles.questionContainer}>
        <Image source={image} style={{width:40,height:40,borderRadius:50}} />
        {question ? (
          <>
            <Text style={styles.question}>Question {question.id}</Text>
            <View style={styles.innerContainer}>
              <Text style={styles.question}>Sentence: {question.original}</Text>
            </View>

            <View style={styles.innerContainer}>
              <Image source={image1} style={styles.image} />
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    borderColor: pressOption[0] ? "red" : "coral",
                  },
                ]}
                onPress={() => pressOneOption(0)}
              >
                <Text>{question.humanTranslation}</Text>
              </TouchableOpacity>
              {showScore && (
                <Text style={styles.score}>Score: {question.humanScore}</Text>
              )}
            </View>

            <View style={styles.innerContainer}>
              <Image source={image2} style={styles.image} />
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    borderColor: pressOption[1] ? "red" : "coral",
                  },
                ]}
                onPress={() => pressOneOption(1)}
              >
                <Text>{question.neuralTranslation}</Text>
              </TouchableOpacity>
              {showScore && (
                <Text style={styles.score}>Score: {question.nerualScore}</Text>
              )}
            </View>

            <View style={styles.innerContainer}>
              <Image source={image3} style={styles.image} />
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    borderColor: pressOption[2] ? "red" : "coral",
                  },
                ]}
                onPress={() => pressOneOption(2)}
              >
                <Text>{question.statisticalTranslation}</Text>
              </TouchableOpacity>
              {showScore && (
                <Text style={styles.score}>
                  Score: {question.statisticalScore}
                </Text>
              )}
            </View>
          </>
        ) : (
          <Text>See the resutls now</Text>
        )}

        <Pressable style={styles.button} onPress={onSubmitNextPress}>
          <Text style={styles.text}>{buttonText}</Text>
        </Pressable>
      </SafeAreaView>
    );
  };

  return <>{showOneQuestion()}</>;
}

const getHumanScore = () => {
  return humanPoint;
}

const getRobotScore = () => {
  return robotPoint;
}

export { getHumanScore, getRobotScore };
