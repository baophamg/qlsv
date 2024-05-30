import React from 'react';

export function Index() {
    return (
        <>
            <div>
                <h1>Danh sách Môn Học</h1>
                <a href="add.html" className="btn btn-info">Add</a>
                <form action="list.html" method="GET">
                    <label className="form-inline justify-content-end">Tìm kiếm: <input type="search" name="search" className="form-control" defaultValue />
                        <button className="btn btn-danger">Tìm</button>
                    </label>
                    <input type="hidden" name="c" defaultValue="subject" />
                </form>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã MH</th>
                            <th>Tên</th>
                            <th>Số tín chỉ</th>
                            <th colSpan={2}>Tùy Chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>Toán</td>
                            <td>3</td>
                            <td><a href="edit.html">Sửa</a></td>
                            <td><a className="delete" data={1} type="subject" href="list.html">Xóa</a></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2</td>
                            <td>Lý</td>
                            <td>3</td>
                            <td><a href="edit.html">Sửa</a></td>
                            <td><a className="delete" data={2} type="subject" href="list.html">Xóa</a></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>3</td>
                            <td>Hóa</td>
                            <td>2</td>
                            <td><a href="edit.html">Sửa</a></td>
                            <td><a className="delete" data={3} type="subject" href="list.html">Xóa</a></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <span>Số lượng: 3</span>
                </div>
            </div>

        </>
    );
}
