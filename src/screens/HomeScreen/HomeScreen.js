// importando as bibliotecas
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import styles from './styles'
import { firebase } from '../../firebase/config'

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState('')
  const [entities, setEntities] = useState([])

  const entityRef = firebase.firestore().collection('entities')
  const userId = props.extraData.id

  useEffect(() => {
    /**
     * buscando na coleção 'entities' os
     * documentos que estejam relacionados
     * ao usuário logado
     */
    entityRef.where('authorId', '==', userId).onSnapshot(
      querySnapshot => {
        const newEntities = []
        querySnapshot.forEach(doc => {
          const entity = doc.data()
          entity.id = doc.id
          // envio o documento para o array
          newEntities.push(entity)
        })
        setEntities(newEntities)
      },
      error => {
        console.log(error)
      }
    )
  }, [])

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timeStamp = firebase.firestore.FieldValue.serverTimestamp()

      const data = {
        text: entityText,
        authorId: userId,
        createAt: timeStamp
      }

      // salvando os dados no Firestore
      entityRef
        .add(data)
        .then(_doc => {
          /**
           * depois de salvar o documento no
           * Firestore, limpa o campo e oculta
           * o teclado
           */
          setEntityText('')
          Keyboard.dismiss()
        })
        .catch(error => {
          alert(error)
        })
    }
  }

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.text}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEntityText(text)}
          value={entityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={entities}
          renderItem={renderEntity}
          keyExtractor={item => item.id}
          removeClippedSubviews={true}
        />
      </View>
    </View>
  )
}
