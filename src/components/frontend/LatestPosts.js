import React, { useEffect, useState } from 'react'
import { LatestPost } from './card/LatestPost';

export const LatestPosts = () => {
  const [itemList, setitemList] = useState([]);

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
