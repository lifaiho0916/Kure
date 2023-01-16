import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  render: false,
  all:[],
  promotions: [],
  accessories: [],
  apparel: [],
  cartridge: [],
  concentrate: [],
  edibles: [],
  flower: [],
  glass: [],
  hemp: [],
  preroll: [],
  seeds: [],
  tincture: [],
  topicals: [],
  productDetail: {}
};

const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    handleRenderPage(state, action) {
      state.render = action.payload.render;
    },
    handleViewProductDetail(state, action) {
      state.productDetail = action.payload;
    },
    getCategoryProduct(state, action) {
      state[action.payload.category] = action.payload.data;
    },
  }
});

export default products.reducer;

export const { handleRenderPage, handleViewProductDetail, getCategoryProduct } = products.actions;
