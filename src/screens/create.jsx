import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/Input';
import RadioInput from '../components/Radio-input';
import Button from '../components/Button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../App';
import { showMessage } from 'react-native-flash-message';

const noteColorOptions = [
  '#FF0000',
  '#FF7F00',
  '#c9c928',
  '#198919',
  '#0000FF',
  '#4B0082',
  '#9400D3',
];

export default function Create({ navigation, user }) {
  const [noteInfo, setNoteInfo] = useState({
    title: '',
    description: '',
    noteColor: '#FF0000',
  });
  const [loading, setLoading] = useState(false);

  const handleInfoChange = (text, type) => {
    setNoteInfo((info) => {
      return { ...info, [type]: text };
    });
  };

  const onPressCreate = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'notes'), {
        title: noteInfo.title,
        description: noteInfo.description,
        color: noteInfo.noteColor,
        uid: user?.uid,
      });
      setLoading(false);
      showMessage({
        message: 'Note created successfully',
        type: 'success',
      });
      navigation.goBack();
    } catch (error) {
      console.error('err ', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
      <Input
        placeholder="Title"
        onChangeText={(text) => handleInfoChange(text, 'title')}
      />
      <Input
        placeholder="Description"
        onChangeText={(text) => handleInfoChange(text, 'description')}
        multiline={true}
      />
      <View style={{ marginTop: 25, marginBottom: 15 }}>
        <Text>Select your note color</Text>
      </View>
      {noteColorOptions.map((color, index) => (
        <RadioInput
          key={index}
          color={color}
          label={color}
          value={noteInfo?.noteColor}
          valueType={'noteColor'}
          handleInfoChange={handleInfoChange}
        />
      ))}
      {loading ? (
        <ActivityIndicator
          style={{ alignSelf: 'center', marginTop: 60, width: '100%' }}
          size="large"
          color="#FFE600"
        />
      ) : (
        <Button
          onPress={onPressCreate}
          title={'Submit'}
          customStyle={{ alignSelf: 'center', marginTop: 60, width: '100%' }}
        />
      )}
    </SafeAreaView>
  );
}
