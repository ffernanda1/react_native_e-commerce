import { StatusBar } from 'expo-status-bar';
import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackNagivator from './navigation/StackNagivator';

export default function App() {
  return (
    <Fragment>
      <StackNagivator />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
