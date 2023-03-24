import React, { useEffect, useState } from 'react'
import { Goods } from './card/Goods'
import { postPublicApi } from "../../api/apiCall";
import Spinner from './Spinner/Spinner';

export const PopularGoods = () => {

  const [itemList, setitemList] = useState([]);

  
const [loading, setLoading] = useState(false);

  const getCategory = async (page = 1) => {
    setLoading(true);
    const response = await postPublicApi("item-list", { page: page, pagination_num: 16 });
    if (response) {
      if (response.code === 200) {
        setitemList(response?.data?.data);
        setLoading(false);
      } else {
      }
    }
  };

  useEffect(() => {
    getCategory();
  }, []);


  return (
    <>
    {
    loading ?<Spinner/>  :<div className='popular-goods py-5'>
    <div className='container'>
        <h6 className='color-1'>QUICK PICK</h6>
        <h1 className='fw-bold mb-0'>Popular Items</h1>
        {/* <h1 className='color-1'>-------------</h1> */}
        <div className='row mt-5 text-light'>

          {itemList?.map((item) => {
                return (
                  <Goods key={item?.id} item={item} image={item?.images[0]['image']} name={item?.name} price={item?.price} />
                )
          })}

        </div>
    </div>
</div>}
    </>
    
  )
}
