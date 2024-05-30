import React from 'react';

export default function Pagination({ pagination, handlePage }) {
    const totalPage = pagination.totalPage;
    const page = Number(pagination.page);
    const pageNumbers = [];
    // tạo danh sách các con số đại diện cho từng trang
    for (let i = 1; i <= totalPage; i++) {
        // hàm push() là thêm 1 phần tử vào cuối danh sách
        pageNumbers.push(i);
    }
    return (
        <>
            {/* b4-pagination-alignment */}
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                        <button className="page-link" aria-label="Previous">
                            <span aria-hidden="true">«</span>
                            <span className="sr-only">Previous</span>
                        </button>
                    </li>
                    {
                        pageNumbers.map(num =>
                            <li key={num} className={`page-item ${page === num ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePage(num)}>{num}</button>
                            </li>
                        )
                    }


                    <li className="page-item">
                        <button className="page-link" aria-label="Next">
                            <span aria-hidden="true">»</span>
                            <span className="sr-only">Next</span>
                        </button>
                    </li>
                </ul>
            </nav>

        </>
    );
}
