import React from "react";
import spinner from "../assets/spinner6.svg"

function Loader(){
    return <div className="loader-modal-bg-color">
            <div className="">
                <img src={spinner} alt="loading ..." />
            </div>
        </div>
}

export default Loader;

