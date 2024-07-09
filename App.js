import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {  ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
<ImageBackground
      source={require('./assets/night.jpg')}

      resizeMode="cover" style={styles.back_image}> 
    
   <View style={styles.container}>

    <View > 
      <Text style={styles.country_name}> India </Text>
    </View>
    <View >
      <Text style={styles.current_temp}>25°</Text>
    </View>
    <View >
      <Text style={styles.c_st}>It's Sunny</Text>
    </View>
   </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  back_image:{
    flex:1,
  },
  container:{
   padding:50,
   
  },
  country_name: {
   color:'#ffffff',
   fontSize:30,
  },
  current_temp:{
   color:'#ffffff',
    fontSize:95,
  },
  c_st:{
   color:'#ffffff',
   fontWeight:'bold',
   padding:40,
   marginRight:-250,
   fontSize:30,
   transform: [{rotate:'90deg'}]
  },
});
