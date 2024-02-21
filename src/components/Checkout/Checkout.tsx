import { connect } from "react-redux";
import { addItem, removeItem, deleteItem } from "../Redux/Actions";
import { RootState } from "../Redux/reducers";
import { DocumentCard, DocumentCardImage, DocumentCardTitle, DocumentCardDetails, DocumentCardType, ImageFit } from '@fluentui/react';
import { Input } from '@fluentui/react-input';
import "./Checkout.scss"
import React, { useState, useEffect } from 'react';
import Modal from "../Modal/Modal";
import { Link } from 'react-router-dom';

interface CartProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
}


const CheckOut: React.FC = ({ items, deleteItem }: any) => {
    const [modal, setModal] = useState(false);
    const [total, setTotal] = useState(0.00);

    const [email, setEmail] = useState<string>("");
    const [emailAgain, setEmailAgain] = useState<string>("");
    const [name, setName] = useState<string>("");

    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [validEmailAgain, setValidEmailAgain] = useState<boolean>(false);
    const [validName, setValidName] = useState<boolean>(false);

    const namePattern = /^[A-Za-z\s]+$/
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    useEffect(() => {
        calculateTotalAmount();
    })

    const calculateTotalAmount = () => {
        let totalAmount = 0.0;
        for (var i = 0; i < items.length; i++) {
            totalAmount = totalAmount + (items[i].quantity * items[i].price);
        }
        setTotal(totalAmount);
    }

    const getEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const getEmailAgain = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailAgain(event.target.value);
    }
    const getName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const validateName = () => {
        name.trim();
        const names = name.split(' ');
        if (namePattern.test(name) && names.length >= 2) {
            setValidName(true);
        }
        else if (!namePattern.test(name) && names.length < 2) {
            alert("Name contains numbers or special symbols and both - name and surname must be entered.");
        }
        else if (!namePattern.test(name)) {
            alert("Name contains numbers or special symbols.");
        }
        else {
            alert("Both - name and surname must be entered.");
        }
    }

    const validateEmail = () => {
        if (emailPattern.test(email)) {
            setValidEmail(true);

            if (email === emailAgain) {
                setValidEmailAgain(true);
            }
            else {
                alert("Email adreeses are not the same!");
            }
        }
        else {
            alert("Email is not valid!");
        }
    }

    const handleOrder = () => {
        if (validName && validEmail && validEmailAgain) {
            setModal(true);
        }
        else if (name === "" || email === "" || emailAgain === "") {
            alert("Fill all fields");
        }
    }

    const emptyCart = () => {
        for (var i = 0; i < items.length; i++) {
            deleteItem(items[i]);
        }
    }

    const hideModal = () => {
        setModal(false);
    }

    return (
        <div className="main-div">
            <Link to='/cart'><img className='back-arrow' src='/arrow-back.png' /></Link>
            <div className="checkout">
                {items.map((item: CartProduct) => (
                    <DocumentCard
                        className='document-card'
                        key={item.id}
                        type={DocumentCardType.normal}
                    >
                        <DocumentCardImage
                            height={200}
                            imageFit={ImageFit.contain}
                            imageSrc={item.imageUrl}
                        />
                        <DocumentCardDetails>
                            <DocumentCardTitle
                                title={item.title.length > 50 ? item.title.slice(0, 50) + '...' : item.title}
                            />
                        </DocumentCardDetails>
                        <DocumentCardDetails>
                            <div className="price">{item.quantity * item.price}€</div>
                        </DocumentCardDetails>
                    </DocumentCard>
                )
                )}
                <p className="total-cost">Total cost: <b>{total}€</b></p>
            </div>
            <div className="second-div">

                <hr className="hr-line"></hr>
                <form className="form-info">
                    <Input contentBefore="Name:" type="email" value={name} onChange={getName} onBlur={validateName} required></Input>
                    <Input contentBefore="Email:" type="email" value={email} onChange={getEmail} required></Input>
                    <Input contentBefore="Confirm Email:" type="email" value={emailAgain} onChange={getEmailAgain} onBlur={validateEmail} required></Input>

                </form>
                <button className="order-button" onClick={handleOrder}>Order</button>
                {modal &&
                    <Modal onOutsideClick={hideModal}>
                        <div className='choose-option'>
                            <span className="thank-you">Thank you for your order!</span><br />
                            <Link to='/'><button className='order-button' onClick={emptyCart}>Home page</button></Link>
                        </div>
                    </Modal>}
            </div>
        </div>

    );

};

const mapStateToProps = (state: RootState) => ({
    items: state.Reducer.items,
});

export default connect(mapStateToProps, { addItem, removeItem, deleteItem })(CheckOut);