import React, { useEffect, useState } from 'react'
import { MenuCat } from './sub/MenuCat';
export const MenuCategories = () => {


  const [categoryList, setcategoryList] = useState([]);

  const getCategory = () => {
    fetch(`Data/categories.json`)
      .then((response) => response.json())
      .then((actualData) => setcategoryList(actualData))
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className='menu-categories py-5'>
        <div className='container'>
          <h6 className='color-1'>TOP FOODS</h6>
          <h1 className='fw-bold mb-0'>Menu Categories</h1>
          <div className='row mt-5 text-light'>

            {categoryList?.map((item) => {
              return (
                <MenuCat key={item?.id} image={item?.image} name={item?.cat_name} />
              )
            })}
          </div>
        </div>
      </div>
    </>

  )
}
