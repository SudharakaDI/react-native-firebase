// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View,Button } from 'react-native';
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc,setDoc,doc } from "firebase/firestore";
// import { db } from './src/firebase/config';

// export default function App() {

// const sendDataToFirebase= async () =>{

//   await setDoc(doc(db,"users","user_id"),{
//     employment:"plumberssss",
//     outfitColor:"redddd",
//     specialAttack:"fireball"
//   },{merge:true});

// }

// const addDataToFirebase= async () =>{
//   // const db = getFirestore(app);

//   await addDoc(collection(db,"users"),{
//     employment:"plumberssss",
//     outfitColor:"redddd",
//     specialAttack:"fireballs"
//   });

// }

// console.log("Document written with ID: ", addDataToFirebase.id);




//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <Button title='send data' onPress = {sendDataToFirebase}/>
//       <Button title='add data' onPress = {addDataToFirebase}/>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, HomeeScreen, SummaryScreen} from './src/screens'
import {decode, encode} from 'base-64'
// import SummaryScreen from './src/screens/SummaryScreen/SummaryScreen';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* { user ? (
          <Stack.Screen name="Home" component={HomeScreen}>
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            
            
          </>
        )} */}
            <Stack.Screen name="Summary" component={SummaryScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          	<Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}