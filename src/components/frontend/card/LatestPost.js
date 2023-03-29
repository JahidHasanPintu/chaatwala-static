import React from 'react'
import { useNavigate } from 'react-router-dom'

export const LatestPost = (props) => {
  const { post } = props;

  const navigate = useNavigate();
  const navigateToFoodDetails = post =>{
          console.log(post.id);
        navigate(`/blog-details/${post.id}`,{state:{post}});
        
    }
  return (
    <div className='col-md-4 mb-3 text-start'>
      <div  className='text-decoration-none'>
        <div className='card border-0 text-dark'>
          <img style={{ height: "230px" }} className='img-fluid card-img-top' src={`https://demo-backend-chaatwala.geniushubbd.com/uploads/${post.image}`} alt={post.title} />
          <div className='card-body'>
            <h4 onClick={()=> navigateToFoodDetails(post)} className='mb-0 mt-2 pointer' >{post.title}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
