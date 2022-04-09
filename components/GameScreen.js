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
let select={};

export default function GameScreen({ route, navigation }) {
  const [questions, setQuestions] = useState(getData(10));
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
  let dic={};
  let dic2={};

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
        let cor=[];
        for (let i = 0; i < 3; i++) {
          if(questions[currentQuestion].key_human === i){
            cor.push(human);
            if (pressOption[i] && questions[currentQuestion].key_human === i) {
              setHumanScore(humanScore + 1);
              humanPoint = humanScore;
              select[currentQuestion+1]=[questions[currentQuestion].id,questions[currentQuestion].trans_human];
            }
          }
          if (questions[currentQuestion].key_neural === i) {
            cor.push(neuro);
            if(pressOption[i]) select[currentQuestion+1]=[questions[currentQuestion].id,questions[currentQuestion].trans_neural];
          }
          if (questions[currentQuestion].key_stat === i) {
            cor.push(staty);
            if(pressOption[i]) select[currentQuestion+1]=[questions[currentQuestion].id,questions[currentQuestion].trans_stat];
          }
        }

        if (questions[currentQuestion].score_human >= questions[currentQuestion].score_neural
          && questions[currentQuestion].score_human >= questions[currentQuestion].score_stat) {
          setRobotScore(robotScore + 1);
          robotPoint = robotScore;
        }
        logs.push(questions[currentQuestion].id + ", " 
        + questions[currentQuestion].orig_fr + ", " + questions[currentQuestion].key_human);

        setImage1(cor[0]);
        setImage2(cor[1]);
        setImage3(cor[2]);
        setShowScore(true);
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
    if (currentQuestion<10){
      dic[questions[currentQuestion].key_human]=questions[currentQuestion].trans_human;
      dic[questions[currentQuestion].key_neural]=questions[currentQuestion].trans_neural;
      dic[questions[currentQuestion].key_stat]=questions[currentQuestion].trans_stat;
      dic2[questions[currentQuestion].key_human]=questions[currentQuestion].score_human;
      dic2[questions[currentQuestion].key_neural]=questions[currentQuestion].score_neural;
      dic2[questions[currentQuestion].key_stat]=questions[currentQuestion].score_stat;
      
    }
    
    return (
      <SafeAreaView style={styles.questionContainer}>
        <Image source={image} style={{width:40,height:40,borderRadius:50}} />
        {question ? (
          <>
            <Text style={styles.question}>Question {currentQuestion+1}</Text>
            <View style={styles.innerContainer}>
              <Text style={styles.question}>Sentence: {question.orig_fr}</Text>
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
                <Text>{dic[0]}</Text>
              </TouchableOpacity>
              {showScore && (
                <Text style={styles.score}>Score: {dic2[0]}</Text>
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
                <Text>{dic[1]}</Text>
              </TouchableOpacity>
              {showScore && (
                <Text style={styles.score}>Score: {dic2[1]}</Text>
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
                <Text>{dic[2]}</Text>
              </TouchableOpacity>
              {showScore && (
                <Text style={styles.score}>
                  Score: {dic2[2]}
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
