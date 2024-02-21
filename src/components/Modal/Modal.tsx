import React from 'react';
import "./Modal.scss";

export interface modalProps {
    children: React.ReactNode,
    visible?: boolean;
    onOutsideClick?: () => void;
}

export const Modal = ({ children, onOutsideClick, visible = true }: modalProps) => {

    const handleOutsideClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
        if (typeof onOutsideClick === "function" && (event.target as Element).className === "modal-container") {
            onOutsideClick();
        }
    }

    return (
        <div className='modal-container' onClick={handleOutsideClick}>
            <dialog className='modal'>
                {children}
            </dialog>
        </div>
    );
}

export default Modal;