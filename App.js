import React,{useEffect,useState} from 'react';
import {  ActivityIndicator,Platform,ImageBackground, StyleSheet, Text, View,StatusBar } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [loaded,hasloaded]=useState(true)
  const [location,setLocation]=useState({coords:{latitude:0,longitude:0}})
  const [day, u_day]=useState(0)
  const [c_temp,u_temp]=useState(null)
  const [c_humidity,u_humidity]=useState(null)
  const [c_wind,u_wind]=useState(null)
  const [cloud_cover,u_cover]=useState(null)
  
  async function locationCheck(){
    let sta=await Location.requestForegroundPermissionsAsync()
    if (sta.status!=="granted"){
      console.log("please grant location permission")
    }
    setHasPermission(true)  
  }
   
  //////////////////////////////////
   async function getApiData(lat,long){
    const w_url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m&current=is_day&current=relative_humidity_2m&current=wind_speed_10m&current=cloud_cover`
    const api_start=await fetch(w_url)
    // console.log( await api_start.json())
    const data= await api_start.json()
    u_day(data.current.is_day)
    u_temp(data.current.temperature_2m)
    u_wind(data.current.wind_speed_10m)
    u_cover(data.current.cloud_cover)
    u_humidity(data.current.relative_humidity_2m)
    console.log(data.current) 
  }
  ///////////////////////

  
    /////////////////////////////////////
  useEffect(()=>{
    locationCheck()

    async function  getLocation(){
      const current_loc= await Location.getCurrentPositionAsync({})
      setLocation(await current_loc)
      try{
        text = await location;
        // console.log(text)
        if (!text){

          console.log("nothing is there to show")
        }
        // console.log(text.coords.latitude)
        getApiData(text.coords.latitude,text.coords.longitude)
      }
      catch(error){
        console.log(error)
      }
    }  
    getLocation()
    

  
  hasloaded(false)
   
  },[hasPermission])
  return (
    

    
    <ImageBackground
      source={day==1 ?require('./assets/day.jpg'):require('./assets/night.jpg')}
      resizeMode="cover" style={styles.back_image} > 
      
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
      <Text style={styles.c_st}>{day==1?"It's Sunny":"It's dark"}</Text>
    </View>
   </View>
   <View style={styles.extra_d_container}>
   <Text style={styles.extra_info}>
   {c_humidity}% {"\n"}Humidity
   
   </Text>
   <Text style={styles.extra_info}>
   {c_wind}%{"\n"}Wind Speed
   
   </Text>
   <Text style={styles.extra_info}>
   {cloud_cover}% {"\n"} Cloud Cover
   
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
    padding:40,
    flex:1,
    
  },
  country_name: {
    color:'#ffffff',
    fontSize:30,
  },
  current_temp:{
    color:'#ffffff',
    fontSize:80,
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
    marginBottom:66, 
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
    padding:8,

  },


});
