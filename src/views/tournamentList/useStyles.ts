import {StyleSheet} from 'react-native';

import Colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    borderTopColor: 'transparent',
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    maxHeight: 70,
  },
  searchInputContainer: {
    marginLeft: 5,
    marginRight: 5,
    height: 45,
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
  activityIndicator: {
    marginTop: 20,
  },
  notFound: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 5,
    color: Colors.primaryTextColor,
  },
  flatListContainer: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  FAB: {
    marginBottom: 40,
  },
});

export default styles;
