import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCPDPZanQ_w-II3ZM5NbfEEjmwKVA7_MFY",
  authDomain: "ostoslistadb.firebaseapp.com",
  databaseURL: "https://ostoslistadb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ostoslistadb",
  storageBucket: "ostoslistadb.appspot.com",
  messagingSenderId: "940122461623",
  appId: "1:940122461623:web:db82b4f4a722c920c8c432",
  measurementId: "G-95V0F2FFH7"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)


export default function App() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [products, setProducts] = useState([])

  useEffect(() => {
    const itemsRef = ref(db, "products/")
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val()
      data !== null ? setProducts(Object.values(data)) : setProducts([])
    })
  }, [])

  const saveProduct = () => {
    push(
      ref(db, 'products/'),
      { "name": name, "amount": amount }
    )
    setName("")
    setAmount("")
  }




  return (
    <View style={styles.container}>

      <TextInput style={styles.input, { marginTop: 50 }} value={name} onChangeText={text => setName(text)} placeholder="Product name" />
      <TextInput style={styles.input} value={amount} onChangeText={text => setAmount(text)} placeholder="Amount" />
      <TouchableOpacity style={styles.button} onPress={saveProduct}>
        <Text>SAVE</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, marginTop: "5%" }}>Shopping list</Text>
      <FlatList
        style={{ marginLeft: "5%", marginTop: "5%" }}
        data={products}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) =>
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>{item.name}, {item.amount}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    alignItems: "center",
    backgroundColor: "#ffc96d",
    padding: 10
  },
  input: {
    marginTop: 5,
    marginBottom: 5
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',

  }
});
