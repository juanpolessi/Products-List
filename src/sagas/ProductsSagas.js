import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { CALL_FETCH_PRODUCTS, fetchProductsSuccess, fetchProductsFailed, CALL_DELETE_PRODUCT, deleteProductFailed, deleteProductSuccess, CALL_EDIT_PRODUCT, editProductFailed, editProductSuccess, CALL_CREATE_PRODUCT, createProductFailed, createProductSuccess } from '../ducks/Products';
import ProductsAPI from '../integrations/ProductsAPI';

function* fetchProducts() {
  try {
    const products = yield call(ProductsAPI.fetchProducts);
    yield put(fetchProductsSuccess(products));
  }
  catch(error) {
    yield put(fetchProductsFailed(error));
  }
}

function* fetchProductsSagas() {
  yield takeLatest(CALL_FETCH_PRODUCTS, fetchProducts);
}

function* deleteProduct(action) {
  const { productId } = action;
  try {
    yield call(ProductsAPI.deleteProduct, productId);
    yield put(deleteProductSuccess(productId));
  }
  catch(error) {
    yield put(deleteProductFailed(productId, error));
  }
}

function* deleteProductSagas() {
  yield takeEvery(CALL_DELETE_PRODUCT, deleteProduct);
}

function* editProduct(action) {
  const { product } = action;
  try {
    const savedProduct = yield call(ProductsAPI.editProduct, product);
    yield put(editProductSuccess(savedProduct));
  }
  catch(error) {
    yield put(editProductFailed(product.id, error));
  }
}

function* editProductSagas() {
  yield takeEvery(CALL_EDIT_PRODUCT, editProduct);
}

function* createProduct(action) {
  const { product } = action;
  try {
    const savedProduct = yield call(ProductsAPI.createProduct, product);
    yield put(createProductSuccess(savedProduct));
  }
  catch(error) {
    yield put(createProductFailed(error));
  }
}

function* createProductSagas() {
  yield takeLatest(CALL_CREATE_PRODUCT, createProduct);
}

export default function*() {
  yield all([
    fork(fetchProductsSagas),
    fork(deleteProductSagas),
    fork(editProductSagas),
    fork(createProductSagas),
  ]);
}
