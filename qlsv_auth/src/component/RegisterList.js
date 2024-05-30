import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import ConfirmDialog from './ConfirmDialog';
import Button from 'react-bootstrap/esm/Button';
export default function RegisterList({ items, handleConfirmDialog }) {

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
                        <th>Tên SV</th>
                        <th>Mã MH</th>
                        <th>Tên MH</th>
                        <th>Điểm</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.student_id}</td>
                                <td>
                                    <Link to={`/register/${slugify(item.student_name)}-${slugify(item.subject_name)}-${item.id}.html`}>
                                        {item.student_name}
                                    </Link>
                                </td>
                                <td>{item.subject_id}</td>
                                <td>{item.subject_name}</td>
                                <td>{item.score}</td>
                                <td>
                                    <Link className="btn btn-warning btn-sm" to={`/register/edit/${slugify(item.student_name)}-${slugify(item.subject_name)}-${item.id}.html`}>
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
