import styles from './Checkout.module.css';

import React,{useRef, useState} from 'react';
const isEmpty = (value) => value.trim()==="";
const isSixDigit = (value)=>value.trim().length !==6;

const Checkout = (props) =>{
    const [formValidity,setFormValidity] = useState({
        name:true,
        postal:true,
        street:true,
        city:true
    })
    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalInputRef=useRef();
    const cityInputRef=useRef();
    const submitHandler = (event)=>{
        event.preventDefault();
        const enteredName =  nameInputRef.current.value;
        const enteredStreet =  streetInputRef.current.value;
        const enteredPostal =  postalInputRef.current.value;
        const enteredCity =  cityInputRef.current.value;
        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalIsValid = !isSixDigit(enteredPostal);
        const cityIsValid = !isEmpty(enteredCity);
        setFormValidity({
            name:nameIsValid,
            city:cityIsValid,
            postal:postalIsValid,
            street:streetIsValid
        })
        const formIsValid=nameIsValid && streetIsValid && postalIsValid && cityIsValid;
        if(!formIsValid){

            return;
        }
        const userData ={
            name:enteredName,
            city:enteredCity,
            postalCode:enteredPostal,
            street:enteredStreet
        }
        props.onConfirm(userData)
    }
    return(<form className={styles.form} onSubmit={submitHandler}>
        <div className={`${styles.control} ${formValidity.name ? '': styles.invalid}` }>
            <label htmlFor='name'>Your name</label>
            <input type="text" id="name" ref={nameInputRef}/>
            {!formValidity.name && <p>Please Enter your name</p>}
        </div>
        <div className={`${styles.control} ${formValidity.street ? '': styles.invalid}` }>
            <label htmlFor='street'>Street</label>
            <input type="text" id="street" ref={streetInputRef}/>
            {!formValidity.street && <p>Please Enter your Street</p>}
        </div>
        <div className={`${styles.control} ${formValidity.postal ? '': styles.invalid}` }>
            <label htmlFor='postal'>Postal Code</label>
            <input type="text" id="postal" ref={postalInputRef}/>
            {!formValidity.postal && <p>Please enter a valid postal Code(6 Digit)</p>}
        </div>
        <div className={`${styles.control} ${formValidity.city ? '': styles.invalid}` }>
            <label htmlFor='city'>City</label>
            <input type="text" id="city"ref={cityInputRef}/>
            {!formValidity.city && <p>Please Enter your City</p>}
        </div>
        <div className={styles.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button className={styles.submit}>Confirm</button>
        </div>
    </form>
    )
};
export default Checkout;