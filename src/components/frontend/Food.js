import React, { useEffect, useState } from 'react';
import Navbar from '../../layouts/frontend/Navbar';
import { TopNav } from '../../layouts/frontend/TopNav';
import { Goods } from './card/Goods';
import { Footer } from '../../layouts/frontend/Footer';
import { BottomFix } from './BottomFix';
import { postPublicApi } from "../../api/apiCall";
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { catWiseFilter } from '../../redux/action/action';
import Spinner from './Spinner/Spinner';

export const Food = () => {
    const [loading, setLoading] = useState(false);

    const getData = useSelector((state) => state.catId);
    const [categoryList, setcategoryList] = useState([]);
    const [itemList, setitemList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(1);
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({});

    const getAllFoods = async (page = 1) => {
        setLoading(true);
        const response = await postPublicApi("item-list", { page: page, pagination_num: 40 });
        if (response) {
          if (response.code === 200) {
            setitemList(response?.data?.data);
            setCurrentPage(response?.data?.current_page);
                setTotalItem(response?.data?.total);
                setItemPerPage(response?.data?.per_page);
                setLoading(false);
          } else {
          }
        }
      };
    
      useEffect(() => {
        getAllFoods();
      }, []);

    const InputValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const data = { ...formValue, [name]: value };
        setFormValue(data)
    }

    const getCategory = async (page = 1) => {
        const url = `category-list`;
        setLoading(true);
        const response = await postPublicApi(url, { pagination_num: 100 });
        if (response) {
            if (response.code === 200) {
                setcategoryList(response?.data?.data);
                setLoading(false);
            } else {
            }
        }
    };

    const getItem = async (page = 1) => {
        const url = `item-list?page=${page}`;
        setLoading(true);
        const response = await postPublicApi(url, { ...formValue, pagination_num: 40,cat_id:getData.cat_id });
        if (response) {
            if (response.code === 200) {
                setitemList(response?.data?.data);
                setCurrentPage(response?.data?.current_page);
                setTotalItem(response?.data?.total);
                setItemPerPage(response?.data?.per_page);
                setLoading(false);
            } else {
            }
        }
    };

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(catWiseFilter({cat_id:null}))
        getItem()
    };

    const resetFilterOptions = (e) => {
        setFormValue({})
        document.getElementById("filter_form").reset();
    }

    useEffect(() => {
        getItem();
        getCategory();
    }, [getData]);

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
                            <form onChange={InputValue} onSubmit={handleFilter} id="filter_form">
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

                    <div>
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
                        
                    </div>


                </div>
            </div>
        </div>  }
            </>
            
            <Footer />
            <BottomFix />
        </div>
    )
}
