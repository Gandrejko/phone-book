import React, {FC} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Contact} from 'react-native-contacts';
import Avatar from './avatar';

type ContactListItemProps = {
  contact: Contact;
  navigation: any;
};

export const ContactListItem: FC<ContactListItemProps> = ({
  contact,
  navigation,
}) => {
  const onContactPress = (id: string) => {
    navigation.navigate('Contact', {
      id,
    });
  };

  const {recordID, givenName, emailAddresses, hasThumbnail, thumbnailPath} =
    contact;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onContactPress(recordID)}>
      <View style={styles.avatarHolder}>
        <Avatar
          img={
            hasThumbnail
              ? {uri: thumbnailPath}
              : require('@src/assets/img/default-avatar.png')
          }
          width={48}
          height={48}
        />
        <View style={styles.informationHolder}>
          <Text style={styles.contactName}> {givenName} </Text>
          <Text style={styles.contactEmail}> {emailAddresses[0]?.email} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  avatarHolder: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  informationHolder: {
    marginHorizontal: 12,
  },
  contactName: {
    color: 'black',
    fontWeight: 'bold',
  },
  contactEmail: {
    color: 'black',
  },
});

export default ContactListItem;
