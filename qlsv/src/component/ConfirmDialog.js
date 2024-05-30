import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmDialog({ showModal, handleCloseDialog, handleConfirmDialog, currentId }) {
    // show hay close là do cha điều khiển
    return (
        <>
            <Modal show={showModal} onHide={handleCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Bạn muốn xóa phải không</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDialog}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={
                        () => { handleConfirmDialog(currentId); handleCloseDialog() }
                    }>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
