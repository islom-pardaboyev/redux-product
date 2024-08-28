import { ACTIONS } from "./actions";

const initialState = {
  products: [],
  filteredProducts: [] 
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_DATA:
      return {
        ...state,
        products: [...action.payload],
        filteredProducts: [...action.payload], 
      };
    case ACTIONS.SEARCH:
      const filteredData = state.products.filter(item =>
        item.title.toLowerCase().includes(action.payload)
      );
      return {
        ...state,
        filteredProducts: filteredData, 
      };
    case ACTIONS.FILTER_BY_CATEGORY:
      if (action.payload === "") {
        return { ...state, filteredProducts: state.products, 
        };
      }
      const filteredByCategory = state.products.filter(
        item => item.category.name === action.payload
      );
      return {
        ...state,
        filteredProducts: filteredByCategory, 
      };
    default:
      return state;
  }
};