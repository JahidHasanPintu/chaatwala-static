import React from 'react'

export const Testimonial = (props) => {
    const definedClass = "carousel-item "+props.activeClass
    return (
        <div className={definedClass}>
            <div className='testimonial-caption text-center'>
                <img src={props.img} alt={props.img} />
                <div className='quate'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#C64A24" className="bi bi-quote" viewBox="0 0 16 16">
                            <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                        </svg>
                    </div>
                </div>
                <div>
                    <i className='lead'>{props.note}</i>
                </div>
                <h5 className='mt-3'>{props.name}</h5>
            </div>
        </div>
    )
}
