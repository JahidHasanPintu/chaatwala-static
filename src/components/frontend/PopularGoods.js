import React, { useEffect, useState } from 'react'
import { Goods } from './card/Goods'

export const PopularGoods = () => {

  const [itemList, setitemList] = useState([]);

  const getAllFood = () => {
    fetch(`Data/products.json`)
      .then((response) => response.json())
      .then((actualData) => setitemList(actualData))

      .catch((err) => {
        console.log(err.message);

      });
  }

  useEffect(() => {
    getAllFood();
  }, []);


  return (
     <div className='popular-goods py-5'>
          <div className='container'>
            <h6 className='color-1'>QUICK PICK</h6>
            <h1 className='fw-bold mb-0'>Popular Items</h1>
            <div className='row mt-5 text-light'>

              {itemList?.map((item) => {
                return (
                  <Goods key={item?.id} item={item} image={item?.images[0]['image']} name={item?.name} price={item?.price} />
                )
              })}

            </div>
          </div>
        </div>
    

  )
}
