import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogDetailsList = (props) => {
    const navigate = useNavigate();
  const navigateToFoodDetails = post =>{
          console.log(post.id);
        navigate(`/blog-details/${post.id}`,{state:{post}});
        
    }
    return (
        <div class="card mb-2">
                    <div class="row px-3 pointer" onClick={()=> navigateToFoodDetails(props.post)}>
                        <img class="profile-pic mr-3 w-25 rounded col-3" src={``} alt={props.post.title} />
                        <div class=" col-9">
                            <p class="mb-0 font-weight-normal">{props.post.title}</p>
                        </div>
                    </div>
                
                </div>
    );
};

export default BlogDetailsList;