import React from "react";
import {Link} from 'react-router-dom'
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className='my-3 py-3 rounded shadow'>
      <Link to={`/product/${product.slug}`}>
        <Card.Img variant='top' src={product.image} />
      </Link> 
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        
        <Card.Text as='h3'> ₹ {product.price.base}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
