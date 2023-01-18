/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';

const Categories = ({ navigation, route }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setloading] = useState(true);


  const { item } = route.params;

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    await fetch(`https://fakestoreapi.com/products/category/${item}`)
      .then(response => response.json())
      .then(json => {
        setCategoryList(json);
      })
      .catch(error => {
        console.error(error);
      }).finally(() => { setloading(false); });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#e02a52',
          marginBottom: 5,
        }}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Category Screen</Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            resizeMode="contain"
            source={require('../assets/close.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>

      {loading ?
        (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={30} color='red' />
        </View>) : (
          <FlatList
            numColumns={2}
            data={categoryList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', { Id: item.id })
                  }
                  style={styles.listItem}>
                  <View style={styles.block}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.img}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.name}>
                    {item.title.length > 15
                      ? item.title.substring(0, 15)
                      : item.title}
                  </Text>
                  <Text style={styles.rate}>{item.price}</Text>
                </TouchableOpacity>
              );
            }}
          />)}
    </View>
  );
};

export default Categories;
const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    padding: 8,
    width: '47%',
    margin: 4,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  block: {
    padding: 4,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
  },
  rate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#24963f',
  },
});
