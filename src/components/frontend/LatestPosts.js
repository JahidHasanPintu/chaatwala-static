import React, { useEffect, useState } from 'react'
import { postPublicApi } from '../../api/apiCall';
import { LatestPost } from './card/LatestPost';

export const LatestPosts = () => {
  const [itemList, setitemList] = useState([]);

    const [formValue] = useState({});

    const getAllBlogs = async (page = 1) => {
     
        const response = await postPublicApi("blog/list", { page: page, pagination_num: 8 });
        if (response) {
          if (response.code === 200) {
            setitemList(response?.data?.data);
                
          } else {
          }
        }
      };
    
      useEffect(() => {
        getAllBlogs();
      }, []);

    const getItem = async (page = 1) => {
        const url = `blog/list?page=${page}`;
       
        const response = await postPublicApi(url, { ...formValue, pagination_num: 8 });
        if (response) {
            if (response.code === 200) {
                setitemList(response?.data?.data);
               
            } else {
            }
        }
    };


    useEffect(() => {
        getItem();
        
    },);
  return (
    <div className='popular-goods bg-light py-5'>
    <div className='container'>
        <h6 className='color-1'>OUR BLOGS</h6>
        <h1 className='fw-bold mb-0'>Our Latest Posts</h1>
       
        <div className='row mt-5 text-light'>
        {itemList?.map((post) => {
                return (
                  <LatestPost key={post?.id} post={post} />
                )
          }).slice(0,6)}
        </div>
    </div>
</div> 
    
  )
}
