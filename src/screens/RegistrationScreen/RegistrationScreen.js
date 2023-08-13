import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import app from '../../firebase/config'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { collection, doc } from 'firebase/firestore'

export default function RegistrationScreen({ navigation }) {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const auth = getAuth(app);
    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = async () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        console.log("Creating account")
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const userId = userCredential.user.uid;
                const data = {
                    id: userId,
                    email,
                    fullName,
                }

                const usersRef = collection('users')
                usersRef.doc(userId).set(data).then(
                    () => {
                        navigation.navigate('Home', { user: data })
                    }
                ).catch((error) => {
                    alert(error)
                });


                console.log(user.email);
                alert("Succuessfully Created account");


                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                alert(errorMessage);
                // ..
            });
        // firebase
        //     .auth()
        //     .createUserWithEmailAndPassword(email, password)
        //     .then((response) => {
        //         const uid = response.user.uid
        //         const data = {
        //             id: uid,
        //             email,
        //             fullName,
        //         };
        //         const usersRef = firebase.firestore().collection('users')
        //         usersRef
        //             .doc(uid)
        //             .set(data)
        //             .then(() => {
        //                 navigation.navigate('Home', { user: data })
        //             })
        //             .catch((error) => {
        //                 alert(error)
        //             });
        //     })
        //     .catch((error) => {
        //         alert(error)
        //     });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/mushroom.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}