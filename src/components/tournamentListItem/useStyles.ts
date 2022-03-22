import {StyleSheet} from 'react-native';

import Colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
    marginLeft: 7,
    marginRight: 7,
    flexDirection: 'row',
    borderRadius: 5,
    height: 100,
    borderColor: Colors.border,
    backgroundColor: Colors.pureWhite,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 3,
    marginBottom: 3,
  },
  favoriteAndCoverPhotoContainer: {
    flex: 0.15,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 7,
    marginRight: 7,
  },
  information: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 3,
    marginBottom: 3,
    alignSelf: 'center',
  },
  options: {
    flex: 0.1,
    marginRight: 7,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 7,
    color: Colors.primaryTextColor,
  },
  dates: {
    fontSize: 14,
    marginLeft: 3,
    color: Colors.primaryTextColor,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    marginLeft: 3,
    color: Colors.primaryTextColor,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverPhotoContainer: {
    height: 40,
    width: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    marginBottom: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.borderColor,
  },
  coverPhoto: {
    height: 40,
    width: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
});

export default styles;
