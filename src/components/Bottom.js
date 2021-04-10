import React from 'react';
import emailImg from 'images/email.png'
import gitImg from 'images/github_icon.png'
import './SignUp.css'




const Bottom = () => {
    return (
        <div className="custom-bottom">
            <div className="custom-bottom-contents">
                <div className="row">
                    <div className="col-4 col-xs-6 col-sm-8 col-lg-9"></div>
                    <div>
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/hjj1991"><img width="40px" src={gitImg} alt="github" /> github</a><br/>
                        <img width="40px" src={emailImg} alt="img" /> hjj19911@gmail.com                
                    </div>
                </div>
            </div>
            <div className="custom-bottom-copyrights">
                Copyrights (C) 황재정 2021. All rights reserved.
            </div>            
        </div>
    )
};

export default Bottom;