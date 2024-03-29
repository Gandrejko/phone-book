import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ContactScreen} from '@src/screens/contact-screen';
import {ContactsListScreen} from '@src/screens/contacts-list-screen';
import React from 'react';
import {PermissionsAndroid, StatusBar, useColorScheme} from 'react-native';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS).then(
  async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
  },
);
function App() {
  const Stack = createStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator initialRouteName="ContactScreen List">
        <Stack.Screen name="Contact List" component={ContactsListScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
