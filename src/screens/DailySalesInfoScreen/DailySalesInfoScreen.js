
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash";
import app from '../../firebase/config'
import { getFirestore, doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore";
import styles from './styles';


export default function DailySalesInfoScreen() {
  const [ columns, setColumns ] = useState([
    "Date",
    "Mushroom Type",
    "Packets Sold",
    "Packets Returened",
  ])
  const [ direction, setDirection ] = useState(null)
  const [ selectedColumn, setSelectedColumn ] = useState(null)
  const [salesDetails, setSalesDetails] = useState(null)
  const db = getFirestore(app)


  useEffect(() => {

    const fetchData = async () => {

      const querySnapshot = await getDocs(collection(db, "mushroom_sales"));

      const salesDetailsList = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const salesDetail = {
       packetsReturned: data.dailyPacketsReturned,
       packetsSold: data.dailyPacketsSold,
       date: data.date,
       mushroomType: data.mushroomType

      };
      return salesDetail;
    });

    setSalesDetails(salesDetailsList);

    };



    
   
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    fetchData();
  },[]);

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
        data={salesDetails}
        style={{width:"90%"}}
        keyExtractor={(item, index) => index+""}
        ListHeaderComponent={tableHeader}
        stickyHeaderIndices={[0]}
        renderItem={({item, index})=> {
          return (
            <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
              {/* <Text style={{...styles.columnRowTxt, fontWeight:"bold"}}>{item.Name}</Text> */}
              <Text style={styles.columnRowTxt}>{item.date}</Text>
              <Text style={styles.columnRowTxt}>{item.mushroomType}</Text>
              <Text style={styles.columnRowTxt}>{item.packetsSold}</Text>
              <Text style={styles.columnRowTxt}>{item.packetsReturned}</Text>
            </View>
          )
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop:80
//   },
//   tableHeader: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     backgroundColor: "#37C2D0",
//     borderTopEndRadius: 10,
//     borderTopStartRadius: 10,
//     height: 50
//   },
//   tableRow: {
//     flexDirection: "row",
//     height: 50,
//     alignItems:"center",
//   },
//   columnHeader: {
//     width: "20%",
//     justifyContent: "center",
//     alignItems:"center"
//   },
//   columnHeaderTxt: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   columnRowTxt: {
//     width:"25%",
//     textAlign:"center",
//   }
// });

