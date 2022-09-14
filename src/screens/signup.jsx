import {
  Text,
  SafeAreaView,
  Platform,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../App';
import { showMessage } from 'react-native-flash-message';

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
        {genderOptions.map((gender) => (
          <Pressable
            onPress={() => handleInfoChange(gender, 'gender')}
            style={styles.radioContainer}
            key={gender}
          >
            <View
              style={[
                styles.outerCircle,
                signUpInfo.gender === gender && styles.selectedOuterCircle,
              ]}
            >
              <View
                style={[
                  styles.innerCircle,
                  signUpInfo.gender === gender && styles.selectedInnerCircle,
                ]}
              />
            </View>
            <Text>{gender}</Text>
          </Pressable>
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

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 25,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOuterCircle: {
    borderColor: 'orange',
  },
  innerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CFCFCF',
  },
  selectedInnerCircle: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
});
