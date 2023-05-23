// realizando as importações
import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen, LoginScreen, RegistrationScreen } from './src/screens'
import { decode, encode } from 'base-64'
import { firebase } from './src/firebase/config'

if (!global.btoa) {
  global.btoa = encode
}

if (!global.atob) {
  global.atob = decode
}

// criando um objeto para a pilha de navegação
const Stack = createStackNavigator()

// criando a aplicação
export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  /**
   * criando uma estrutura para recuperar os
   * os dados do usuário autenticado no banco
   * e gravar localmente para que, uma vez
   * feito o login, o usuário vá sempre para
   * a Home (a menos que limpe os dados do app)
   */

  useEffect(() => {
    const usersRef = firebase.firestore.collection('users')

    // verificando se ocorreu ou não um login
    // no provider 'Auth' do Firebase
    firebase.auth().onAuthStateChanged(user => {
      // testando se há um retorno de usuário
      if (user) {
        // recuperando as informações do usuário
        usersRef
          // procurando pelo documento que corresponde
          // ao 'uid' do usuário logado
          .doc(user.uid)
          // recuperando as informações do documento
          .get()
          // com as informações recuperadas
          .then(document => {
            // criando uma constate para receber os dados
            const userData = document.data()
            // alterando o estado do carregamento
            setLoading(true)
            setUser(userData)
          })
          // tratando possíveis erros nesta etapa
          .catch(error => {
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    })
  }, [])

  // testando se há um carregamento ou não
  if (loading) {
    // se estiver carregando, retornará um
    // fragmento (tela vazia)
    return <></>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // se o usuário estiver logado
          // redireciona a rota para a 'Home'
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          // se o usuário não estiver logado
          // disponibiliza os componentes para
          // 'login' ou registro
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
