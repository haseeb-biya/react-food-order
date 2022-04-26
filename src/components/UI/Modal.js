import React, { Fragment } from 'react'
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
const BackDrop = props =>{
    return (<div onClick={props.onCloseBackdrop} className={styles.backdrop}/>)
}
const ModalOverlay = props =>{
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}
const Modal = props =>{
   
    return <Fragment>
         {ReactDOM.createPortal(<BackDrop onCloseBackdrop={props.onHideBackdrop}/>,document.getElementById('overlays'))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlays'))}
    </Fragment>
};
export default Modal;