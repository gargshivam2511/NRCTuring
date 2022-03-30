import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    width: 150,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  avatarcontainer: {
    flex: 1,
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 45,
    //fontWeight: 'bold'
  },
  avatarmainheading: {
    fontSize: 45,
    fontWeight: "bold",
  },
  avatarImageClass1: {
    width: 100,
    height: 100,
    justifyContent: "flex-start",
    padding: 12,
    margin: 20,
    borderRadius: 50,
  },
  avatarImageClass: {
    width: 100,
    height: 100,
    justifyContent: "center",
    padding: 12,
    margin: 20,
    borderRadius: 50,
  },
  avatarImageClass2: {
    width: 100,
    height: 100,
    justifyContent: "flex-end",
    padding: 12,
    margin: 20,
    borderRadius: 50,
  },
  avatarbutton: {
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
