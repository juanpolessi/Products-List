import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Form, Modal } from 'antd';

const FormItem = Form.Item;

const ModalEditProduct = ({ products, productId, form, onCancel, visible, saveProduct }) => {

  const { getFieldDecorator, setFieldsValue, validateFields } = form;

  const handleFormSubmit = () => {
    validateFields((err, values) => {
      if(!err) {
        saveProduct(values);
      }
    });
  }

  const product = products
                    .find(product => parseInt(product.id) === productId);

  useEffect(() => {
    if(product) {
      setFieldsValue({
        name: product.name,
        price: product.price
      });
    }
  }, [product, setFieldsValue]);

  return (
    <Modal
      title="Edit Product"
      visible={visible}
      onOk={handleFormSubmit}
      onCancel={onCancel}
    >
      <Form>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input the product name!' }],
          })(
            <Input placeholder="Name" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('price', {
            rules: [{ required: true, message: 'Please input the product Price!' }],
          })(
            <Input placeholder="Price" />
          )}
        </FormItem>
      </Form>
    </Modal>
  );

}

ModalEditProduct.propTypes = {
  productId: PropTypes.number,
  onCancel: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Form.create()(
  connect(
    ({ products }) => ({ products: products.data })
  )(ModalEditProduct)
);
