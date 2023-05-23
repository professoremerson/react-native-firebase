// importando as bibliotecas
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import { firebase } from '../../firebase/config'

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const onRegisterPress = () => {
    /**
     * testando se os campos para senha e confirmação
     * de senha possuem o mesmo conteúdo
     */
    if (password !== confirmPassword) {
      alert('Senha e confirmação não conferem!')
      return
    }
    // se os campos senha e confirmação forem
    // iguais
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        // recuperando o ID do usuário no Firebase
        const uid = response.user.uid
        // montando um objeto com os dados do usuário
        const data = {
          id: uid,
          email,
          fullName
        }
        // vinculando a constante 'usersRef' à
        // coleção 'users' do Firestore
        const usersRef = firebase.firestore().collection('users')
        // gravando os dados do usuário criado na
        // coleção 'users' dentro do Firestore
        usersRef
          .doc(uid)
          .set(data)
          // testando a gravação do documento
          .then(() => {
            // se o documento foi gravado com sucesso
            // redireciona o usuário para a página 'Home'
            // e envia os dados do usuário para a nova
            // página
            navigation.navigate('Home', { user: data })
          })
          .catch(error => {
            alert(error)
          })
      })
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{
          display: 'flex',
          width: '100%'
        }}
      >
        <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Insira seu nome completo"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Insira seu email"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Insira sua senha"
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Criar sua conta</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Já possui uma conta?</Text>
          <Text style={styles.footerLink} onPress={() => onFooterLinkPress()}>
            Login
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}
