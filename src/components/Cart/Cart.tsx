import { connect } from "react-redux";
import { addItem, removeItem, deleteItem } from "../Redux/Actions";
import { RootState } from "../Redux/reducers";
import { DocumentCard, DocumentCardImage, DocumentCardTitle, DocumentCardDetails, DocumentCardType } from '@fluentui/react';
import { ImageFit } from '@fluentui/react';
import "./Cart.scss"
import { SpinButton } from '@fluentui/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface CartProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
}


const Cart: React.FC = ({ items, addItem, removeItem, deleteItem }: any) => {
    const [total, setTotal] = useState(0.00);
    const navigate = useNavigate();

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

    const handleIncrement = (product: CartProduct) => {
        const { quantity, ...strippedProduct } = product;
        addItem(strippedProduct, 1);
        calculateTotalAmount();
    }
    const handleDecrement = (product: CartProduct) => {
        const { quantity, ...strippedProduct } = product;
        removeItem(strippedProduct, 1);
        calculateTotalAmount();

    }
    const handleRemove = (product: CartProduct) => {
        const { quantity, ...strippedProduct } = product;
        deleteItem(strippedProduct);
        calculateTotalAmount();
    }

    if (items.length === 0) {
        return <div className="cart"><h1>Cart is empty</h1></div>
    } else {
        return (
            <div className="main-div">
                <button className="button-back" onClick={() => navigate(-1)}><img className='back-arrow' src='/arrow-back.png' /></button>
                <div className="cart">
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
                                <p className='price'>€{item.price}</p>
                            </DocumentCardDetails>
                            <DocumentCardDetails>
                                <div className="card-div"><button className="delete-button" onClick={() => handleRemove(item)}>X</button></div>
                                <div className="for-spin-button"><SpinButton value={item.quantity.toString()} onIncrement={() => handleIncrement(item)} onDecrement={() => handleDecrement(item)} /></div>
                            </DocumentCardDetails>
                        </DocumentCard>
                    )
                    )}
                </div>
                <div className="checkout-div">
                    <hr className="hr-line"></hr>
                    <h2>Total cost: </h2>
                    <h1>{total}€</h1>
                    <Link to='/checkout'><button className="checkout-button">CheckOut</button></Link>
                </div>
            </div>
        );
    }

};

const mapStateToProps = (state: RootState) => ({
    items: state.Reducer.items,
});

export default connect(mapStateToProps, { addItem, removeItem, deleteItem })(Cart);