import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Modal } from 'antd';

const FormItem = Form.Item;

const ModalCreateProduct = ({ form, onCancel, visible, saveProduct }) => {

  const { getFieldDecorator, resetFields, validateFields } = form;

  const handleFormSubmit = () => {
    validateFields((err, values) => {
      if(!err) {
        saveProduct(values);
        resetFields();
      }
    });
  }

  return (
    <Modal
      title="Create Product"
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
            rules: [{ required: true, message: 'Please input the product price!' }],
          })(
            <Input placeholder="price" />
          )}
        </FormItem>
      </Form>
    </Modal>
  );

}

ModalCreateProduct.propTypes = {
  onCancel: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Form.create()(ModalCreateProduct);
