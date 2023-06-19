import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center'
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
  viewButtons: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 50,
    width: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
})
