// importando as bibliotecas
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const onRegisterPress = () => {}

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
        <View style={styles.footView}>
          <Text style={styles.footerText}>Já possui uma conta?</Text>
          <Text style={styles.footerLink} onPress={() => onFooterLinkPress()}>
            Login
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}
