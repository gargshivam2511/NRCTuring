import React, { useState  } from 'react';
import { Button, View,Text,  Pressable  } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system';
function validateJSON(body) {
  try {
    var data = JSON.parse(body);   
    return data;
  } catch(e) {    
    return null;
  }
}
export const DocPicker = () => {
    const [ doc, setDoc ] = useState({});
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
            if (response.type == 'success') {          
              let { name, size, uri } = response;
              let nameParts = name.split('.');
              let fileType = nameParts[nameParts.length - 1];
              var fileToUpload = {
                name: name,
                size: size,
                uri: uri,
                type: "application/" + fileType
              };
              setDoc(fileToUpload)           
                FileSystem.readAsStringAsync(fileToUpload.uri)
                .then((fileResult) => {
                  console.log(fileResult, '...............fileResult')
                  console.log(fileToUpload.name, 'sdfsdfsd fileToUpload.name')
                  var data = validateJSON(fileResult);
                  if (data) {
                    AsyncStorage.setItem('FILE_NAME',fileToUpload.name);
                    AsyncStorage.setItem('FILE_CONTENT',fileResult);     
                    
                  } else {
                    alert("File is not a valid JSON File"); 
                  }
                  
                })
				.catch((error) => {
          console.log('There has been a problem with your fetch operation: ' + error.message);
				});
            } 
          });
        // console.log(result);
       
    }
    return (        
      <View>
         <Text style={styles.uploadtext}>Select and Upload File</Text>
         <Pressable
          style={styles.button2}
          onPress={pickDocument}
        >
        
         <View style={{flexDirection:'row'}}>
            <Fontisto name="upload" size={20} color="#00008b" />
              <Text style={{color:'#00008b',marginLeft:5}}>Upload</Text>
            </View>
        </Pressable> 
            
      </View>
  )
    
  };
  