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
import TournamentListItem from '../../components/tournamentListItem';
import MDIcon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../themes/colors';
import {Tournament} from './types';
import styles from './useStyles';
import DBService from '../../utils/database';
import {TournamentDBType, User} from '../../utils/types';
import {useFocusEffect} from '@react-navigation/native';
import * as StorageHelper from '../../utils/storageHelper';

interface Props {
  navigation: any;
  route: {
    params: {
      IsRefresh: boolean;
    };
  };
}
let userInfo: User | undefined;

const TournamentList = (props: Props) => {
  const {navigation, route} = props;
  const {IsRefresh} = route.params;

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>(
    [],
  );
  //const [userInfo, setUserInfo] = useState<User | undefined>();

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
      async function getUserInfo() {
        userInfo = await StorageHelper.getStoredUserData();
        getTournaments();
      }
      getUserInfo();
    }, 1000);

    return () => clearTimeout(delayedFilter);
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      setShowSearchLoading(true);
      const delayedFilter = setTimeout(() => {
        let filteredTournaments: Tournament[] = tournaments;
        filteredTournaments = filteredTournaments.filter(tour => {
          if (
            tour.name
              ?.toString()
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            tour.country
              ?.toString()
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            tour.city
              ?.toString()
              .toLowerCase()
              .includes(searchText.toLowerCase())
          ) {
            return true;
          }
        });

        setFilteredTournaments(filteredTournaments);
        setShowSearchLoading(false);
      }, 250);
      return () => clearTimeout(delayedFilter);
    } else {
      setFilteredTournaments(tournaments);
      setShowSearchLoading(false);
    }
  }, [searchText, tournaments]);

  const getTournaments = async () => {
    const db = await DBService.getDBConnection();
    await DBService.createTournamentsTable(db);
    await DBService.createFavoritesTable(db);

    const savedTournaments: TournamentDBType[] =
      await DBService.getAllTournaments(db, userInfo?.id);
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
        isFavorite: item.is_favorite,
        coverPhotoBase64: item.cover_photo_base64,
      });
    });

    console.log(JSON.stringify(castTournamentList));

    setTournaments(castTournamentList);
    setIsLoading(false);
  };

  const vehicleRender: ListRenderItem<Tournament> = ({item}) => (
    <TournamentListItem
      item={item}
      navigationObject={navigation}
      refreshTournamentList={() => {
        setIsLoading(true);
        getTournaments();
      }}
      userInfo={userInfo}
    />
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
          {filteredTournaments.length === 0 && (
            <Text style={styles.notFound}>No upcoming tournament found</Text>
          )}
          <FlatList
            data={filteredTournaments}
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
