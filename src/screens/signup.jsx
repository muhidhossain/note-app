import { Text, Platform, View, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../App';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioInput from '../components/Radio-input';

const genderOptions = ['Male', 'Female'];

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [signUpInfo, setSingUpInfo] = useState({
    email: '',
    password: '',
    age: null,
    name: '',
    gender: '',
  });

  console.log(signUpInfo);

  const handleInfoChange = (text, type) => {
    setSingUpInfo((info) => {
      return { ...info, [type]: text };
    });
  };

  const signup = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password)
      .then((userCredential) => {
        const user = userCredential.user;
        addDoc(collection(db, 'users'), {
          name: signUpInfo.name,
          email: signUpInfo.email,
          age: signUpInfo.age,
          gender: signUpInfo.gender,
          uid: user.uid,
        });
        console.log('User created', user);
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        showMessage({
          message: errorMessage,
          type: 'danger',
        });
        setLoading(false);
      });
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        paddingHorizontal: 25,
        flex: 1,
      }}
    >
      <View style={{ paddingVertical: 25 }}>
        <Input
          placeholder="Email address"
          autoCapitalize={'none'}
          onChangeText={(text) => handleInfoChange(text, 'email')}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => handleInfoChange(text, 'password')}
        />
        <Input
          placeholder="Full Name"
          autoCapitalize={'words'}
          onChangeText={(text) => handleInfoChange(text, 'name')}
        />
        <Input
          placeholder="Age"
          onChangeText={(text) => handleInfoChange(text, 'age')}
        />
        <View style={{ marginVertical: 20 }}>
          <Text>Select gender</Text>
        </View>
        {genderOptions.map((gender, index) => (
          <RadioInput
            key={index}
            label={gender}
            value={signUpInfo?.gender}
            valueType={'gender'}
            handleInfoChange={handleInfoChange}
          />
        ))}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 40,
          alignItems: 'center',
        }}
      >
        <Button
          onPress={signup}
          title={'Sign up'}
          customStyle={{ alignSelf: 'center', marginBottom: 60 }}
        />
        <Pressable>
          <Text>
            Already have an account?{' '}
            <Text style={{ color: 'green', fontWeight: 'bold' }}>Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
