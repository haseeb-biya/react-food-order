import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartItems = {
    items:[],
    totalAmount:0

}
const cartReducer = (state,action) =>{
    switch(action.type){
        case 'ADD_ITEM':
            const UpdatedPrice = state.totalAmount + action.payload.price * action.payload.amount;
            const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            const existingItem = state.items[existingItemIndex];
            let UpdatedItems;
            if(existingItem){
                const UpdatedItem = {
                    ...existingItem,
                    amount:existingItem.amount + action.payload.amount
                };
                UpdatedItems=[...state.items];
                UpdatedItems[existingItemIndex]= UpdatedItem;
            }else{
                UpdatedItems = state.items.concat(action.payload);
            }
            return ({
                items:UpdatedItems,
                totalAmount:UpdatedPrice
            });
        case 'REMOVE_ITEM':
            const existingItemToBeRemovedIndex = state.items.findIndex((item) => item.id === action.payload);
            const existingItemToBeRemoved = state.items[existingItemToBeRemovedIndex];
            const updatedAmount = state.totalAmount - existingItemToBeRemoved.price;
            let UpdatedItemsAfterRemove;
            if(existingItemToBeRemoved.amount===1){
                UpdatedItemsAfterRemove= state.items.filter(item=> item.id !== action.payload);
            }else{
                const updatedItem ={...existingItemToBeRemoved,amount:existingItemToBeRemoved.amount-1};
                UpdatedItemsAfterRemove = [...state.items];
                UpdatedItemsAfterRemove[existingItemToBeRemovedIndex] = updatedItem;
            }
            return ({
                items:UpdatedItemsAfterRemove,
                totalAmount:updatedAmount
            });
        case 'CLEAR':
            return defaultCartItems;
        default:
            return defaultCartItems;
    }
}

const CartProvider = props=>{

    const [cartState,dispatchCartActions]=useReducer(cartReducer,defaultCartItems);
    const addItemsInCart = item =>{
        dispatchCartActions({type:'ADD_ITEM',payload:item});
    }
    const removeItemsFromCart = id =>{
        dispatchCartActions({type:'REMOVE_ITEM',payload:id});
    }
    const clearCartHandler = () =>{
        dispatchCartActions({type:'CLEAR'});
    }
    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemsInCart,
        removeItem:removeItemsFromCart,
        clearCart:clearCartHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};
export default CartProvider;