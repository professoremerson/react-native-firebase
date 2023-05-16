import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    height: 120,
    width: 120,
    alignSelf: 'center',
    margin: 30
  },
  input: {
    height: 50,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginRight: 30,
    marginBottom: 20,
    marginLeft: 30,
    paddingLeft: 16
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttomTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footerView: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16
  }
})
