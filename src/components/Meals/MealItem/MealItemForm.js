import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css'
const MealItemForm = props =>{
    const amountRef = useRef();
    const[qtyIsValid,setQtyIsValid]=useState(true);
    const formSubmitHandler = event =>{
        event.preventDefault();
        const enteredQty = amountRef.current.value;
        const enteredQtyAmount = +enteredQty;
        if(enteredQtyAmount < 1 || enteredQty.trim().length === 0 || enteredQtyAmount > 5){
            setQtyIsValid(false)
            return;
        }
        props.onAddItem(enteredQtyAmount);
    }
    return (
        <form className={styles.form} onSubmit={formSubmitHandler}>
            <Input  ref={amountRef} label="Qty" input={{
                id:"Qty_"+props.id,
                type:"number",
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }}/>
            <button>+ Add</button>
            {!qtyIsValid && <p>Please entered a valid amount</p>}
        </form>
    )
};
export default MealItemForm;