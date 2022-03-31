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

export default function GameScreen({ route, navigation }) {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      original:
        "La Maison Blanche fait pression pour que des inspecteurs nucl茅aires soient envoy茅s d猫s que possible pour surveiller la fermeture par la Cor茅e du Nord de ses r茅acteurs nucl茅aires",
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
        "Les experts estiment que le plutonium 茅l茅mentaire que Pyongyang a produit au cours des 20 derni猫res ann茅es est suffisant pour cr茅er douze armes nucl茅aires.",
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

  const initialState = [false, false, false];
  const [pressOption, setPressOption] = useState(initialState);

  useEffect(() => {
    console.log("In useEffect");
  }, []);

  const onPress = () => {
    if (pressOption[0] || pressOption[1] || pressOption[2]) {
      setImage1(human);
      setImage2(neuro);
      setImage3(staty);
      setShowScore(true);
      setButtonText("Next");
    } else {
      alert("Please make a choice");
    }
  };

  const pressOneOption = (index) => {
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
    const question = questions[0];
    return (
      <SafeAreaView style={styles.container}>
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
            <Text style={styles.score}>Score: {question.statisticalScore}</Text>
          )}
        </View>

        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.text}>{buttonText}</Text>
        </Pressable>
      </SafeAreaView>
    );
  };

  return <>{showOneQuestion()}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "space-around",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
  question: {
    fontSize: 14,
    margin: 10,
  },
  image: {
    width: "12%",
    height: undefined,
    aspectRatio: 210 / 291,
    marginRight: 5,
  },
  option: {
    width: "85%",
    flexShrink: 1,
    borderWidth: 5,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#EDECEC",
    padding: 15,
  },
  button: {
    height: 50,
    width: "20%",
    backgroundColor: "#3700B3",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: 10,
    borderRadius: 15,
  },
  score: {
    marginTop: 10,
    backgroundColor: "grey",
    padding: 5,
    alignContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    overflow: "hidden",
  },
  text: {
    color: "white",
  },
});
