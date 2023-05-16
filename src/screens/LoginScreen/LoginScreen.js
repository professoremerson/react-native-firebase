// importando as bibliotecas
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onFooterLinkPress = () => {
    // se for pressionado o 'link' no rodapé
    // da tela de 'Login' será aberta a tela
    // para registro
    navigation.navigate('Registration')
  }

  const onLoginPress = () => {}

  // retornando o componente
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{
          display: 'flex',
          width: '100%'
        }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
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
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Insira sua senha"
          onChangeText={text => setPassword(text)}
          value="password"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Logar</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Não possui uma conta?</Text>
          <Text onPress={() => onFooterLinkPress()} style={styles.footerLink}>
            Registrar-se
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}
