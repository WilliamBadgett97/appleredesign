import React from 'react'
import Image from 'next/image';
import {urlFor} from '../sanity'
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/basketSlice';
import toast from 'react-hot-toast'

interface Props {
    product: Product;
}

function Product({product}: Props) {
  console.log(product)
  // let test = urlFor(product.image[0].asset).url()
  // console.log(test)
  const dispatch = useDispatch()

  const addItemToBasket = () => {
    dispatch(addToBasket(product))
    toast.success(`${product.title} added to basket`, {
      position: 'bottom-center',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }
  return (
    <div>
        <div>
          {
            product.image[0].asset && (
              <div className='flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#35383c] p-8 md:h-[500px] md:w-[400px] md:p-10 '>
              <div className='relative h-64 w-full md:h-72'>
            <Image
             width={'300'}
              height={'300'}
              alt='t'
              unoptimized={true}
              src={urlFor(product.image[0].asset).url()}/>
              </div>
              <div className='flex flex-1 items-center justify-between space-x-3'>
                <div className='space-y-2 text-xl text-white md:text-2xl'>
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                </div>
                <div onClick={addItemToBasket} className='flex w-16 h-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px] '>
                <ShoppingCartIcon className='h-8 w-8 text-white'/>
                </div>
              </div>
              </div>
               ) 
            }
        </div>
    </div>
  )
}

export default Product