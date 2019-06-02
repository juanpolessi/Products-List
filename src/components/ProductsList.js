import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Skeleton, Avatar, Icon, Spin } from 'antd';
import { callDeleteProduct, callEditProduct } from '../ducks/Products';
import ModalEditProduct from './modals/ModalEditProduct';
import ProductsListItem from './ProductsListItem';
import './ProductsList.css';

const ProductsList = ({ products, visible, deleteProduct, editProduct, loading }) => {

  const [editing, setEditing] = useState(null);

  const handleProductEdit = productInfo => {
    const productId = editing;
    setEditing(null);
    editProduct({ id: productId, ...productInfo });
  };

  return (
    <Fragment>
      <ModalEditProduct
        productId={editing}
        onCancel={() => setEditing(null)}
        saveProduct={handleProductEdit}
        visible={Boolean(editing)}
        />
      <List
        className="products-list"
        loading={loading.fetch}
        style={{display: !visible ? 'block' : 'none'}}>
        {
          products.map(product =>
            <ProductsListItem
              deleteProduct={() => deleteProduct(product.id)}
              editProduct={() => setEditing(parseInt(product.id))}
              loading={{
                edit: loading.edit.includes(product.id),
                delete: loading.delete.includes(product.id)
              }}
              key={product.id}
              {...product} />
          )
        }
      </List>

      <List
        className="demo-loadmore-list"
        loading={loading.fetch}
        itemLayout="horizontal"
        dataSource={products}
        style={{display: visible ? 'block' : 'none'}}
        renderItem={item => (
          <List.Item actions={[
            <Spin onClick={() => setEditing(parseInt(item.id))} size="small" spinning={loading.edit.includes(item.id)}>
              <Icon type="edit" />
            </Spin>,
            <Spin onClick={() => deleteProduct(item.id)} size="small" spinning={loading.delete.includes(item.id)}>
              <Icon type="delete"/>
            </Spin>
          ]}>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.image}/>
                }
                title={item.name}
                description={item.price}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Fragment>
  );

};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({

    })
  ).isRequired
};

export default connect(
  ({ products }) => ({ loading: products.loading }),
  dispatch => ({
    deleteProduct(productId) {
      dispatch(callDeleteProduct(productId));
    },
    editProduct(product) {
      dispatch(callEditProduct(product));
    }
  })
)(ProductsList);
