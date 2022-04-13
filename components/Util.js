import * as FileSystem from 'expo-file-system';
import { getLogs, setLogs } from './GameScreen';

const saveFile = async () => {
    // Requests permissions
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
        return;
    }
    const permittedUri = permissions.directoryUri;

    let fileUri = await FileSystem.StorageAccessFramework.createFileAsync(permittedUri, 
        "gamelog" + "_" + Date.now(), "text/plain");
    await FileSystem.StorageAccessFramework.writeAsStringAsync(fileUri, getLogs(), { encoding: FileSystem.EncodingType.UTF8 });
    setLogs();
}

export default saveFile