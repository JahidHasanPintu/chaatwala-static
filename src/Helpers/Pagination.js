import React, {useState, useEffect} from 'react'

export default function Pagination(props) {
    const [paginations, setPaginations] = useState([]);
    const [lastPage, setLastPage] = useState();
    const {current_page, total_pages} = props.paginator;
    const { changePage } = props;

    const [firstIndex, setFirstIndex] = useState(1);
    const [lastIndex, setlastIndex] = useState(10);



    useEffect(() => {
        renderPagination(total_pages);
        setLastPage(total_pages);
    }, [props.paginator,total_pages]);


    const renderPagination = (length) => {
        let items = [];
        for (let index = 1; index <= length; index++) {
            items.push(index);
        }

        setPaginations(items);
    };

    const updatePageIndex = (value) => {
        if (value) {
            if ( (lastPage - value) >= 10) {
                setFirstIndex(value);
                setlastIndex(value + 10);
            }

            if ( (lastPage - value) <= 10) {
                setFirstIndex(value - (10 - (lastPage - value)));
                setlastIndex(lastPage);
            }
        }
    }

    const isShowThisItem = (item) => {
        if (item >= firstIndex && item <= lastIndex) return true;
    }

    return (
        <nav aria-label="Page navigation example"> 
            <ul className="pagination justify-content-end float-left">
                 <li className={ current_page === 1 ? "page-item disabled" : "page-item" }>
                    <button 
                        className="page-link"
                        tabIndex="-1"
                        onClick={() => {changePage("first"); updatePageIndex(1);}}>
                        First
                    </button>
                </li>

                <li className={ current_page === 1 ? "page-item disabled" : "page-item" }>
                    <button
                        className="page-link"
                        tabIndex="-1"
                        onClick={() => {changePage("prev"); updatePageIndex(current_page !== 1 ? current_page - 1 : 0);}}>
                        Previous
                    </button>
                </li>

                {paginations.map((item) => (
                    isShowThisItem(item) ? (<li key={item} className={ item === current_page ? "page-item active" : "page-item" }>
                            <button
                                className="page-link"
                                onClick={() => {changePage(item); updatePageIndex(item)}}
                            >
                                {item}
                            </button>
                        </li>) : ""
                ))}

                <li className={ current_page + 1 > lastPage ? "page-item disabled" : "page-item" }
                    disabled={ current_page + 1 >= lastPage}
                >
                    <button className="page-link" onClick={() => {changePage("next"); updatePageIndex(current_page + 1);} }
                        disabled={current_page + 1 >= lastPage}
                    >
                        Next
                    </button>
                </li>
                <li className={ current_page + 1 > lastPage ? "page-item disabled" : "page-item" }
                    disabled={ current_page + 1 >= lastPage}>
                    <button className="page-link" onClick={() => {changePage("last"); updatePageIndex(lastPage);} }
                        disabled={current_page + 1 >= lastPage}
                    >
                        Last
                    </button>
                </li>
            </ul>
        </nav>
    )
}
