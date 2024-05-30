import React, { useState } from 'react';

export default function Search({ handleSearch, search }) {
    // xem lại bài tính tổng
    const [pattern, setPattern] = useState(search);
    return (
        <>
            <form action="list.html" method="GET" onSubmit={(e) => handleSearch(e, pattern)}>
                <label className="form-inline justify-content-end">Tìm kiếm: <input type="search" name="search" className="form-control" onChange={(e) => setPattern(e.target.value)} value={pattern} />
                    <button className="btn btn-danger">Tìm</button>
                </label>
            </form>
        </>
    );
}
