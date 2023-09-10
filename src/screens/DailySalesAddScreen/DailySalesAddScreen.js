import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import app from '../../firebase/config'
import { getFirestore, doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { SelectList } from 'react-native-dropdown-select-list'





export default function DailySalesAddScreen({ navigation }) {
    const [date, setDate] = useState(new Date());
    // const [mode, setMode] = useState('date');

    const [numberOfPackets, setNumberOfMushroomPackets] = useState('')
    const [returnedPackets, setReturnedPackets] = useState('')
    const [selectedMushroomType, setSelectedMushroomType] = useState("");

    const db = getFirestore(app)
    const mushroomTypes = [
        { key: 'Abaloni', value: 'Abaloni'},
        { key: 'Sudu Bimmal', value: 'Sudu Bimmal'},
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
                setNumberOfMushroomPackets('');
                setReturnedPackets('');
                navigation.navigate("Daily Sales")
                
            }
            catch (error) {
                alert("Could not add todays details");
                console.log(error);
            }

        }

    
        


    }

    

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

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
                    defaultOption={{ key: 'Abaloni', value: 'Abaloni'}}
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