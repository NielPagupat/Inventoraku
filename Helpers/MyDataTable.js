import React from 'react';
import { View, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function MyDataTable({ products }) {
    if (!Array.isArray(products)) {
        return null; // or return an empty view or loading indicator
      }
    
      // Check if products array is empty
      if (products.length === 0) {
        return null; // or return an empty view or loading indicator
      }
  
return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Product ID</DataTable.Title>
          <DataTable.Title>Product Name</DataTable.Title>
          <DataTable.Title>Capital Price</DataTable.Title>
          <DataTable.Title>Retail Price</DataTable.Title>
          <DataTable.Title>Stock</DataTable.Title>
        </DataTable.Header>

        {products.map(product => (
          <DataTable.Row key={product.product_id}>
            <DataTable.Cell>{product.product_id}</DataTable.Cell>
            <DataTable.Cell>{product.product_name}</DataTable.Cell>
            <DataTable.Cell>{product.capital_price}</DataTable.Cell>
            <DataTable.Cell>{product.retail_price}</DataTable.Cell>
            <DataTable.Cell>{product.stock}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  )
}