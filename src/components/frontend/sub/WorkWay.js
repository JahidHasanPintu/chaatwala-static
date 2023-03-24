import React from 'react'

export const WorkWay = (props) => {
    return (
        <div className='col-md-4'>
            <div className='p-4'>
                <svg xmlns={props.icon.xmlns} width="60" height="60" fill="#C64A24" className={props.icon.iconClass} viewBox="0 0 16 16"><path d={props.icon.path1} /><path d={props.icon.path2} /></svg>
                <h3 className='mt-2'><strong>{props.title}</strong></h3>
                <p>{props.description}</p>
            </div>
        </div>
    )
}
