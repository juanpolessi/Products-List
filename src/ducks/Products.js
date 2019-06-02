/* Action Types */
export const CALL_FETCH_PRODUCTS = 'CALL_FETCH_PRODUCTS';
export const FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const CALL_DELETE_PRODUCT = 'CALL_DELETE_PRODUCT';
export const DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const CALL_EDIT_PRODUCT = 'CALL_EDIT_PRODUCT';
export const EDIT_PRODUCT_FAILED = 'EDIT_PRODUCT_FAILED';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const CALL_CREATE_PRODUCT = 'CALL_CREATE_PRODUCT';
export const CREATE_PRODUCT_FAILED = 'CREATE_PRODUCT_FAILED';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';

/* Action Creators */
export function callFetchProducts() {
  return { type: CALL_FETCH_PRODUCTS };
}

export function fetchProductsFailed(error) {
  return { type: FETCH_PRODUCTS_FAILED, error };
}

export function fetchProductsSuccess(products) {
  return { type: FETCH_PRODUCTS_SUCCESS, products };
}

export function callDeleteProduct(productId) {
  return { type: CALL_DELETE_PRODUCT, productId };
}

export function deleteProductFailed(productId, error) {
  return { type: DELETE_PRODUCT_FAILED, productId, error };
}

export function deleteProductSuccess(productId) {
  return { type: DELETE_PRODUCT_SUCCESS, productId };
}

export function callEditProduct(product) {
  return { type: CALL_EDIT_PRODUCT, product };
}

export function editProductFailed(productId, error) {
  return { type: EDIT_PRODUCT_FAILED, productId, error };
}

export function editProductSuccess(product) {
  return { type: EDIT_PRODUCT_SUCCESS, product };
}

export function callCreateProduct(product) {
  return { type: CALL_CREATE_PRODUCT, product };
}

export function createProductFailed(error) {
  return { type: CREATE_PRODUCT_FAILED, error };
}

export function createProductSuccess(product) {
  return { type: CREATE_PRODUCT_SUCCESS, product };
}

/* Initial State */
const INITIAL_STATE = {
  data: [],
  error: {
    create: null,
    delete: [],
    edit: [],
    fetch: null
  },
  loading: {
    create: false,
    delete: [],
    edit: [],
    fetch: false
  }
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {

  const { productId, product, products, error, type } = action;

  switch(type) {
    case CALL_FETCH_PRODUCTS:
      return {
        ...state,
        error: {
          ...state.error,
          fetch: null
        },
        loading: {
          ...state.loading,
          fetch: true
        }
      };
    case FETCH_PRODUCTS_FAILED:
      return {
        ...state,
        error: {
          ...state.error,
          fetch: error
        },
        loading: {
          ...state.loading,
          fetch: false
        }
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: products,
        error: {
          ...state.error,
          fetch: null
        },
        loading: {
          ...state.loading,
          fetch: false
        }
      };
    case CALL_DELETE_PRODUCT:
      return {
        ...state,
        error: {
          ...state.error,
          delete: state.error.delete
                    .filter(productError => productError.productId !== productId)
        },
        loading: {
          ...state.loading,
          delete: state.loading.delete
                    .concat([productId])
        }
      };
    case DELETE_PRODUCT_FAILED:
      return {
        ...state,
        error: {
          ...state.error,
          delete: state.error.delete
                    .concat([{ productId, error }])
        },
        loading: {
          ...state.loading,
          delete: state.loading.delete
                    .filter(currentProductId => currentProductId !== productId)
        }
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: state.data.filter(product => product.id !== productId),
        error: {
          ...state.error,
          delete: state.error.delete
                    .filter(productError => productError.productId !== productId)
        },
        loading: {
          ...state.loading,
          delete: state.loading.delete
                    .filter(currentProductId => currentProductId !== productId)
        }
      };
    case CALL_EDIT_PRODUCT:
      return {
        ...state,
        error: {
          ...state.error,
          edit: state.error.edit
                  .filter(productError => productError.productId !== product.id)
        },
        loading: {
          ...state.loading,
          edit: state.loading.edit
                  .concat([product.id.toString()])
        }
      };
    case EDIT_PRODUCT_FAILED:
      return {
        ...state,
        error: {
          ...state.error,
          edit: state.error.edit
                  .concat([{ productId, error }])
        },
        loading: {
          ...state.loading,
          edit: state.loading.edit
                    .filter(currentProductId => currentProductId !== productId)
        }
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        data: state.data
                .filter(currentProduct => parseInt(currentProduct.id) !== parseInt(product.id))
                .concat([product]),
        error: {
          ...state.error,
          edit: state.error.edit
                  .filter(productError => productError.productId !== product.id)
        },
        loading: {
          ...state.loading,
          edit: state.loading.edit
                    .filter(currentProductId => currentProductId !== product.id)
        }
      };
    case CALL_CREATE_PRODUCT:
      return {
        ...state,
        error: {
          ...state.error,
          create: null
        },
        loading: {
          ...state.loading,
          create: true
        }
      };
    case CREATE_PRODUCT_FAILED:
      return {
        ...state,
        error: {
          ...state.error,
          create: error
        },
        loading: {
          ...state.loading,
          create: false
        }
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: state.data.concat([product]),
        error: {
          ...state.error,
          create: null
        },
        loading: {
          ...state.loading,
          create: false
        }
      };
    default:
      return state;
  }

}
