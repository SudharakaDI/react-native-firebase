import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import app from '../../firebase/config'
import { getFirestore, doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { async } from '@firebase/util';




export default function HomeScreen({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [mushroomType, setMushroomType] = useState('')
    const [numberOfPackets, setNumberOfMushroomPackets] = useState('')
    const [returnedPackets, setReturnedPackets] = useState('')
    const [selectedMushroomType, setSelectedMushroomType] = useState("");

    const db = getFirestore(app)
    const mushroomTypes = [
        { key: '1', value: 'Abaloni'},
        { key: '2', value: 'Sudu Bimmal'},
    ]



    const onAddPress = async () => {
        var str_date = date.toLocaleDateString()
        
        if(numberOfPackets==""){
            alert("Number of packets field is empty")
        }
        else if(returnedPackets==""){
            alert("Returned packet field is empty")
        }

        else{

            docData = {
                "date": str_date,
                "mushroomType": selectedMushroomType,
                "dailyPacketsSold": numberOfPackets,
                "dailyPacketsReturned": returnedPackets
            }
    
            try {
                // await setDoc(doc(db, "mushroom_sales", str_date), docData);
                const res = await addDoc(collection(db, 'mushroom_sales'), docData);
                  
                console.log('Added document with ID: ', res.id);
                alert("Successfully added");
            }
            catch (error) {
                alert("Could not add todays details");
                console.log(error);
            }

        }

        // const querySnapshot = await getDocs(collection(db, "mushroom_sales"));

        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        //   });



        


    }

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate;
    //     setShow(false);
    //     setDate(currentDate);
    //   };

    //   const showMode = (currentMode) => {
    //     setShow(true);
    //     setMode(currentMode);
    //   };

    //   const showDatepicker = () => {
    //     showMode('date');
    //   };

    //   const showTimepicker = () => {
    //     showMode('time');
    //   };


    // const auth = getAuth(app);
    // const onFooterLinkPress = () => {
    //     navigation.navigate('Login')
    // }

    // const onRegisterPress = async () => {
    //     if (password !== confirmPassword) {
    //         alert("Passwords don't match.")
    //         return
    //     }
    //     console.log("Creating account")
    //     await createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed in 
    //             const userId = userCredential.user.uid;
    //             const data = {
    //                 id: userId,
    //                 email,
    //                 fullName,
    //             }

    //             const usersRef = collection('users')
    //             usersRef.doc(userId).set(data).then(
    //                 () => {
    //                     navigation.navigate('Home', { user: data })
    //                 }
    //             ).catch((error) => {
    //                 alert(error)
    //             });


    //             console.log(user.email);
    //             alert("Succuessfully Created account");


    //             // ...
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log(errorMessage);
    //             alert(errorMessage);
    //             // ..
    //         });

    // }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

                {/* <Button onPress={showDatepicker} title="Show date picker!" />
                    <Button onPress={showTimepicker} title="Show time picker!" />
                    <Text>selected: {date.toLocaleString()}</Text>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        />
                    )} */}

                <TextInput
                    style={styles.input}
                    placeholder='Date'
                    placeholderTextColor="#aaaaaa"
                    editable={false}
                    onChangeText={(text) => setDate(text)}
                    value={date.toLocaleDateString()}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/* <TextInput
                    style={styles.input}
                    placeholder='Mushroom Type'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setMushroomType(text)}
                    value={mushroomType}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                /> */}
                <SelectList
                    boxStyles={styles.input}
                    dropdownStyles = {styles.selectionDropdown}
                    defaultOption={{ key: '1', value: 'Abaloni'}}
                    setSelected={(val) => setSelectedMushroomType(val)}
                    search={false}
                    data={mushroomTypes}
                    save="value"
                    placeholder='Mushroom Type'
                />
                <TextInput
                    style={styles.input}
                    keyboardType='numeric' 
                    placeholderTextColor="#aaaaaa"
                    placeholder='Number of packets'
                    onChangeText={(text) => setNumberOfMushroomPackets(text)}
                    value={numberOfPackets}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    keyboardType='numeric' 
                    placeholderTextColor="#aaaaaa"
                    placeholder='Returned packets'
                    onChangeText={(text) => setReturnedPackets(text)}
                    value={returnedPackets}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { onAddPress() }}>
                    <Text style={styles.buttonTitle}>Add</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}