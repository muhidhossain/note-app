import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../App';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';

export default function Home({ navigation, user }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(notes);

  useEffect(() => {
    const q = query(collection(db, 'notes'), where('uid', '==', user?.uid));
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const notes = [];
      querySnapshot.forEach((doc) => {
        notes.push({ ...doc.data(), id: doc.id });
      });
      setNotes(notes);
      setLoading(false);
    });

    return notesListenerSubscription;
  }, []);

  const onPressCreate = () => {
    navigation.navigate('Create');
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color="#FFE600" />
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }) => {
    const { title, description, color } = item;

    return (
      <Pressable
        style={{
          minHeight: 60,
          backgroundColor: color,
          marginBottom: 10,
          padding: 15,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('Edit', { item })}
      >
        <Pressable
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            top: 15,
            right: 15,
            backgroundColor: '#fff',
            borderRadius: 5,
            zIndex: 4,
          }}
          onPress={() => deleteDoc(doc(db, 'notes', item.id))}
        >
          <MaterialIcons name="delete" size={20} color="red" />
        </Pressable>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          {title}
        </Text>
        <Text style={{ color: 'white', fontSize: 14, marginTop: 5 }}>
          {description}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}
      >
        <Text style={{ fontWeight: '700' }}>My Notes</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={onPressCreate}>
            <AntDesign name="pluscircleo" size={24} color="#198919" />
          </Pressable>
          <Pressable style={{ marginLeft: 20 }} onPress={() => signOut(auth)}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}
