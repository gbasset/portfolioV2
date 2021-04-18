import React, { useState } from 'react';
import Inputchange from '../../UI/InputChange';
import useInput from '../../../hooks/useInput';
import Modal from '../../UI/Modal';
import Btn from '../../UI/Btn';
import PopinConfirm from '../../UI/PopinConfirm';
export default function CardItem({ item, natureOfElement, registerChange, deleteElement }) {
    const [modalIsOppen, setModalIsOppen] = useState(false);
    const [confirmIsOpen, setcconfirmIsOpen] = useState(false);
    const { state, setstate, bind } = useInput({ ...item });
    const register = () => {
        registerChange(state, setModalIsOppen)
    }
    function closeTheModale() {
        setstate({ ...item });
        setModalIsOppen(false)
    }
    const deleteEl = () => {
        deleteElement(state, setcconfirmIsOpen)
    }
    return (
        <div>
            {confirmIsOpen &&
                <PopinConfirm
                    cancel={() => setcconfirmIsOpen(false)}
                    title={`Voullez vous vraiment supprimer ${state.value} ?`}
                >
                    <div className="btnCenter">
                        <Btn
                            onClickFunction={(e) => { setcconfirmIsOpen(false) }}
                            message="Annuler"
                            color="alert"
                            style="primary"
                        />
                        <Btn
                            onClickFunction={() => { deleteEl() }}
                            message="Supprimer"
                            color="success"
                            style="outline"
                        />
                    </div>
                </PopinConfirm>
            }
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
            <div onClick={() => setcconfirmIsOpen(true)}>Supprimer</div>
        </div>
    )
}
