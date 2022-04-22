import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";
import { getLogs, setLogs } from "./GameScreen";

const saveFile = async () => {
  if (Platform.OS === "ios") {
    //const {status} = FileSystem.;
    var filename = "gamelog" + "_" + Date.now() + ".tsv";
    let fileUri = FileSystem.documentDirectory + filename;
    await FileSystem.writeAsStringAsync(fileUri, getLogs(), {
      encoding: FileSystem.EncodingType.UTF8,
    });
    setLogs();
    const UTI = "public.item";
    const shareResult = await Sharing.shareAsync(fileUri, { UTI });
  } else {
    var albumURI = await AsyncStorage.getItem("downloadURI");

    if (albumURI == null) {
      alert("Error saving the data");
      return;
    } else {
      //alert("got the permissions");
    }

    let fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
      albumURI,
      "gamelog" + "_" + Date.now() + ".tsv",
      "text/plain"
    );
    await FileSystem.StorageAccessFramework.writeAsStringAsync(
      fileUri,
      //  "Shivam",
      getLogs(),
      { encoding: FileSystem.EncodingType.UTF8 }
    );
    setLogs();
  }
};

export default saveFile;
