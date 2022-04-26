import React,{useContext} from "react";
import styles from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import CartContext from '../../../store/cart-context';
const MealItem = props =>{
    const cartCtx=useContext(CartContext);
    const addItemHandler = qty =>{

        cartCtx.addItem({
            id:props.id,
            amount:qty,
            name:props.name,
            price:props.price
        });

    }
    return (
    <li className={styles.meal}>
        <div>
            <h3 >{props.name}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>$ {props.price.toFixed(2)}</div>
        </div>
        <div>
            <MealItemForm onAddItem={addItemHandler} id={props.id}/>
        </div>
    </li>)
};
export default MealItem;