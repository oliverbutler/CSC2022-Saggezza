import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const DATA = [
  {
    'id': '1',
    'name': 'Trip to Sunderland',
    'date': '12/11/2019',
    'status': 'pending',

  },
  {
    'id': '2',
    'name': 'Trip to London',
    'date': '09/11/2019',
    'status': 'approved',
  },
  {
    'id': '3',
    'name': 'Trip to Manchester',
    'date': '09/11/2019',
    'status': 'denied',
  },
  {
    'id': '4',
    'name': 'Trip to Sunderland',
    'date': '12/11/2019',
    'status': 'pending',
  },
  {
    'id': '5',
    'name': 'Trip to London',
    'date': '09/11/2019',
    'status': 'approved',
  },
  {
    'id': '6',
    'name': 'Trip to Manchester',
    'date': '09/11/2019',
    'status': 'denied',
  },
  {
    'id': '7',
    'name': 'Trip to London',
    'date':  '09/11/2019',
    'status': 'approved',
  },
  {
    'id': '8 ',
    'name': 'Trip to Manchester',
    'date': '09/11/2019',
    'status': 'denied',
  },
  {
    'id': '9',
    'name': 'Trip to Sunderland',
    'date': '12/11/2019',
    'status': 'pending',
  },
  {
    'id': '10',
    'name': 'Trip to London',
    'date': '09/11/2019',
    'status': 'approved',
  },
  {
    'id': '11',
    'name': 'Trip to Manchester',
    'date': '09/11/2019',
    'status': 'denied',
  },
];

function onSelect(id) {
  console.log(id + ' pressed');
}

function Capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function RequestItem({ data, selected }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(data.id)}
      style={[
        styles.request,
        { backgroundColor: selected ? '#595959' : '#555555' }
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.text}>Name: {data.name}</Text>
          <Text style={styles.text}>Date: {data.date}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={[
            (data.status == 'approved') ? styles.green : styles.text, 
            (data.status == 'denied') ? styles.red : '']}
          >
            {Capitalize(data.status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Request = () => (
  <View style={styles.container}>
    <View style={{alignSelf: 'center'}}>
      <Text style={styles.title}>Request Page</Text>
    </View>
    <View styles={{alignSelf: 'stretch'}}>
      <FlatList 
        data={DATA} 
        renderItem={({ item }) => (<RequestItem data={item}/>)}
        keyExtractor={item => item.id}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  request: {  
    padding: 15,
    margin: 5,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#2F2F2F',
    paddingTop: 50
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  text: {
    color: 'white',
  },
  red: {
    color: 'red',
  },
  green: {
    color: '#91D000',
  },
});