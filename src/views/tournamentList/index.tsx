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
import DBService from '../../utils/database';
import {TournamentDBType} from '../../utils/types';
import {useFocusEffect} from '@react-navigation/native';

interface Props {
  navigation: any;
  route: {
    params: {
      IsRefresh: boolean;
    };
  };
}

const TournamentList = (props: Props) => {
  const {navigation, route} = props;
  const {IsRefresh} = route.params;

  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const [searchText, setSearchText] = useState<string>('');
  const [showSearchLoading, setShowSearchLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useFocusEffect(
    React.useCallback(() => {
      if (IsRefresh) {
        console.log('Refreshed');
        setIsLoading(true);
        getTournaments();
      }
    }, [IsRefresh]),
  );

  useEffect(() => {
    setIsLoading(true);
    const delayedFilter = setTimeout(async () => {
      getTournaments();
    }, 1000);

    return () => clearTimeout(delayedFilter);
  }, []);

  const getTournaments = async () => {
    const db = await DBService.getDBConnection();
    await DBService.createTournamentsTable(db);

    const savedTournaments: TournamentDBType[] =
      await DBService.getAllTournaments(db);
    let castTournamentList: Tournament[] = [];
    savedTournaments.forEach(item => {
      castTournamentList.push({
        id: item.id,
        name: item.name,
        country: item.country,
        city: item.city,
        startDate: item.start_date,
        endDate: item.end_date,
        userId: item.user_id,
        isFavorite: false,
        coverPhotoBase64: item.cover_photo_base64,
      });
    });
    setTournaments(castTournamentList);
    setIsLoading(false);
  };

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
          {tournaments.length === 0 && (
            <Text style={styles.notFound}>No upcoming tournament found</Text>
          )}
          <FlatList
            data={tournaments}
            initialNumToRender={15}
            maxToRenderPerBatch={15}
            removeClippedSubviews={true}
            renderItem={vehicleRender}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
      {!isLoading && (
        <FAB
          color={Colors.primaryColor}
          icon={<MDIcon size={18} color={Colors.pureWhite} name={'add'} />}
          size="large"
          placement="right"
          style={styles.FAB}
          onPress={() => navigation.navigate('AddTournament')}
        />
      )}
    </SafeAreaView>
  );
};

export default TournamentList;
