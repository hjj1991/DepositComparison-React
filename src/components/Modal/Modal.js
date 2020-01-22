import React from 'react';
import { Link } from 'react-router-dom';
import './Modal.css';

const Modal = ({ isOpen, contents, isOk }) => {
    //console.log(isOk);
    return (
        <React.Fragment>
        {
        isOpen ?
        <React.Fragment>
            <div className="Modal-overlay" />
            <div className="Modal">
            <p className="title"></p>
            <div className="content">
                <p>
                {contents}
                </p>
            </div>
            <div className="button-wrap">
                <Link to="/board"><button>확인</button></Link>
            </div>
            </div>
        </React.Fragment>
        :
        null
        }
        </React.Fragment>
)
}
export default Modal;