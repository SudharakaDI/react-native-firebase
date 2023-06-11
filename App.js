import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc,setDoc,doc } from "firebase/firestore";
import { db } from './src/firebase/config';

export default function App() {

//   const firebaseConfig = {
//     apiKey: "AIzaSyCT8fK2cDZNglr9qj_RLw6Y6uOlE5NQdX8",
//     authDomain: "react-native-app-2dee1.firebaseapp.com",
//     projectId: "react-native-app-2dee1",
//     storageBucket: "react-native-app-2dee1.appspot.com",
//     messagingSenderId: "551729486224",
//     appId: "1:551729486224:web:491d26cf4266efda183b15",
//     measurementId: "G-G1N9T5F7MZ"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const sendDataToFirebase= async () =>{
  // const db = getFirestore(app);

  await setDoc(doc(db,"users","user_id"),{
    employment:"plumberssss",
    outfitColor:"redddd",
    specialAttack:"fireball"
  },{merge:true});

}

const addDataToFirebase= async () =>{
  // const db = getFirestore(app);

  await addDoc(collection(db,"users"),{
    employment:"plumberssss",
    outfitColor:"redddd",
    specialAttack:"fireballs"
  });

}

console.log("Document written with ID: ", addDataToFirebase.id);




  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='send data' onPress = {sendDataToFirebase}/>
      <Button title='add data' onPress = {addDataToFirebase}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
