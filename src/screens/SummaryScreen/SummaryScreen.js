// import React, { useState } from 'react'
// import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import styles from './styles';
// import app from '../../firebase/config'
// import { getFirestore, doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore";
// import { SelectList } from 'react-native-dropdown-select-list'
// import { Button } from 'react-native'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { async } from '@firebase/util';




// export function SummaryScreen({ navigation }) {
//     const [date, setDate] = useState(new Date());
//     const [mode, setMode] = useState('date');
//     const [show, setShow] = useState(false);

//     const [mushroomType, setMushroomType] = useState('')
//     const [numberOfPackets, setNumberOfMushroomPackets] = useState('')
//     const [returnedPackets, setReturnedPackets] = useState('')
//     const [selectedMushroomType, setSelectedMushroomType] = useState("");

//     const db = getFirestore(app)
//     const mushroomTypes = [
//         { key: '1', value: 'Abaloni'},
//         { key: '2', value: 'Sudu Bimmal'},
//     ]



//     const onAddPress = async () => {
//         var str_date = date.toLocaleDateString()
        
//         if(numberOfPackets==""){
//             alert("Number of packets field is empty")
//         }
//         else if(returnedPackets==""){
//             alert("Returned packet field is empty")
//         }

//         else{

//             docData = {
//                 "date": str_date,
//                 "mushroomType": selectedMushroomType,
//                 "dailyPacketsSold": numberOfPackets,
//                 "dailyPacketsReturned": returnedPackets
//             }
    
//             try {
//                 // await setDoc(doc(db, "mushroom_sales", str_date), docData);
//                 const res = await addDoc(collection(db, 'mushroom_sales'), docData);
                  
//                 console.log('Added document with ID: ', res.id);
//                 alert("Successfully added");
//             }
//             catch (error) {
//                 alert("Could not add todays details");
//                 console.log(error);
//             }

//         }


//     }

    

//     return (
//         <View style={styles.container}>
//             <KeyboardAwareScrollView
//                 style={{ flex: 1, width: '100%' }}
//                 keyboardShouldPersistTaps="always">

//                 <TextInput
//                     style={styles.input}
//                     placeholder='Date'
//                     placeholderTextColor="#aaaaaa"
//                     editable={false}
//                     onChangeText={(text) => setDate(text)}
//                     value={date.toLocaleDateString()}
//                     underlineColorAndroid="transparent"
//                     autoCapitalize="none"
//                 />
//                 {/* <TextInput
//                     style={styles.input}
//                     placeholder='Mushroom Type'
//                     placeholderTextColor="#aaaaaa"
//                     onChangeText={(text) => setMushroomType(text)}
//                     value={mushroomType}
//                     underlineColorAndroid="transparent"
//                     autoCapitalize="none"
//                 /> */}
//                 <SelectList
//                     boxStyles={styles.input}
//                     dropdownStyles = {styles.selectionDropdown}
//                     defaultOption={{ key: '1', value: 'Abaloni'}}
//                     setSelected={(val) => setSelectedMushroomType(val)}
//                     search={false}
//                     data={mushroomTypes}
//                     save="value"
//                     placeholder='Mushroom Type'
//                 />
//                 <TextInput
//                     style={styles.input}
//                     keyboardType='numeric' 
//                     placeholderTextColor="#aaaaaa"
//                     placeholder='Number of packets'
//                     onChangeText={(text) => setNumberOfMushroomPackets(text)}
//                     value={numberOfPackets}
//                     underlineColorAndroid="transparent"
//                     autoCapitalize="none"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     keyboardType='numeric' 
//                     placeholderTextColor="#aaaaaa"
//                     placeholder='Returned packets'
//                     onChangeText={(text) => setReturnedPackets(text)}
//                     value={returnedPackets}
//                     underlineColorAndroid="transparent"
//                     autoCapitalize="none"
//                 />

//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => { onAddPress() }}>
//                     <Text style={styles.buttonTitle}>Add</Text>
//                 </TouchableOpacity>
//             </KeyboardAwareScrollView>
//         </View>
//     )
// }

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash"



export default function SummaryScreen() {
  const [ columns, setColumns ] = useState([
    "Name",
    "Gender",
    "Breed",
    "Weight",
    "Age"
  ])
  const [ direction, setDirection ] = useState(null)
  const [ selectedColumn, setSelectedColumn ] = useState(null)
  const [ pets, setPets ] = useState([
    {
      Name: "Charlie",
      Gender: "Male",
      Breed: "Dog",
      Weight: 12,
      Age: 3
    },
    {
      Name: "Max",
      Gender: "Male",
      Breed: "Dog",
      Weight: 23,
      Age: 7
    },
    {
      Name: "Lucy",
      Gender: "Female",
      Breed: "Cat",
      Weight: 5,
      Age: 4
    },
    {
      Name: "Oscar",
      Gender: "Male",
      Breed: "Turtle",
      Weight: 13,
      Age: 23
    },
    {
      Name: "Daisy",
      Gender: "Female",
      Breed: "Bird",
      Weight: 1.7,
      Age: 3
    },
    {
      Name: "Ruby",
      Gender: "Female",
      Breed: "Dog",
      Weight: 6,
      Age: 3
    },
    {
      Name: "Milo",
      Gender: "Male",
      Breed: "Dog",
      Weight: 11,
      Age: 7
    },
    {
      Name: "Toby",
      Gender: "Male",
      Breed: "Dog",
      Weight: 34,
      Age: 19
    },
    {
      Name: "Lola",
      Gender: "Female",
      Breed: "Cat",
      Weight: 4,
      Age: 3
    },
    {
      Name: "Jack",
      Gender: "Male",
      Breed: "Turtle",
      Weight: 13,
      Age: 23
    },
    {
      Name: "Bailey",
      Gender: "Female",
      Breed: "Bird",
      Weight: 2,
      Age: 4
    },
    {
      Name: "Bella",
      Gender: "Female",
      Breed: "Dog",
      Weight: 6,
      Age: 10
    }
  ])

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc" 
    const sortedData = _.orderBy(pets, [column],[newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setPets(sortedData)
  }
  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {
        columns.map((column, index) => {
          {
            return (
              <TouchableOpacity 
                key={index}
                style={styles.columnHeader} 
                onPress={()=> sortTable(column)}>
                <Text style={styles.columnHeaderTxt}>{column + " "} 
                  { selectedColumn === column && <MaterialCommunityIcons 
                      name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"} 
                    />
                  }
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList 
        data={pets}
        style={{width:"90%"}}
        keyExtractor={(item, index) => index+""}
        ListHeaderComponent={tableHeader}
        stickyHeaderIndices={[0]}
        renderItem={({item, index})=> {
          return (
            <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
              <Text style={{...styles.columnRowTxt, fontWeight:"bold"}}>{item.Name}</Text>
              <Text style={styles.columnRowTxt}>{item.Gender}</Text>
              <Text style={styles.columnRowTxt}>{item.Breed}</Text>
              <Text style={styles.columnRowTxt}>{item.Weight}</Text>
              <Text style={styles.columnRowTxt}>{item.Age}</Text>
            </View>
          )
        }}
      />
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
    paddingTop:80
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#37C2D0",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems:"center",
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width:"20%",
    textAlign:"center",
  }
});

