import React, {useEffect, useState} from 'react';
import {Image, Platform, Pressable, Text, View} from 'react-native';
import {Tournament} from '../../views/tournamentList/types';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore lib issue
import OptionsMenu from 'react-native-options-menu';

import styles from './useStyles';
import Colors from '../../themes/colors';
import DBService from '../../utils/database';
import {Favorite, User} from '../../utils/types';

interface Props {
  item: Tournament;
  navigationObject: any;
  userInfo: User | undefined;
  refreshTournamentList: () => void;
}

const TournamentListItem = (props: Props) => {
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(
    props.item.isFavorite,
  );

  useEffect(() => {
    async function getUserInfo() {
      const newFavorite: Favorite = {
        tournament_id: props.item.id,
        user_id: props.userInfo?.id,
      };
      const db = await DBService.getDBConnection();

      const existingFavorites: Favorite[] = await DBService.getFavorites(
        db,
        newFavorite.tournament_id,
        newFavorite.user_id,
      );
      console.log('Favorites: ' + JSON.stringify(existingFavorites));
    }
    getUserInfo();
  }, [props.item.id, props.userInfo?.id]);

  const onDeleteTournament = async () => {
    const db = await DBService.getDBConnection();
    await DBService.deleteTournament(db, props.item.id);
    props.refreshTournamentList();
  };

  const onEditTournament = () => {
    props.navigationObject.navigate('AddTournament', {
      isEdit: true,
      tournament: props.item,
    });
  };

  const getActions = () => {
    let actions = {
      actionList: [
        () => onEditTournament(),
        () => onDeleteTournament(),
        () => {},
      ],
      optionList: ['Edit', 'Delete', 'Cancel'],
    };

    // Remove cancel in Android
    if (Platform.OS === 'android') {
      actions.actionList.pop();
      actions.optionList.pop();
    }

    return actions;
  };

  const onHandleFavorite = async () => {
    if (isFavorite) {
      await deleteFavorites();
    } else {
      await addToFavorites();
    }
  };

  const deleteFavorites = async () => {
    const newFavorite: Favorite = {
      tournament_id: props.item.id,
      user_id: props.userInfo?.id,
    };

    const db = await DBService.getDBConnection();
    await DBService.createFavoritesTable(db);

    await DBService.deleteFavorite(
      db,
      newFavorite.tournament_id,
      newFavorite.user_id,
    );
    setIsFavorite(false);
  };

  const addToFavorites = async () => {
    console.log('Favorite pressed..');

    const newFavorite: Favorite = {
      tournament_id: props.item.id,
      user_id: props.userInfo?.id,
    };

    const db = await DBService.getDBConnection();
    await DBService.createFavoritesTable(db);

    const existingFavorites: Favorite[] = await DBService.getFavorites(
      db,
      newFavorite.tournament_id,
      newFavorite.user_id,
    );
    const fav: Favorite = existingFavorites[0];
    if (fav) {
      return;
    }
    setIsFavorite(true);

    await DBService.addFavorite(db, newFavorite);
  };

  return (
    <View style={styles.container}>
      <View style={styles.favoriteAndCoverPhotoContainer}>
        <View style={styles.coverPhotoContainer}>
          {props.item.coverPhotoBase64.length > 0 ? (
            <Image
              style={styles.coverPhoto}
              source={{
                uri: `data:image/jpeg;base64,${props.item.coverPhotoBase64}`,
              }}
            />
          ) : (
            <MCIcon size={28} color={Colors.softBlack} name={'chess-pawn'} />
          )}
        </View>

        <Pressable onPress={() => onHandleFavorite()}>
          {isFavorite ? (
            <MDIcon size={24} color={Colors.redColor} name={'favorite'} />
          ) : (
            <MDIcon
              size={24}
              color={Colors.softBlack}
              name={'favorite-border'}
            />
          )}
        </Pressable>
      </View>
      <View style={styles.information}>
        <Text numberOfLines={1} style={styles.title}>
          {props.item.name}
        </Text>
        <View style={styles.dateContainer}>
          <MDIcon size={18} color={Colors.softBlack} name={'date-range'} />
          <Text numberOfLines={1} style={styles.dates}>
            {props.item.startDate + ' - ' + props.item.endDate}
          </Text>
        </View>
        <View style={styles.locationContainer}>
          <MDIcon size={18} color={Colors.softBlack} name={'location-on'} />
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.location}>
            {props.item.country + ' / ' + props.item.city}
          </Text>
        </View>
      </View>
      <View style={styles.options}>
        <OptionsMenu
          customButton={
            <MDIcon size={28} color={Colors.softBlack} name={'more-vert'} />
          }
          options={getActions().optionList}
          actions={getActions().actionList}
          destructiveIndex={1}
        />
      </View>
    </View>
  );
};

export default TournamentListItem;
