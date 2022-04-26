import React from "react"

 const Banner = (props) =>{
    return <React.Fragment >
        <div className={props.className}>
        {props.children}
        </div>
    </React.Fragment>
};
export default Banner;