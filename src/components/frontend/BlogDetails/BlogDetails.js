import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { postPublicApi } from '../../../api/apiCall';
import { Footer } from '../../../layouts/frontend/Footer';
import Navbar from '../../../layouts/frontend/Navbar';
import { TopNav } from '../../../layouts/frontend/TopNav';
import { BottomFix } from '../BottomFix';
import BlogDetailsList from './BlogDetailsList';
const BlogDetails = () => {

    const [itemList, setitemList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(1);

    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({});

    const getAllBlogs = async (page = 1) => {
        const response = await postPublicApi("blog/list", { page: page, pagination_num: 8 });
        if (response) {
            if (response.code === 200) {
                setitemList(response?.data?.data);
                setCurrentPage(response?.data?.current_page);
                setTotalItem(response?.data?.total);
                // console.log(response?.data);
                setItemPerPage(response?.data?.per_page);
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
        const response = await postPublicApi(url, { ...formValue, pagination_num: 8 });
        if (response) {
            if (response.code === 200) {
                setitemList(response?.data?.data);
                setCurrentPage(response?.data?.current_page);
                setTotalItem(response?.data?.total);
                setItemPerPage(response?.data?.per_page);
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

    }, []);




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

                                {/* <a className="badge bg-color-1 text-decoration-none link-light me-2" href="#!">Food</a>
                            <a className="badge bg-color-1 text-decoration-none link-light" href="#!">Cofee</a> */}
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