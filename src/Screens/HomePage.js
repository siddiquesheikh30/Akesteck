/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';

const HomePage = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCat, setloadingCat] = useState(true);
  const [loadingProd, setloadingProd] = useState(true);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState(false);
  const [activesort, setactivesort] = useState(false);

  const [productLimit, setProductLimit] = useState(6);

  useEffect(() => {
    GetCategories();
    GetProducts(productLimit);
  }, []);

  const GetCategories = async () => {
    await fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(json => {
        setCategories(json);
      })
      .catch(error => {
        console.error(error);
      }).finally(() => { setloadingCat(false); });
  };

  const GetProducts = async productLimit => {
    setactivesort(false);
    if (productLimit == 0) {
      await fetch(`https://fakestoreapi.com/products`)
        .then(response => response.json())
        .then(json => {
          setProducts(json);
        })
        .catch(error => {
          console.error(error);
        }).finally(() => { setloadingProd(false); });
    } else {
      await fetch(`https://fakestoreapi.com/products?limit=${productLimit}`)
        .then(response => response.json())
        .then(json => {
          setProducts(json);
        })
        .catch(error => {
          console.error(error);
        }).finally(() => { setloadingProd(false); });
    }
  };

  const handleSort = async productLimit => {
    setactivesort(true);
    if (productLimit == 0) {
      await fetch(`https://fakestoreapi.com/products?sort=desc`)
        .then(response => response.json())
        .then(json => {
          setProducts(json);
        })
        .catch(error => {
          console.error(error);
        }).finally(() => { setloadingProd(false); });
    } else {
      await fetch(`https://fakestoreapi.com/products?limit=${productLimit}&sort=desc`)
        .then(response => response.json())
        .then(json => {
          setProducts(json);
        })
        .catch(error => {
          console.error(error);
        }).finally(() => { setloadingProd(false); });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          padding: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ color: 'red', fontSize: 16, fontWeight: '500' }}>Akestec</Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'red',
            padding: 3,
            borderRadius: 8,
          }}
          onPress={() => setSort(true)}>
          <Text>Sort</Text>
          <Image
            resizeMode="contain"
            source={require('../assets/sort.png')}
            style={{ width: 20, height: 15 }}
          />
        </TouchableOpacity>
        {sort ? (
          <View
            style={{
              padding: 8,
              backgroundColor: '#fff',
              elevation: 8,
              borderRadius: 8,
              position: 'absolute',
              right: 8,
              top: 40,
              zIndex: 100,
              width: '35%',
            }}>
            <TouchableOpacity
              onPress={() => { setloadingProd(true); GetProducts(); setSort(false); }}
              style={{ marginVertical: 4, padding: 5 }}>
              <Text style={{ color: !activesort ? 'red' : '#000' }}>
                New to Old
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setloadingProd(true); handleSort(productLimit); setSort(false); }}
              style={{ marginVertical: 4, padding: 5 }}>
              <Text style={{ color: activesort ? 'red' : '#000' }}>
                Old to New
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 25,
          elevation: 8,
          marginHorizontal: 10,
          marginBottom: 5,
          padding: 8,
          zIndex: -1,
        }}>



        {loadingCat ? (<View style={{ justifyContent: 'center', width: '100%' }}><ActivityIndicator size={30} color='red' /></View>) : categories.map(item => {
          return (
            <TouchableOpacity key={item}
              onPress={() => navigation.navigate('Categories', { item: item })}
              style={{ alignItems: 'center' }}>
              <Text style={styles.title}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            backgroundColor: '#e02a52',
            width: '100%',
            height: 40,
            alignSelf: 'center',
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 10,
              color: '#fff',
            }}>
            Featured Products
          </Text>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => {
              setloadingProd(true);
              setProductLimit(0);
              GetProducts(0);
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        {loadingProd ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size={30} color='red' /></View>) : (<FlatList
          numColumns={2}
          data={products}
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
                    ? item.title.substring(0, 15) + '...'
                    : item.title}
                </Text>
                <Text style={styles.rate}>$ {item.price}</Text>
              </TouchableOpacity>
            );
          }}
        />)}

      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 700,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 15,
    width: 70,
    paddingVertical: 10,
    height: 50,
    textTransform: 'capitalize',
  },
  listItem: {
    alignItems: 'center',
    width: '48%',
    margin: 3,
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
