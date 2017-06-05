import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  homeContainer: {
    padding: 30,
    paddingTop: 65,
    alignItems: 'center'
  },
  description: {
    marginBottom: 20,
    fontSize: 17,
    textAlign: 'center',
    color: '#eee'
  },
  header: {
    marginBottom: 20,
    fontSize: 28,
    textAlign: 'center',
    color: '#eee',
    fontWeight: 'bold'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  searchInput: {
    height: 36,
    paddingLeft: 10,
    flex: 1,
    fontSize: 16,
    borderBottomColor: '#4c4c4f',
    borderBottomWidth: 2,
    color: '#eee'
  },
  buttonText: {
    fontSize: 16,
    color: '#eee',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4285f4',
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  empty: {
    width: 10
  }
});