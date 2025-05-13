import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';

export default function TabLayout() {
  const checkForSimpleUpdate = async () =>{
     try {
    const update = await Updates.checkForUpdateAsync();
    console.log('Update available:', update);
    if (update.isAvailable) {
      Alert.alert('Update available:', update.isAvailable && 'Yes');
      await Updates.fetchUpdateAsync();
      Alert.alert(
        'Update Available',
        'Restart the app to apply the new version.',
        [{ text: 'Restart Now', onPress: () => Updates.reloadAsync() }]
      );
    }
  } catch (error) {
    console.warn('OTA update check failed:', error);
  }
  }

  useEffect(()=>{
    checkForSimpleUpdate()
  },[])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
       v{Constants.expoConfig?.version} - {Constants.expoConfig?.extra?.releaseChannel || 'default'}
      </Text>
    </View>
  );
}
