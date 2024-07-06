import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    price: action.price,
                    qty: action.qty,
                    fragrance: action.fragrance,
                    image: action.image
                },
            ];
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            arr.find((product, index) => {
                if (product.id === action.id) {
                    arr[index] = { ...product, qty: parseInt(action.qty) + product.qty }
                }
                return arr
            })
            return arr
        case "UPDATE_QUANTITY":
            return state.map((product, index) =>
                index === action.index ? { ...product, qty: action.qty } : product
            );
        default:
            console.log('Error in Reducer');
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);