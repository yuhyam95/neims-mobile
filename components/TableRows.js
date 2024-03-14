import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BinCard from './BinCard';



function TableRows({ name, quantity, reason, date, category, expiryDate, bincard }) {
  
const [modalVisible, setModalVisible] = useState(false);

const handleClick = () => {
  setModalVisible(true)
}

  return (
    <>
  <TouchableOpacity style={styles.row} onPress={handleClick}>
      <View style={styles.cell}>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.cell}>
        <View style={styles.quantityBox}>
          <Text style={styles.text}>{quantity}</Text>
        </View>
      </View>
      {/* <View style={styles.cell}>
        <View style={[styles.reasonBox, { backgroundColor: reason === 'restock' ? '#BAF2E0' : '#FBD8D8' }]}>
          <Text style={{ color: reason === 'restock' ? '#2FD197' : '#EB4547', fontSize: 13 }}>
            {reason === 'restock' ? 'RESTOCK' : 'DISTRIBUTION'}
          </Text>
        </View>
      </View> */}
      <View style={styles.cell}><Text style={styles.text}>{category}</Text></View>
      <View style={styles.cell}><Text style={styles.text}>{date}</Text></View>
      <View style={styles.cell}><Text style={styles.text}>{expiryDate}</Text></View>
    </TouchableOpacity>

    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {setModalVisible(!modalVisible)}}>
          <Text style={styles.textStyle}>X</Text>
        </Pressable>
        <BinCard bincard={bincard}/>
      </View>
    </View>
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  text:{
    fontSize: 13
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBox: {
    borderWidth: 0.5,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reasonBox: {
    borderWidth: 0.5,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'teal',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    color: 'black'
  },
  buttonClose: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default TableRows;
