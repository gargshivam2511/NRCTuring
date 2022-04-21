import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";
import { getLogs, setLogs } from './GameScreen';

const saveFile = async () => {
    
    if (isIos) {
        var filename = "gamelog" + "_" + Date.now() + ".tsv"
        let fileUri = FileSystem.documentDirectory + filename
        await FileSystem.writeAsStringAsync(fileUri, getLogs(), { encoding: FileSystem.EncodingType.UTF8 });
        setLogs();
        const UTI = 'public.item';
        const shareResult = await Sharing.shareAsync(downloadedFile.uri, {UTI});
    }
    else {
        var albumName = "NRCTuring";
        const albumUri = FileSystem.StorageAccessFramework.getUriForDirectoryInRoot(albumName);

        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(albumUri);
        if (!permissions.granted) {
            return;
        }
        const permittedUri = permissions.directoryUri;
        if (!permittedUri.includes(albumName)) {
            console.log("Permission Not Found for NRCTuring directory at root level");
            return;
        }
        let fileUri = await FileSystem.StorageAccessFramework.createFileAsync(albumUri,
            "gamelog" + "_" + Date.now() + ".tsv", "text/plain");
        await FileSystem.StorageAccessFramework.writeAsStringAsync(fileUri, getLogs(), { encoding: FileSystem.EncodingType.UTF8 });
        setLogs();
    }
}

export default saveFile