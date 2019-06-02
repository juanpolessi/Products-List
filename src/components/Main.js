import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import { callFetchProducts, callCreateProduct } from '../ducks/Products';
import ModalCreateProduct from './modals/ModalCreateProduct';
import ProductsList from './ProductsList';
import SearchBox from './SearchBox';
import './Main.css';

const sortBy = require('sort-by');

const Main = ({ products, createProduct, fetchProducts }) => {
 
  const [query, setQuery] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [viewingProducts, setViewingProducts] = useState([]);
  const [isList, setIsList] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if(query && query.length) {
      setViewingProducts(
        products.data.filter(
          product => product.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
    else {
      setViewingProducts(products.data);
    }
  }, [products.data, query]);

  const handleProductCreate = productInfo => {
    setIsCreating(false);
    createProduct(productInfo);
  }

  return (
    <Fragment>
      <ModalCreateProduct
        onCancel={() => setIsCreating(false)}
        saveProduct={handleProductCreate}
        visible={isCreating}
      />
      <div className="app">
        <div className="appHeader">
          <div>
            <SearchBox
              onSearch={query => {
                setQuery(query);
              }} />
            <Button
              icon="user-add"
              loading={products.loading.create}
              onClick={() => setIsCreating(true)}>
              Create new
            </Button>  
          </div>        
          <div className="typeView">
            <Icon 
              type="unordered-list"
              style={{fontSize: '25px'}}
              onClick={() => setIsList(true)} />
            <Icon 
              type="appstore" 
              style={{fontSize: '25px'}}
              onClick={() => setIsList(false)} />
          </div>
        </div>
        <ProductsList
          products={viewingProducts.sort(sortBy('name', 'price'))}
          visible={isList} />
      </div>
    </Fragment>
  );
};

export default connect(
  ({ products }) => ({ products }),
  dispatch => ({
    fetchProducts() {
      dispatch(callFetchProducts());
    },
    createProduct(product) {
      dispatch(callCreateProduct(product));
    }
  })
)(Main);
