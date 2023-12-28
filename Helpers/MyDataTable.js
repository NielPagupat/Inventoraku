import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { DataTable, TextInput } from 'react-native-paper';

export default function MyDataTable({ products, email }) {
    if (!Array.isArray(products)) {
        return null; // or return an empty view or loading indicator
      }
    
      // Check if products array is empty
      if (products.length === 0) {
        return null; // or return an empty view or loading indicator
      }

      const navigation = useNavigation()
    
      const chkProductInfo = (product) => {
          navigation.navigate('productInfo', {product, email})
      }


return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Product ID</DataTable.Title>
          <DataTable.Title>Product Name</DataTable.Title>
          <DataTable.Title>Retail Price</DataTable.Title>
          <DataTable.Title>Stock</DataTable.Title>
        </DataTable.Header>

        {products.map(product => (
          <TouchableOpacity key={product.product_id} onPress={()=>{chkProductInfo(product)}}>
            <DataTable.Row key={product.product_id}>
              <DataTable.Cell>{product.product_id}</DataTable.Cell>
              <DataTable.Cell>{product.product_name}</DataTable.Cell>
              <DataTable.Cell>{product.retail_price}</DataTable.Cell>
              <DataTable.Cell>{product.stock}</DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        ))}
      </DataTable>
    </ScrollView>
  )
}