import React, { useEffect, useState } from 'react'
import { Footer } from '../../layouts/frontend/Footer'
import Navbar from '../../layouts/frontend/Navbar'
import { TopNav } from '../../layouts/frontend/TopNav'
import { MenuCat } from './sub/MenuCat';
import { BottomFix } from './BottomFix';
import Spinner from './Spinner/Spinner';

export const Menu = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setcategoryList] = useState([]);
  const getAllCategories = () => {
    fetch(`Data/categories.json`)
      .then((response) => response.json())
      .then((actualData) => setcategoryList(actualData))
      .catch((err) => {
        console.log(err.message);
      });
  }

  const handleFilter = (e) => {
    const value = e.target.value;
    if (!value) {
      getAllCategories();
    } else {
      const searchTerm = value.toLowerCase();
      const filteredCategories = categoryList.filter(category => {
        const categoryName = category.cat_name.toLowerCase();
        return categoryName.includes(searchTerm);
      });
      setcategoryList(filteredCategories);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <TopNav />
      <Navbar />
      <>
        {
          loading ? <Spinner /> : <div className='py-5'>
            <div>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-8 text-start'>
                    <h1 className='fw-bold mb-0 color-1 ms-md-5 mt-1'>Our Menu Categories</h1>
                  </div>
                  <div className='col-md-4 mt-3'>
                    <form onChange={handleFilter} id="filter_form">
                      <div className="input-group mb-3">
                        <input name='name' style={{ fontSize: '18px', borderColor: '#C64A24' }} type="text" className="form-control color-1" placeholder="Search category" aria-label="Search your menu category" aria-describedby="basic-addon2" />
                        <button type='submit' className="input-group-text text-light" style={{ fontSize: '20px', backgroundColor: '#C64A24' }} id="basic-addon2">Search</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='container'>
              <div className='row mt-5 text-light' >
                {categoryList?.map((item) => {
                  return (
                    <MenuCat key={item?.id} image={item?.image} name={item?.cat_name} catID={item.id} />
                  )
                })}
              </div>
            </div>
          </div>
        }
      </>
      <Footer />
      <BottomFix />
    </div>
  )
}
