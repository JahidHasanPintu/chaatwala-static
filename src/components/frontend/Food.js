import React, { useEffect, useState } from 'react';
import Navbar from '../../layouts/frontend/Navbar';
import { TopNav } from '../../layouts/frontend/TopNav';
import { Goods } from './card/Goods';
import { Footer } from '../../layouts/frontend/Footer';
import { BottomFix } from './BottomFix';
import { useDispatch, useSelector } from 'react-redux';
import { catWiseFilter } from '../../redux/action/action';
import Spinner from './Spinner/Spinner';

export const Food = () => {
    const [loading, setLoading] = useState(false);

    const getData = useSelector((state) => state.catId);
    const [categoryList, setcategoryList] = useState([]);
    const [itemList, setitemList] = useState([]);
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({});

    const getAllFood = () =>{
        setLoading(true);
        fetch(`Data/products.json`)
        .then((response) => response.json())
        .then((actualData) => setitemList(actualData))
        
        .catch((err) => {
        console.log(err.message);
        
        });
        setLoading(false);
    }


    const handleFilter = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(value);
        const data = { ...formValue, [name]: value };
        setFormValue(data)
        if (!value) {
            getAllFood();
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
        fetch(`Data/categories.json`)
          .then((response) => response.json())
          .then((actualData) => setcategoryList(actualData))
          .catch((err) => {
            console.log(err.message);
          });
      }, []);

    // const handleFilter = (e) => {
    //     e.preventDefault();
    //     dispatch(catWiseFilter({cat_id:null}))
    //     // getItem()
    // };

    const resetFilterOptions = (e) => {
        setFormValue({})
        document.getElementById("filter_form").reset();
    }
    
    useEffect(() => {
        getAllFood();
       }, []);
    

    return (
        <div>
            <TopNav />
            <Navbar />
            <>
            {
            loading ?<Spinner/>  :<div className='py-5'>
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 text-start'>
                            <h1 className='fw-bold mb-0 color-1 ms-md-5 mt-1'>Our Foods</h1>
                        </div>
                        <div className='col-md-8 mt-3'>
                            <form onChange={handleFilter} id="filter_form">
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className="input-group mb-3">
                                            <input name='name' style={{ fontSize: '18px', borderColor: '#C64A24' }} type="text" className="form-control color-1" placeholder="Food Name" aria-label="Search your menu category" aria-describedby="basic-addon2" />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="input-group mb-3">
                                            <select name='filter_cat_id' style={{ fontSize: '18px', borderColor: '#C64A24' }} className="form-control" aria-label="Default select example"
                                            >
                                                <option defaultValue={""} value={""}>Select Category</option>

                                                {categoryList?.map((item) => {
                                                    return (
                                                        <option key={item?.id} value={item?.id}
                                                        selected={getData?.cat_id === item.id? 'selected' : null}
                                                        >{item?.cat_name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <button type='submit' className='btn bg-color-1 text-light me-2' style={{ fontSize: '18px', borderColor: '#C64A24' }}>
                                            Filter</button>
                                        <button type='submit' onClick={resetFilterOptions} className='btn bg-color-1 text-light ms-2' style={{ fontSize: '18px', borderColor: '#C64A24' }}>Clear Filter</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className='container'>
                <div className='row mt-5 text-light'>

                    {itemList?.map((item) => {
                        return (
                            <Goods  item={item} key={item?.id} image={item?.images[0]['image']} name={item?.name} price={item?.price} />
                            
                        )
                    })}

                    {/* <div>
                        {(itemPerPage < totalItem) &&
                            <div className='mt-5 mx-5'>
                                <Pagination
                                    activePage={currentPage}
                                    totalItemsCount={totalItem}
                                    itemsCountPerPage={itemPerPage}
                                        onChange={(page) => getItem(page)}
                                        itemClass='page-item'
                                    linkClass='page-link'
                                />
                            </div>
                        }
                        
                    </div> */}


                </div>
            </div>
        </div>  }
            </>
            
            <Footer />
            <BottomFix />
        </div>
    )
}
