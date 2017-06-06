import { StyleSheet } from 'react-native';
import normalize from '../src/utils/normalizeText';


export default StyleSheet.create({
  homeContainer: {
    padding: normalize(30),
    paddingTop: normalize(65),
    alignItems: 'center'
  },
  description: {
    marginBottom: normalize(15),
    fontSize: normalize(17),
    textAlign: 'center',
    color: '#eee'
  },
  header: {
    marginBottom: normalize(20),
    fontSize: normalize(28),
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
    height: normalize(36),
    paddingLeft: normalize(10),
    flex: 1,
    fontSize: normalize(16),
    borderBottomColor: '#4c4c4f',
    borderBottomWidth: 2,
    color: '#eee'
  },
  buttonText: {
    fontSize: normalize(16),
    color: '#eee',
    alignSelf: 'center'
  },
  button: {
    height: normalize(36),
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4285f4',
    marginBottom: normalize(10),
    marginTop: normalize(15),
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  empty: {
    width: normalize(10)
  }
});