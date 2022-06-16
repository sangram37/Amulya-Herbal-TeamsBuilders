import React from 'react';
import {
  View,
  Text,
  Pressable,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import Colors from '../../Constants/Colors';

const {width, height} = Dimensions.get('screen');

const Button = ({children, ...props}) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

export const NoInternetModal = ({show, onRetry, isRetrying}) => (
  <Modal visible={show} style={{flex: 1}} transparent={true}>
    <View style={styles.modal}></View>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Connection Error</Text>
      <Text style={styles.modalText}>
        Oops! Looks like your device is not connected to the Internet.
      </Text>
      <Button onPress={onRetry} disabled={isRetrying}>
        Try Again
      </Button>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  // ...
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000',
    opacity: 0.3,
  },
  modalContainer: {
    position: 'relative',
    opacity: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
// inside <Users /> component
{
  /* <NoInternetModal
  show={isOffline}
  onRetry={fetchUsers}
  isRetrying={isLoading}
/>; */
}
