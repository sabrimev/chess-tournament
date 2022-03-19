import styles from './useStyles';
import React, {useState} from 'react';
import {Image, Platform, Pressable, SafeAreaView, View} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import {Input, Button as ButtonElement, Text} from 'react-native-elements';
//@ts-ignore lib issue
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

import Colors from '../../themes/colors';
import {resolvePreset} from '@babel/core';

interface Props {
  navigation: any;
}

const AddTournament = (props: Props) => {
  const {navigation} = props;

  const [name, setName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startDateOpen, setStartDateOpen] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endDateOpen, setEndDateOpen] = useState<boolean>(false);

  const [coverPhotoBase64, setCoverPhotoBase64] = useState<string>('');

  const [isLoading, setIsloading] = useState<boolean>(false);

  const addTournament = () => {
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
      console.log('lann: ' + JSON.stringify(isLoading));
      navigation.goBack();
    }, 2000);
  };

  const openImagePicker = async () => {
    const pickedCoverPhoto = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
      presentationStyle: 'formSheet',
    });

    const filePath =
      Platform.OS === 'android'
        ? pickedCoverPhoto.uri
        : pickedCoverPhoto.uri.replace('file://', '');

    const coverPhoto = await RNFS.readFile(filePath, 'base64');

    setCoverPhotoBase64(coverPhoto);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading} />

      <Pressable
        style={styles.coverPhotoContainer}
        onPress={() => openImagePicker()}>
        {coverPhotoBase64?.length > 0 ? (
          <Image
            style={styles.coverPhoto}
            source={{
              uri: `data:image/jpeg;base64,${coverPhotoBase64}`,
            }}
          />
        ) : (
          <MDIcon size={32} color={Colors.borderColor} name={'add-a-photo'} />
        )}
      </Pressable>

      <Input
        placeholder="Name"
        defaultValue={name}
        label={'Name'}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'person'} />}
        onChangeText={value => setName(value)}
        autoCompleteType={'username'}
      />

      <Input
        placeholder="Country"
        defaultValue={country}
        label={'Country'}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'person'} />}
        onChangeText={value => setCountry(value)}
        autoCompleteType={'country'}
      />

      <Input
        placeholder="City"
        defaultValue={city}
        label={'City'}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'person'} />}
        onChangeText={value => setCity(value)}
        autoCompleteType={'city'}
      />

      <DatePicker
        modal
        mode="date"
        open={startDateOpen}
        date={startDate}
        onConfirm={(date: Date) => {
          setStartDateOpen(false);
          setStartDate(date);
          console.log(date);
        }}
        onCancel={() => {
          setStartDateOpen(false);
        }}
      />

      <ButtonElement
        buttonStyle={styles.registerButton}
        title="Select Start Date"
        type="clear"
        onPress={() => {
          setStartDateOpen(true);
        }}
      />

      <Text style={styles.tournamentDate}>{startDate.toDateString()}</Text>

      <ButtonElement
        buttonStyle={styles.registerButton}
        title="Select End Date"
        type="clear"
        onPress={() => {
          setEndDateOpen(true);
        }}
      />

      <Text style={styles.tournamentDate}>{endDate.toDateString()}</Text>

      <DatePicker
        modal
        mode="date"
        open={endDateOpen}
        date={endDate}
        onConfirm={(date: Date) => {
          setEndDateOpen(false);
          setEndDate(date);
        }}
        onCancel={() => {
          setEndDateOpen(false);
        }}
      />

      <View style={styles.buttonContainer}>
        <ButtonElement
          buttonStyle={styles.loginButton}
          title="Add Tournament"
          type="solid"
          onPress={() => {
            console.log('Registring..');
            addTournament();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddTournament;
