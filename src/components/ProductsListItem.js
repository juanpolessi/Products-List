import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Icon, Spin } from 'antd';
import './ProductsListItem.css';

const { Meta } = Card;

const ProductsListItem = ({ image, deleteProduct, editProduct, loading, name, price }) => (
  <Card
    hoverable
    style={{ width: 240, marginTop: 16, marginLeft: 5, marginRight: 5 }}
    actions={[
      <Spin onClick={deleteProduct} size="small" spinning={loading.delete}>
        <Icon type="delete"/>
      </Spin>,
      <Spin onClick={editProduct} size="small" spinning={loading.edit}>
        <Icon type="edit" />
      </Spin>
    ]}
    cover={<img alt="example" style={{width:238, height: 178.5}} src={image} />}
  >
    <Meta title={name} description={`R$${price}`}/>
  </Card>
);

ProductsListItem.propTypes = {
  image: PropTypes.string.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  loading: PropTypes.shape({
    delete: PropTypes.bool.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default ProductsListItem;
