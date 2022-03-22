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
interface StatusOfTournament {
  color: string;
  text: string;
}

const TournamentListItem = (props: Props) => {
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(
    props.item.isFavorite,
  );

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

  const getStatusOfTournament = (): StatusOfTournament => {
    // Remove time
    const dateStringOnly = new Date().toDateString();
    const now = new Date(dateStringOnly).getTime();

    const startDate = new Date(props.item.startDate).getTime();
    const endDate = new Date(props.item.endDate).getTime();

    if (startDate <= now && now <= endDate) {
      return {
        color: Colors.greenPrimary,
        text: 'In progress',
      };
    } else if (now < endDate) {
      return {
        color: Colors.lightBlue,
        text: 'Upcoming',
      };
    } else {
      return {
        color: Colors.redColor,
        text: 'Ended',
      };
    }
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
          <Text numberOfLines={1} style={styles.location}>
            {props.item.country + ' / ' + props.item.city}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <MDIcon
            size={14}
            color={getStatusOfTournament().color}
            name={'circle'}
          />
          <Text numberOfLines={1} style={styles.location}>
            {getStatusOfTournament().text}
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
