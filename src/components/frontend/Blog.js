import React, { useEffect, useState } from 'react'
import Navbar from '../../layouts/frontend/Navbar'
import { TopNav } from '../../layouts/frontend/TopNav'
import { LatestPost } from './card/LatestPost'
import { Footer } from '../../layouts/frontend/Footer';
import { BottomFix } from './BottomFix';
import { useDispatch } from 'react-redux';
import { postPublicApi } from '../../api/apiCall';
import Pagination from 'react-js-pagination';
import Spinner from './Spinner/Spinner';

export const Blog = () => {

    const [loading, setLoading] = useState(false);


    const [itemList, setitemList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(1);
    
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({});

    const getAllBlogs = async (page = 1) => {
        setLoading(true);
        const response = await postPublicApi("blog/list", { page: page, pagination_num: 40 });
        if (response) {
          if (response.code === 200) {
            setitemList(response?.data?.data);
            setCurrentPage(response?.data?.current_page);
                setTotalItem(response?.data?.total);
                // console.log(response?.data);
                setItemPerPage(response?.data?.per_page);
                setLoading(false);
          } else {
          }
        }
      };
    
      useEffect(() => {
        getAllBlogs();
      }, []);

    const InputValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const data = { ...formValue, [name]: value };
        setFormValue(data)
    }

    const getItem = async (page = 1) => {
        const url = `blog/list?page=${page}`;
        setLoading(true);
        const response = await postPublicApi(url, { ...formValue, pagination_num: 40 });
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
        getItem();
      };
    const resetFilterOptions = (e) => {
        setFormValue({})
        document.getElementById("filter_form").reset();
    }
    useEffect(() => {
        getItem();
        
    }, [ ]);


    return (
        <div>
            <TopNav />
            <Navbar />
            <>
            {
            loading ?<Spinner/>  :<div className='py-5 blog'>
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 text-start'>
                            <h1 className='fw-bold mb-0 color-1 ms-md-5 mt-1'>Our Recent Blogs</h1>
                        </div>
                        <div className='col-md-4 mt-3'>
                            <form onChange={InputValue} onSubmit={handleFilter} id="filter_form"> 
                                <div className="input-group mb-3">
                                    <input name='title' style={{ fontSize: '18px', borderColor: '#C64A24' }} type="text" className="form-control color-1" placeholder="Search post" aria-label="Search your menu category" aria-describedby="basic-addon2" />
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
                <div className='row mt-5 text-light'>
                {itemList?itemList?.map((post) => {
                return (
                  <LatestPost key={post?.id} post={post} />
                )
          }):<div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
          }
                </div>


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
        </div> }
            </>
            
            <Footer />
            <BottomFix />
        </div>
    )
}
