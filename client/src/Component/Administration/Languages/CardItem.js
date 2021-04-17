import React, { useState } from 'react';
import Inputchange from '../../UI/InputChange';
import useInput from '../../../hooks/useInput';
import Modal from '../../UI/Modal';
import Btn from '../../UI/Btn';
export default function CardItem({ item, natureOfElement, registerChange }) {
    const [modalIsOppen, setModalIsOppen] = useState(false);
    const { state, setstate, bind } = useInput({ ...item });
    const register = () => {
        registerChange(state, setModalIsOppen)
    }
    function closeTheModale() {
        setstate({ ...item });
        setModalIsOppen(false)
    }
    return (
        <div>
            <Modal
                isOpen={modalIsOppen}
                width="500"
                height="350"
                onClose={() => setModalIsOppen(false)}
            >
                <div className="modal_header has_border">
                    Modifier le {natureOfElement} {state.label}
                </div>
                <div className="modal_body">
                    <Inputchange
                        name='value'
                        label="Value"
                        width='50%'
                        value={state.value}
                        onChangeFunction={bind.onChange}
                    />
                    <Inputchange
                        name='label'
                        label="Label"
                        width='50%'
                        value={state.label}
                        onChangeFunction={bind.onChange}
                    />
                </div>
                <div className=" modal_footer modal_footer_center ">
                    <Btn
                        onClickFunction={closeTheModale}
                        message="Annuler"
                        color="alert"
                    />
                    <Btn
                        onClickFunction={() => register()}
                        message="Ok"
                    />
                </div>
            </Modal>
            <h2 onClick={() => setModalIsOppen(true)}>{item.value}</h2>

        </div>
    )
}
