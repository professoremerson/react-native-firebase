// importando a biblioteca do Firebase
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

/**
 * criando o objeto que irá conter os parâmetros
 * de conexão com a aplicação Firebase
 */
const firebaseConfig = {
  apiKey: 'AIzaSyBSx1pJfKhwXQm7HuWt6rWqA4YGPPPGZjk',
  authDomain: 'firebase-react-native-app.firebaseapp.com',
  databaseURL: 'https://fir-react-native-app-8b5bb.firebaseio.com',
  projectId: 'fir-react-native-app-8b5bb',
  appId: '1:309730778954:android:51a5bff0df8f6c39c16bb3'
}

// inicializando o Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// exportando o módulo
export { firebase }
