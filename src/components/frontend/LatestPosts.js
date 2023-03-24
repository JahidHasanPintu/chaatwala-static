import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { postPublicApi } from '../../api/apiCall';
import post1 from '../../assets/frontend/img/common/post-1.jpg';
import post2 from '../../assets/frontend/img/common/post-2.jpg';
import post3 from '../../assets/frontend/img/common/post-3.jpg';
import { LatestPost } from './card/LatestPost';
import Spinner from './Spinner/Spinner';

export const LatestPosts = () => {

  const [loading, setLoading] = useState(false);


  const [itemList, setitemList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(1);
    
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({});

    const getAllBlogs = async (page = 1) => {
      setLoading(true);
        const response = await postPublicApi("blog/list", { page: page, pagination_num: 8 });
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
        const response = await postPublicApi(url, { ...formValue, pagination_num: 8 });
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

    const resetFilterOptions = (e) => {
        setFormValue({})
        document.getElementById("filter_form").reset();
    }
    useEffect(() => {
        getItem();
        
    }, [ ]);
  return (
    <>
    {
    loading ?<Spinner/>  :<div className='popular-goods bg-light py-5'>
    <div className='container'>
        <h6 className='color-1'>OUR BLOGS</h6>
        <h1 className='fw-bold mb-0'>Our Latest Posts</h1>
        {/* <h1 className='color-1'>-------------</h1> */}
        <div className='row mt-5 text-light'>
        {itemList?.map((post) => {
                return (
                  <LatestPost key={post?.id} post={post} />
                )
          }).slice(0,6)}
        </div>
    </div>
</div> }
    </>
    
  )
}
