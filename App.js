// realizando as importações
import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen, LoginScreen, RegistrationScreen } from './src/screens'
import { decode, encode } from 'base-64'

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

  // retornando o componente principal
  return (
    <NavigationContainer>
      <Stack.Navigator>
        // verificando se há um usuário
        {user ? (
          // se o usuário estiver logado
          // redireciona a rota para a 'Home'
          <Stack.Screen name="Home">
            // informando a rota, componente e // enviar os dados do usuário
            para a 'Home'
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          // se o usuário não estiver logado
          // disponibiliza os componentes para
          // 'login' ou registro
          <>
            // criando a rota e vinculando o componente
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
