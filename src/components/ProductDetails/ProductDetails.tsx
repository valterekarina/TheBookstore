import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../../data/book.json';
import './ProductDetails.scss';
import { SpinButton } from '@fluentui/react';
import Modal from "../Modal/Modal";
import { Link } from 'react-router-dom'
import { addItem } from '../Redux/Actions';
import { RootState } from '../Redux/reducers';
import { connect } from "react-redux"
interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductDetails: React.FC = ({ items, addItem }: any) => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    //const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [amount, setAmount] = useState(1)

    useEffect(() => {
        console.log(productId);
        if (productId != undefined) {
            const foundProduct = productsData.find(
                (p: Product) => p.id === parseInt(productId, 10)
            );
            setProduct(foundProduct || null)
        }
    }, [productId]);

    const handleAddToCart = () => {
        setModal(true);
        if (product != null) {
            addItem(product, amount)

        }
    };

    const hideModal = () => {
        setModal(false);
    }

    const handleIncrement = () => {
        setAmount(amount + 1)
    }
    const handleDecrement = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    if (!product) {
        return <div>Product not found</div>
    } else {
        return (
            <div>
                <h1 className='book-title'>{product.title}</h1>
                <div className='product-details-shown'>
                    <img src={product.imageUrl} className='book-image'></img>
                    <p className='description'>{product.description}</p>
                    <div className='for-price'>
                        Price: €{product.price}
                    </div>
                    <div className='for-spin-button'>
                        Amount:
                        <SpinButton value={amount.toString()} onIncrement={handleIncrement} onDecrement={handleDecrement} />
                    </div>
                    <button className='add-to-cart' onClick={handleAddToCart}>Add to cart</button>
                    {modal &&
                        <Modal onOutsideClick={hideModal}>
                            <div>
                                <button onClick={hideModal} className='close-modal-button'>X</button>
                            </div>
                            <div className='choose-option'>
                                <Link to='/cart'><button className='choose-option-buttons' >Go to cart</button></Link>
                                <Link to='/'><button className='choose-option-buttons' >Continue to shop</button></Link>
                            </div>
                        </Modal>
                    }
                </div>
            </div>
        );
    }
};
const mapStateToProps = (state: RootState) => ({
    items: state.Reducer.items,
});

export default connect(mapStateToProps, { addItem })(ProductDetails);
