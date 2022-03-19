import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {FAB, SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import TournamentListItem from '../../components/tournamentListItem';
import MDIcon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../themes/colors';
import * as Constants from '../../utils/constants';
import {Tournament, Vehicles, VehiclesResponse} from './types';
import styles from './useStyles';

interface Props {
  navigation: any;
  filteredStoreVehicles: Vehicles[];
  storeVehicles: (vehicles: any) => void;
  filterVehicles: ({filterText}: any) => void;
}

const tempTournaments: Tournament[] = [
  {
    id: 1,
    name: 'Classic Tournament of Chess',
    startDate: '14.03.2022',
    endDate: '20.03.2022',
    isFavorite: false,
    country: 'Netherlands',
    city: 'Amsterdam',
  },
  {
    id: 2,
    name: 'The World Chess Champions',
    startDate: '17.03.2022',
    endDate: '24.03.2022',
    isFavorite: true,
    country: 'United Kingdom',
    city: 'London',
  },
  {
    id: 3,
    name: 'Tournament of the Dragon Flame',
    startDate: '23.03.2022',
    endDate: '26.03.2022',
    isFavorite: true,
    country: 'Turkey',
    city: 'Istanbul',
  },
  {
    id: 4,
    name: 'Tournament of the King of Kings',
    startDate: '25.03.2022',
    endDate: '30.03.2022',
    isFavorite: false,
    country: 'Germany',
    city: 'Berlin',
  },
];

const TournamentList = (props: Props) => {
  const {navigation} = props;

  const [searchText, setSearchText] = useState<string>('');
  const [showSearchLoading, setShowSearchLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const delayedFilter = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delayedFilter);
  }, []);

  const vehicleRender: ListRenderItem<Tournament> = ({item}) => (
    <TournamentListItem item={item} navigationObject={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        lightTheme
        round={true}
        value={searchText}
        placeholder="Search"
        showLoading={showSearchLoading}
        onClear={() => setSearchText('')}
        containerStyle={styles.searchContainer}
        //@ts-ignore lib issue
        onChangeText={text => setSearchText(text)}
        loadingProps={{color: Colors.primaryColor}}
        inputContainerStyle={styles.searchInputContainer}
      />

      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={Colors.primaryColor}
          style={styles.activityIndicator}
        />
      ) : (
        <View style={styles.flatListContainer}>
          {tempTournaments.length === 0 && (
            <Text style={styles.notFound}>No Upcoming Tournament Found</Text>
          )}
          <FlatList
            data={tempTournaments}
            initialNumToRender={15}
            maxToRenderPerBatch={15}
            removeClippedSubviews={true}
            renderItem={vehicleRender}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
      <FAB
        color={Colors.primaryColor}
        icon={<MDIcon size={18} color={Colors.pureWhite} name={'add'} />}
        size="large"
        placement="right"
        style={styles.FAB}
      />
    </SafeAreaView>
  );
};

export default TournamentList;
