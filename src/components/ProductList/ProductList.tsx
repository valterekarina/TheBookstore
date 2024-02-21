import React, { useState, useEffect } from 'react';
import productsData from '../../data/book.json';
import { DocumentCard, DocumentCardImage, DocumentCardTitle, DocumentCardDetails, DocumentCardType } from '@fluentui/react';
import { ImageFit } from '@fluentui/react';
import './ProductList.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const getData = () => {
    setTimeout(() => {
      setProducts([...products, ...productsData])
    }, 2000);
  }

  const handleOpenDetails = (productId: number) => {
    <Link to={'/product/${productId}'} key={productId}></Link>
  };

  return (
    <div className="product-list">

      <InfiniteScroll
        dataLength={products.length}
        next={getData}
        hasMore={true}
        loader={<h4 className='loading'>Loading...</h4>}
      >

        {products.map((product) => (
          <Link to={'/product/' + product.id} key={product.id} className='link'>
            <DocumentCard
              className='document-card'
              key={product.id}
              type={DocumentCardType.normal}
              onClick={() => handleOpenDetails(product.id)}
            >
              <DocumentCardImage
                imageFit={ImageFit.contain}
                imageSrc={product.imageUrl}
              />
              <DocumentCardDetails className='card-details'>
                <DocumentCardTitle
                  title={product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title}
                />
                <p className='price'>Price: €{product.price}</p>
              </DocumentCardDetails>
            </DocumentCard>
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ProductList;