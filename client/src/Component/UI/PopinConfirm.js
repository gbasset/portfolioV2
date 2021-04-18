import React from 'react'
import './PopinConfirm.css'
export default function PopinConfirm(props) {
    return (
        <div className="containerConfirmPopin">
            <div className="confirmOverlay" onClick={() => props.cancel()}></div>
            <div className="contenuPopin">
                <div className="btn-closePopin" onClick={() => props.cancel()}>Close <i className="fas fa-times"></i></div>
                <div className="textContentPopin">
                    <p className="titlePopin">{props.title}</p>
                    {props.message ? (
                        <p className="textPopin">{props.message}</p>
                    ) : null}
                </div>
                <div>
                    <div className='btn_group_l'>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}