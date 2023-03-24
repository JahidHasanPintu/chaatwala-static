import React, { useEffect, useState } from 'react'
import { MenuCat } from './sub/MenuCat';
import { postPublicApi } from "../../api/apiCall";
import Spinner from './Spinner/Spinner';


export const MenuCategories = () => {

  const [loading, setLoading] = useState(false);

  

  const [categoryList, setcategoryList] = useState([]);

  const getCategory = async (page = 1) => {
    setLoading(true);
    const response = await postPublicApi("category-list", { page: page, pagination_num: 8 });
    if (response) {
      if (response.code === 200) {
        setcategoryList(response?.data?.data);
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
    loading ?<Spinner/>  : <div className='menu-categories py-5'>
    <div className='container'>
        <h6 className='color-1'>TOP FOODS</h6>
        <h1 className='fw-bold mb-0'>Menu Categories</h1>
        {/* <h1 className='color-1'>-------------</h1> */}
        <div className='row mt-5 text-light'>

            {categoryList?.map((item) => {
              return (
                <MenuCat key={item?.id} image={item?.image} name={item?.cat_name} />
              )
            })}
        </div>
    </div>
</div>}
    </>
    
  )
}
