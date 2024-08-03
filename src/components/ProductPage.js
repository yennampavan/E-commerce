import React from 'react'
import { useParams } from 'react-router-dom'
import AddToCart from './AddToCart'
import './ProductPage.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const ProductPage = ({item}) => {
    const {id}=useParams()
    // const {id,imahe,title}=item
  return (
    <div>
      <div className='product-container'>
        <div className='product-image'>
        <img src={item.image} className="image" alt={item.title} />
        </div>
        <div className='product-description'>
        <h1><b>{item.title}</b></h1>
        <p className='item-description'>{item.description}</p>
        <p className='item-price'><span className='price-tag'>Price: </span>${item.price}</p>
        <p>(inclusive of all taxes)</p>
        
        <Stack className='rating' spacing={1}>
        <p>rating:</p>
      {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
      <Rating name="half-rating-read" defaultValue={item.rating.rate} precision={0.1} readOnly />
      <p>({item.rating.count})</p>
        </Stack>
        
        <div className='cart'>
        <AddToCart className='cart' product={item} />
        </div>
        </div>

        </div>
      product page
    </div>
  )
}

export default ProductPage
