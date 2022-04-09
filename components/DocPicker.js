import React, { useState  } from 'react';
import { Button, View,Text,  Pressable  } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system';

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
              console.log(fileToUpload.name, 'sdfsdfsd fileToUpload.name')
                FileSystem.readAsStringAsync(fileToUpload.uri)
                .then((fileResult) => {
                  console.log(fileResult, '...............fileResult')
                  console.log(fileToUpload.name, 'sdfsdfsd fileToUpload.name')
                  AsyncStorage.setItem('FILE_NAME',fileToUpload.name);
                  AsyncStorage.setItem('FILE_CONTENT',fileResult);      
                })
				.catch((error) => {
					//Do nothing
					//This seems to happen when you cancel out of file select
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
  