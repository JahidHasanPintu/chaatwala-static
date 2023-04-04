import React, { useEffect, useState } from 'react'
import Navbar from '../../layouts/frontend/Navbar'
import { TopNav } from '../../layouts/frontend/TopNav'
import { LatestPost } from './card/LatestPost'
import { Footer } from '../../layouts/frontend/Footer';
import { BottomFix } from './BottomFix';

export const Blog = () => {


    const [itemList, setitemList] = useState([]);

    const [formValue, setFormValue] = useState({});

    const getAllPosts = () =>{
        fetch(`Data/blogs.json`)
        .then((response) => response.json())
        .then((actualData) => setitemList(actualData))
        
        .catch((err) => {
        console.log(err.message);
        
        });
    }
    
      useEffect(() => {
        getAllPosts();
      }, []);

    const InputValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const data = { ...formValue, [name]: value };
        setFormValue(data)
    }

    const handleFilter = (e) => {
        e.preventDefault();
       
      };
    const resetFilterOptions = (e) => {
        setFormValue({})
        document.getElementById("filter_form").reset();
    }
    useEffect(() => {
        
        
    }, );


    return (
        <div>
            <TopNav />
            <Navbar />
            <div className='py-5 blog'>
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


                
            </div>
        </div> 
            <Footer />
            <BottomFix />
        </div>
    )
}
