import { Type } from "./action.type";

export const initialState = {
  basket: [],
  user: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        // Add new item with amount = 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        // Increment amount of existing item
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return {
          ...state,
          basket: updatedBasket,
        };
      }
    }

    case Type.REMOVE_FROM_BASKET: {
      const target = state.basket.find((item) => item.id === action.id);
      if (!target) return state; // nothing to remove

      if (target.amount > 1) {
        // Decrement amount
        const updatedBasket = state.basket.map((item) =>
          item.id === action.id ? { ...item, amount: item.amount - 1 } : item
        );
        return {
          ...state,
          basket: updatedBasket,
        };
      } else {
        // Remove item completely
        return {
          ...state,
          basket: state.basket.filter((item) => item.id !== action.id),
        };
      }
    }

    case Type.CLEAR_BASKET:
      return {
        ...state,
        basket: [],
      };
      case Type.SET_USER:
        return {
        ...state,
        user:action.user
        }

    default:
      return state;
  }
};
