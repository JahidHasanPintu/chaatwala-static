import React, { useEffect, useState } from 'react'
import { Footer } from '../../layouts/frontend/Footer'
import Navbar from '../../layouts/frontend/Navbar'
import { TopNav } from '../../layouts/frontend/TopNav'
import { MenuCat } from './sub/MenuCat';
import { BottomFix } from './BottomFix';
import { postPublicApi } from "../../api/apiCall";
import Pagination from 'react-js-pagination';
import Spinner from './Spinner/Spinner';

export const Menu = () => {

  const [loading, setLoading] = useState(false);

  const [categoryList, setcategoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(1);

  const getCategory = async (page = 1) => {
    const url = `category-list?page=${page}`;
    setLoading(true);
    const response = await postPublicApi(url, { ...formValue, pagination_num: 40 });
    if (response) {
      if (response.code === 200) {
        setcategoryList(response?.data?.data);
        setCurrentPage(response?.data?.current_page);
        setTotalItem(response?.data?.total);
        setItemPerPage(response?.data?.per_page);
        setLoading(false);
      } else {
      }
    }
  };

  const [formValue, setFormValue] = useState({});

  const InputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = { ...formValue, [name]: value };
    setFormValue(data)
  }

  const handleFilter = (e) => {
    e.preventDefault();
    getCategory()
  };

  const resetFilterOptions = (e) => {
    setFormValue({})
    document.getElementById("filter_form").reset();
}

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <TopNav />
      <Navbar />
      <>
            {
            loading ?<Spinner/>  : <div className='py-5'>
            <div>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-8 text-start'>
                    <h1 className='fw-bold mb-0 color-1 ms-md-5 mt-1'>Our Menu Categories</h1>
                  </div>
                  <div className='col-md-4 mt-3'>
                    <form onChange={InputValue} onSubmit={handleFilter} id="filter_form">
                      <div className="input-group mb-3">
                        <input name='name' style={{ fontSize: '18px', borderColor: '#C64A24' }} type="text" className="form-control color-1" placeholder="Search category" aria-label="Search your menu category" aria-describedby="basic-addon2" />
                        <button type='submit' className="input-group-text text-light" style={{ fontSize: '20px', backgroundColor: '#C64A24' }} id="basic-addon2">Search</button>
                        <button type='submit' onClick={resetFilterOptions} className='btn bg-color-1 text-light ms-2' style={{ fontSize: '18px', borderColor: '#C64A24' }}>Clear Filter</button>
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
                    <MenuCat key={item?.id} image={item?.image} name={item?.cat_name} catID={item.id}/>
                  )
                })}
                
                <div>
                  {(itemPerPage < totalItem) &&
                    <div className='mt-5 mx-5'>
                      <Pagination
                        activePage={currentPage}
                        totalItemsCount={totalItem}
                        itemsCountPerPage={itemPerPage}
                        onChange={(page) => getCategory(page)}
                        itemClass='page-item'
                        linkClass='page-link'
                      />
                    </div>
                  }
                </div>
    
                {/* <MenuCat image={chaat} name='Chaat' />
                <MenuCat image={taco} name='Taco' />
                <MenuCat image={appetizer} name='Appetizer' />
                <MenuCat image={bowls} name='Bowls' />
                <MenuCat image={biryani} name='Biryani' />
                <MenuCat image={kebab} name='Kebab' />
                <MenuCat image={entree} name='Entree' />
                <MenuCat image={bread_and_side} name='Bread & Side' />
                <MenuCat image={beverages} name='Beverages' />
                <MenuCat image={kids_menu} name='Kids Menu' />
                <MenuCat image={dessert} name='Dessert' /> */}
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
