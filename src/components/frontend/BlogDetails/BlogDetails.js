import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { postPublicApi } from '../../../api/apiCall';
import { Footer } from '../../../layouts/frontend/Footer';
import Navbar from '../../../layouts/frontend/Navbar';
import { TopNav } from '../../../layouts/frontend/TopNav';
import { BottomFix } from '../BottomFix';
import BlogDetailsList from './BlogDetailsList';
const BlogDetails = () => {

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
    }, );



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




    const location = useLocation();
    const post = location.state.post;

    return (
        <div>
            <TopNav />
            <Navbar />
            <div className="container mt-5 text-start">
                <div className="row">
                    <div className="col-lg-8">

                        <article>

                            <header className="mb-4">

                                <h1 className="fw-bolder color-1 mb-1">{post.title} </h1>

                                <div className="text-muted fst-italic mb-2 ">Posted on {post.created_at.slice(0, 10)} by Chaatwala</div>

                            </header>
                            <figure className="mb-4"><img className="img-fluid rounded" style={{ width: "100%" }} src={`https://demo-backend-chaatwala.geniushubbd.com/uploads/${post.image}`} alt={post.title} /></figure>

                            <section className="mb-5">
                                <p className="fs-5 mb-4">
                                    {post.description}
                                </p>
                            </section>
                        </article>


                    </div>

                    <div className="col-lg-4">
                        <div className=" mb-2">
                            <h2>Latest Blogs</h2>
                        </div>
                        {itemList?.map((post) => {
                            return (
                                <BlogDetailsList key={post?.id} post={post} />
                            )
                        }).slice(0, 10)}

                    </div>
                </div>
            </div>
            <Footer />
            <BottomFix />
        </div>
    );
};

export default BlogDetails;