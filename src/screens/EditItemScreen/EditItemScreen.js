// importando as bibliotecas
import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { firebase } from '../../firebase/config'

export default function EditItemScreen({ navigation, ...props }) {
  const [itemText, setItemText] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [createAt, setCreateAt] = useState({
    nanoseconds: '',
    seconds: ''
  })

  const entityRef = firebase.firestore().collection('entities')

  useEffect(() => {
    entityRef
      .doc(props.route.params.itemId)
      .get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          alert('Item não encontrado!')
          return
        }
        const item = firestoreDocument.data()
        console.log(item)
        setItemText(item.text)
        setAuthorId(item.authorId)
        setCreateAt(item.createAt)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  // Onde iremos realizar a atualização do documento
  const onAlterarButtonPress = () => {
    const entityRef = firebase
      .firestore()
      .collection('entities')
      .doc(props.route.params.itemId)
    // atualizando o documento
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp()
    entityRef
      .set({
        authorId: authorId,
        text: itemText,
        createAt: createAt,
        updateAt: timeStamp
      })
      .then(() => {
        navigation.navigate('Home')
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Onde iremos poder voltar para a 'Home'
  const onVoltarButtonPress = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <TextInput
        styles={styles.input}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        value={itemText}
        onChangeText={text => setItemText(text)}
      />

      <View style={styles.viewButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onVoltarButtonPress()}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onAlterarButtonPress()}
        >
          <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
