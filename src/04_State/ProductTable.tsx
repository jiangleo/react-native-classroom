import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import ProductRow from './ProductRow';

enum RequestStatus {
  IDLE = 'IDLE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
}

interface Product {
  name: string;
  price: string;
  id: string;
  count: number;
}

type Products = Product[];

export default function ProductTable() {
  const [products, setProducts] = useState<Products>([]);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.IDLE,
  );

  const total = products.reduce((sum, product) => {
    return sum + Number(product.price) * product.count;
  }, 0);

  useEffect(() => {
    setRequestStatus(RequestStatus.PENDING);

    fetch('https://61c48e65f1af4a0017d9966d.mockapi.io/products')
      .then(res => res.json())
      .then((products: Products) => {
        setRequestStatus(RequestStatus.SUCCESS);
        setProducts(products);
      })
      .catch(() => {
        setRequestStatus(RequestStatus.PENDING);
      });
  }, []);

  const getUpdatedProducts = (product: Product) => {
    const newProducts = [...products];

    for (let index = 0; index < products.length; index++) {
      if (products[index].id === product.id) {
        newProducts[index] = product;
      }
    }

    return newProducts;
  };

  const handleIncrement = (product: Product) => {
    console.log('handleIncrement', product);
    const newProduct: Product = {...product, count: product.count + 1};
    const newProducts: Products = getUpdatedProducts(newProduct);
    setProducts(newProducts);
  };

  const handleDecrement = (product: Product) => {
    const count = product.count - 1 >= 0 ? product.count - 1 : 0;
    const newProduct: Product = {...product, count: count};
    const newProducts: Products = getUpdatedProducts(newProduct);
    setProducts(newProducts);
  };

  if (requestStatus === RequestStatus.ERROR) {
    return <Text>网络出错了</Text>;
  }
  if (requestStatus === RequestStatus.PENDING) {
    return <Text>加载中...</Text>;
  }
  return (
    <View style={{marginTop: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 1, fontWeight: 'bold'}}>名称</Text>
        <Text style={{flex: 1, fontWeight: 'bold'}}>价格</Text>
        <Text style={{alignSelf: 'flex-end', fontWeight: 'bold'}}>数量</Text>
      </View>
      <View>
        {products.map(product => (
          <ProductRow
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            product={product}
            key={product.id}
          />
        ))}
      </View>
      <Text style={{marginTop: 30, fontWeight: 'bold'}}>总价:{total}</Text>
    </View>
  );
}
