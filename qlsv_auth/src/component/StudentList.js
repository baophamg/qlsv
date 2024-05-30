import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import ConfirmDialog from './ConfirmDialog';
import Button from 'react-bootstrap/esm/Button';
export default function StudentList({ items, handleConfirmDialog }) {

    const [currentId, setCurrentId] = useState(null);
    // không hiển thị modal khi vào trang web
    const [showModal, setShowModal] = useState(false)
    // Đóng dialog
    const handleCloseDialog = () => {
        setShowModal(false);
    }

    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã SV</th>
                        <th>Tên</th>
                        <th>Ngày Sinh</th>
                        <th>Giới Tính</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>
                                    {/* /student/suu-2.html */}
                                    <Link to={`/student/${slugify(item.name)}-${item.id}.html`}>
                                        {item.name}
                                    </Link>

                                </td>
                                <td>{item.birthday}</td>
                                <td>{item.gender}</td>
                                <td>
                                    <Link className="btn btn-warning btn-sm" to={`/student/edit/${slugify(item.name)}-${item.id}.html`}>
                                        Sửa
                                    </Link>
                                </td>
                                <td>
                                    <Button className="btn btn-danger btn-sm" onClick={() => { setShowModal(true); setCurrentId(item.id) }}>Xóa</Button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
            <ConfirmDialog showModal={showModal} handleCloseDialog={handleCloseDialog} handleConfirmDialog={handleConfirmDialog} currentId={currentId} />
        </>
    );
}
