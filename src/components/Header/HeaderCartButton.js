import React,{Fragment, useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context'
import styles from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const {items} =cartCtx;
    const [highlighted,sethighlighted]=useState(false);
    const noOfCartItems = cartCtx.items.reduce((currNumber,item)=>{
        return currNumber+item.amount;
    },0);
    const btnClasses = `${styles.button} ${highlighted ? styles.bump:''}`;

    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        sethighlighted(true);
        const timer = setTimeout(()=>{
            sethighlighted(false);
        },300)
        return ()=>{
            clearTimeout(timer);
        }
    },[items])

return (
    <Fragment>
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}><CartIcon/></span>
            <span> Your Cart</span>
            <span className={styles.badge}>{noOfCartItems}</span>
        </button>
    </Fragment>
    )
};
export default HeaderCartButton;