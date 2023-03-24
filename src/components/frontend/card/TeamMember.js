import React from 'react'

export const TeamMember = (props) => {
  return (
    <div className='col-sm-6 col-md-3 mb-3'>
            <div className='card border text-start bg-light'>
                <img className='img-fluid card-img-top' src={props.image} alt={props.name} />
                <div className='card-body'>
                    <h4 className='mb-0 mt-2 color-1'>{props.name}</h4>
                    <p className='text-muted my-2'>{props.designation}</p>
                </div>
            </div>
        </div>
  )
}
