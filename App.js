import React,{useEffect,useState} from 'react';
import {  Platform,ImageBackground, StyleSheet, Text, View,StatusBar } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location,setLocation]=useState(null)
  const [day, u_day]=useState(null)
  const [c_temp,u_temp]=useState(null)
  async function locationCheck(){
    let sta=await Location.requestForegroundPermissionsAsync()  
    if (sta.status!=="granted"){
    console.log("please grant location permission")
    }}
   
  //////////////////////////////////
   async function getApiData(lat,long){
    const w_url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m&current=is_day`
    const api_start=await fetch(w_url)
    console.log(api_start)
    // const data=api_start.json()
    
  }
  useEffect(()=>{
    locationCheck()
     async()=>{
      const current_loc= await Location.getCurrentPositionAsync
      setLocation(current_loc)
      console.log(setLocation)
    let [extraced_loc,extracted_long]=[location.coords.latitude,location.coords.longitude]
    console.log(extraced_loc,extracted_long)
    getApiData(extraced_loc,extracted_long)
  }

   
    // getApiData()
  },[])
  return (
    <ImageBackground
    source={require('./assets/day.jpg')}
    
    resizeMode="cover" style={styles.back_image}> 
    
   <View style={styles.container}>
    <StatusBar 
    backgroundColor={"blue"}
    barStyle={"light-content"}
    hidden={false}
    />  

    <View > 
      <Text style={styles.country_name}> India </Text>
    </View>
    <View >
      <Text style={styles.current_temp}>{c_temp}°</Text>
    </View>
    <View >
      <Text style={styles.c_st}>{day?"It's Sunny":"It's dark"}</Text>
    </View>
   </View>
   <View style={styles.extra_d_container}>
    <Text style={styles.extra_info}>
      78% {"\n"}Humidity

    </Text>
    <Text style={styles.extra_info}>
      22km{"\n"}Visibility

    </Text>
    <Text style={styles.extra_info}>
      78% {"\n"}Ui/index

    </Text>
    
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
   flex:1,
   
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
  extra_d_container:{ 
    marginBottom:84, 
    borderWidth:4,
    borderColor: '#ffffff',
    borderRadius:10,
    flexDirection:"row",
   justifyContent:'space-evenly',
   alignItems:'center',
  },
  extra_info:{
   color:'#ffffff',
   fontWeight:"bold", 
    fontSize:16,
    padding:5,

  },


});
