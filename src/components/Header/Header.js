import React from "react";
import Banner from "../Banner/Banner";
import mealsImage from '../../assets/meals.jpg';
import styles from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";
const Header = props =>{

    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <Banner className={styles['main-image']}>
                <img  src={mealsImage} alt="Banner_image"/>
            </Banner>
        </React.Fragment>
    )
};
export default Header;