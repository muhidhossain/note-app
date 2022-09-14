import {
  Text,
  SafeAreaView,
  Platform,
  Image,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../App';

export default function SignIn({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [signInInfo, setSignInInfo] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const login = () => {
    signInWithEmailAndPassword(
      auth,
      signInInfo.email,
      signInInfo.password
    ).then((res) => {
      console.log('Successfully signed in', res);
    });
  };

  const handleInfoChange = (text, type) => {
    setSignInInfo((info) => {
      return { ...info, [type]: text };
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
      <Image
        source={require('../../assets/empty-state.png')}
        style={{ alignSelf: 'center', height: 250, width: 330 }}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
        Never forgat your notes
      </Text>
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
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Button
          onPress={login}
          title={'Login'}
          customStyle={{ alignSelf: 'center', marginBottom: 60 }}
        />
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text>
            Don't have an account?{' '}
            <Text style={{ color: 'green', fontWeight: 'bold' }}>Sign up</Text>
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
});
