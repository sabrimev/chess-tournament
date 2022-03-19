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
    height: 90,
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
  favorite: {
    flex: 0.1,
    alignSelf: 'center',
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
  },


  imageThumbnail: {
    height: 100,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContainer: {
    alignItems: 'center',
    margin: 3,
  },
  brand: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.primaryTextColor,
  },
  model: {
    fontSize: 12,
    color: Colors.primaryTextColor,
  },
  pressable: {
    flex: 1,
  },
});

export default styles;
