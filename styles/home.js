import { StyleSheet } from 'react-native';
import { moderateScale } from '../src/utils/scaling';

export default StyleSheet.create({
  homeContainer: {
    padding: moderateScale(30),
    paddingTop: moderateScale(65),
    alignItems: 'center'
  },
  description: {
    marginBottom: moderateScale(15),
    fontSize: moderateScale(17),
    textAlign: 'center',
    color: '#eee'
  },
  header: {
    marginBottom: moderateScale(20),
    fontSize: moderateScale(28),
    textAlign: 'center',
    color: '#eee',
    fontWeight: 'bold'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  separator: {
    borderBottomWidth: moderateScale(2),
    borderBottomColor: '#4c4c4f'
  },
  searchInput: {
    height: moderateScale(36),
    paddingLeft: moderateScale(10),
    flex: 1,
    fontSize: moderateScale(16),
    color: '#eee'
  },
  buttonText: {
    fontSize: moderateScale(16),
    color: '#eee',
    alignSelf: 'center'
  },
  button: {
    height: moderateScale(36),
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4285f4',
    marginBottom: moderateScale(10),
    marginTop: moderateScale(15),
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  empty: {
    width: moderateScale(10)
  }
});