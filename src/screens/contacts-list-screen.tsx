import ContactListItem from '@components/contact-list-item';
import {SearchBar} from '@components/search-bar';
import {FC, useEffect, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts, {type Contact} from 'react-native-contacts';

type ContactsListScreenProps = {
  route: any;
  navigation: any;
};

export const ContactsListScreen: FC<ContactsListScreenProps> = ({
  navigation,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // @ts-ignore
  const renderItem = ({item}) => (
    <ContactListItem contact={item} navigation={navigation} />
  );

  useEffect(() => {
    (async () => {
      let status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
        },
      );
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await Contacts.getAll();
        setContacts(result);
      }
    })();
  }, []);

  const onChange = async (text: string) => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === '' || text === null) {
      const result = await Contacts.getAll();
      setContacts(result);
    } else if (phoneNumberRegex.test(text)) {
      const result = await Contacts.getContactsByPhoneNumber(text);
      setContacts(result);
    } else if (emailAddressRegex.test(text)) {
      const result = await Contacts.getContactsByEmailAddress(text);
      setContacts(result);
    } else {
      const result = await Contacts.getContactsMatchingString(text);
      setContacts(result);
    }
  };

  const addNew = async () => {
    const contact = await Contacts.openContactForm({});
    if (contact) {
      setContacts([contact, ...contacts]);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onChange={onChange} />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.recordID}
      />
      <TouchableOpacity style={styles.button} onPress={addNew}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 64,
    width: 64,
    backgroundColor: 'blue',
    borderRadius: 64,
    position: 'absolute',
    bottom: 24,
    right: 24,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 36,
    fontWeight: '200',
  },
});
