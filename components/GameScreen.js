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
import getData from "./Util.js";

let humanPoint = 0;
let robotPoint = 0;
let logs = [];
let userSelect = {};

export default function GameScreen({ route, navigation }) {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [scores, setScores] = useState([]);
  const [images, setImages] = useState([suspect1, suspect2, suspect3]);
  const [imgOrder, setImgOrder] = useState([]);
  const [key, setKey] = useState(6);
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
    setQuestions(getData(10));
  }, []);

  const updateOptions = () => {
    const currQ = questions[currentQuestion];

    let tempOps = [];
    let tempScores = [];
    let tempImgs = [];
    for (let i = 0; i < 3; i++) {
      if (currQ.key_human === i) {
        tempOps.push(currQ.trans_human);
        tempScores.push(currQ.score_human);
        tempImgs.push(human);
      }
      if (currQ.key_neural === i) {
        tempOps.push(currQ.trans_neural);
        tempScores.push(currQ.score_neural);
        tempImgs.push(neuro);
      }
      if (currQ.key_stat === i) {
        tempOps.push(currQ.trans_stat);
        tempScores.push(currQ.score_stat);
        tempImgs.push(staty);
      }
      setImages(tempImgs);
      setOptions(tempOps);
      setScores(tempScores);
    }
  };

  useEffect(() => {
    if (currentQuestion < questions.length) {
      updateOptions();
    }
  }, [questions, currentQuestion]);

  const onSubmitNextPress = () => {
    if (currentQuestion >= questions.length) {
      navigation.navigate("Result", {
        key: "turing Question 1",
        key2: "Value",
      });
    }

    if (buttonText == "Submit") {
      if (pressOption[0] || pressOption[1] || pressOption[2]) {
        setShowScore(true);

        for (let i = 0; i < 3; i++) {
          if (pressOption[i] && questions[currentQuestion].key_human === i) {
            setHumanScore(humanScore + 1);
            humanPoint = humanScore;
            userSelect[currentQuestion + 1] = [
              questions[currentQuestion].id,
              questions[currentQuestion].trans_human,
            ];
          }
          if (pressOption[i] && questions[currentQuestion].key_neural === i) {
            userSelect[currentQuestion + 1] = [
              questions[currentQuestion].id,
              questions[currentQuestion].trans_neural,
            ];
          }
          if (pressOption[i] && questions[currentQuestion].key_stat === i) {
            userSelect[currentQuestion + 1] = [
              questions[currentQuestion].id,
              questions[currentQuestion].trans_stat,
            ];
          }
        }

        if (
          questions[currentQuestion].score_human >=
            questions[currentQuestion].score_neural &&
          questions[currentQuestion].score_human >=
            questions[currentQuestion].score_stat
        ) {
          setRobotScore(robotScore + 1);
          robotPoint = robotScore;
        }
        logs.push(
          questions[currentQuestion].id +
            ", " +
            questions[currentQuestion].orig_fr +
            ", " +
            questions[currentQuestion].key_human
        );
        alert(
          "You " +
            humanScore.toString() +
            "  :  " +
            "YISI " +
            robotScore.toString()
        );

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
      setImages(initialState);
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
        <Image
          source={image}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
        {question ? (
          <>
            <Text style={styles.question}>Question {currentQuestion + 1}</Text>
            <View style={styles.innerContainer}>
              <Text style={styles.question}>French: {question.orig_fr}</Text>
              <Text style={styles.question}>English: {question.gold_en}</Text>
            </View>

            <View style={styles.innerContainer}>
              <Image
                source={showScore ? images[0] : suspect1}
                style={styles.image}
              />
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    borderColor: pressOption[0] ? "red" : "coral",
                  },
                ]}
                onPress={() => pressOneOption(0)}
              >
                <Text>{options[0]}</Text>
              </TouchableOpacity>
              {showScore && (
                <Text style={styles.score}>Score: {scores[0]}</Text>
              )}
            </View>

            <View style={styles.innerContainer}>
              <Image
                source={showScore ? images[1] : suspect2}
                style={styles.image}
              />
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    borderColor: pressOption[1] ? "red" : "coral",
                  },
                ]}
                onPress={() => pressOneOption(1)}
              >
                <Text>{options[1]}</Text>
              </TouchableOpacity>
              {showScore && (
                <Text style={styles.score}>Score: {scores[1]}</Text>
              )}
            </View>

            <View style={styles.innerContainer}>
              <Image
                source={showScore ? images[2] : suspect3}
                style={styles.image}
              />
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    borderColor: pressOption[2] ? "red" : "coral",
                  },
                ]}
                onPress={() => pressOneOption(2)}
              >
                <Text>{options[2]}</Text>
              </TouchableOpacity>
              {showScore && (
                <Text style={styles.score}>Score: {scores[2]}</Text>
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
};

const getRobotScore = () => {
  return robotPoint;
};

const getUserSelect = () => {
  return userSelect;
};

export { getHumanScore, getRobotScore, getUserSelect };
