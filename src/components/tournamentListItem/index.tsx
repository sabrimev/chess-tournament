import React from 'react';
import {Image, Platform, Pressable, Text, View} from 'react-native';
import {Tournament} from '../../views/tournamentList/types';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from 'react-native-options-menu';

import styles from './useStyles';
import Colors from '../../themes/colors';

interface Props {
  item: Tournament;
  navigationObject: any;
}

const TournamentListItem = (props: Props) => {
  const navigateDetail = () => {
    /*props.navigationObject.navigate('Detail', {
      vehicle: props.item,
    });*/
  };

  const getActions = () => {
    let actions = {
      actionList: [() => {}, () => {}, () => {}],
      optionList: ['Edit', 'Delete', 'Cancel'],
    };

    // Remove cancel in Android
    if (Platform.OS === 'android') {
      actions.actionList.pop();
      actions.optionList.pop();
    }

    return actions;
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

        <Pressable onPress={() => console.log('Favorite pressed..')}>
          {props.item.isFavorite ? (
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
