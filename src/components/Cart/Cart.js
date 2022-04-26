import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from  './CartItem'
import Checkout from './Checkout';
const Cart = props =>{
    const cartCtx = useContext(CartContext);
    const [isCheckoutChecked,setCheckoutChecked] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [isSubmitted,setIsSubmited] = useState(false);
    const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0 ;
    const cartItemRemoveHandler = id =>{
        cartCtx.removeItem(id)
    };
    const cartItemAddHandler = item =>{
        cartCtx.addItem({...item,amount:1})
    }
    const orderHandler = () =>{
        setCheckoutChecked(true);
    }

    const submitOrderHandler = async(userdata) =>{
        setIsSubmitting(true);
        await fetch(`${process.env.REACT_APP_FIREBASE_URL_ORDER}`,{
            method:'POST',
            body:JSON.stringify({ user:userdata,orderedItems:cartCtx.items})
        });
        setIsSubmitting(false);
        setIsSubmited(true);
        cartCtx.clearCart();
    }
    const modalActions = <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
    {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>
    const cartItems = <ul className={styles['cart-items']}>
    {cartCtx.items.map(item=><CartItem key={item.id} name={item.name} amount={item.amount} onAdd={cartItemAddHandler.bind(null,item)} onRemove={cartItemRemoveHandler.bind(null,item.id)} price={item.price}/>)}</ul>;
    const cartModalContent = <React.Fragment>
         {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {!isCheckoutChecked && modalActions }
            <div>
               {isCheckoutChecked && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart}/>}
            </div>
    </React.Fragment>
    const isSubmittingModalData = <p className={styles.orderSuccess}>Sending Order Data...</p>
    const isSubmittedModalData = <section>
        <p className={styles.orderSuccess}>Order Placed..</p>
        <div className={styles.actions}>
            <button type="button" onClick={props.onHideCart}>Close</button>   
        </div>
    </section>
    
    return(
        <Modal onHideBackdrop={props.onHideCart}>
           {!isSubmitting && !isSubmitted && cartModalContent}
           {isSubmitting && isSubmittingModalData }
           {!isSubmitting && isSubmitted && isSubmittedModalData}
        </Modal>
    )
};
export default Cart;