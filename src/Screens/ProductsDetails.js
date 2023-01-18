/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

//import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const ProductDetails = ({ route, navigation }) => {
  const { Id } = route.params;

  const [productDetails, setProductDetails] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    GetProductDetails();
  }, []);

  const GetProductDetails = async () => {
    await fetch(`https://fakestoreapi.com/products/${Id}`)
      .then(response => response.json())
      .then(json => {
        setProductDetails(json);
      })
      .catch(error => {
        console.error(error);
      }).finally(() => { setloading(false); });
  };

  return (
    <View style={styles.container}>
      {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} color='red' />
      </View>) : (<View>
        <View style={{ width: '100%', height: 320, padding: 20 }}>
          <Image
            source={{ uri: productDetails.image }}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 30,
          }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
            {productDetails.title}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#24963f' }}>
            {productDetails.price}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <Text
            style={{
              color: '#000',
              fontSize: 15,
              fontWeight: '300',
              textTransform: 'capitalize',
            }}>
            {productDetails.description}
          </Text>
        </View>
      </View>)}


      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginBtn: {
    position: 'absolute',
    bottom: 0,
    marginVertical: 30,
    backgroundColor: '#4285f4',
    height: 50,
    borderRadius: 25,
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loginBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default ProductDetails;
