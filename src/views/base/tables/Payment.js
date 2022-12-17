import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CImg,
  CBadge,
  CModal,
  CModalHeader,
  CModalBody,
  CButton,
  CModalFooter,
  CSelect,
  CFormGroup,
  CLabel,
  CAlert,
} from "@coreui/react";
import { CIcon } from '@coreui/icons-react';

import { useDispatch, useSelector } from "react-redux";
import { fetchPayment, updatePaymentStatus, removePayment } from "../../../store/action/action";
import { useHistory } from "react-router-dom";

const fields = [
  {
    key: "No",
    sorter: true,
  },
  {
    key: 'Nama Siswa'
  },
  {
    key: 'nama_pengirim',
    label: 'Nama Pengirim'
  },
  {
    key: "kode_pembayaran",
    label: "Kode Pembayaran",
  },
  {
    key: "metode_pembayaran",
    label: "Metode Pembayaran",
  },
  {
    key: "nama_bank",
    label: "Nama Bank",
  },
  {
    key: "Bukti Pembayaran",
  },
  {
    key: "Status",
  },
  {
    key: "Action",
  },
];

const Tables = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.cmsReducer.payments);
  const [showPopupUpdate, setShowPopupUpdate] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const [statusPayment, setStatusPayment] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showPopupImg, setShowPopupImg] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedTestimony, setSelectedTestimony] = useState(null);
  const [successDelete, setSuccessDelete] = useState(false);
  const [failedDelete, setFailedDelete] = useState(false);
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchPayment());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setUpdateFailed(false);
      setUpdateSuccess(false);
    },3000)
  }, [updateFailed, updateSuccess])

  useEffect(() => {
    setTimeout(() => {
      setFailedDelete(false);
      setSuccessDelete(false);
    }, 3000);
  }, [successDelete, failedDelete]);

  const getBadge = (status)=>{
    switch (status.toLowerCase()) {
      case 'approved': return 'success'
      case 'pending': return 'secondary'
      case 'waiting approval': return 'warning'
      case 'cancel': return 'danger'
      default: return 'primary'
    }
  }

  const openPopupUpdata = (payment) => {
    setSelectedPayment(payment);
    setShowPopupUpdate(true);
  }

  const updateForm = (e) => {
    setStatusPayment(e.target.value);
  }

  const openImage = (image) => {
    setSelectedImg(image);
    setShowPopupImg(true);
  }

  const onClickDeletePayment = (payment) => {
    setShowDeletePopup(true)
    setSelectedPayment(payment);
  }

  const deleteTestimony = () => {
    setShowDeletePopup(false);
    dispatch(removePayment(
      selectedPayment,
      () => {
        setSuccessDelete(true)
      },
      () => {
        setFailedDelete(true);
      }
      ));
  }

  const updateStatusPayment = () => {
    dispatch(updatePaymentStatus(
      selectedPayment,
      { status: statusPayment },
      () => {
        setSelectedPayment(null);
        setStatusPayment('')
        setUpdateSuccess(true);
        setShowPopupUpdate(false);
      },
      () => {
        setUpdateFailed(true);
        setShowPopupUpdate(false);
      }
    ))
  }

  return (
    <>  
      <CRow>
        <CCol xs="12" lg="12">
          {updateSuccess && <CAlert color="success" closeButton>
            Berhasil Ubah Status Pembayaran
          </CAlert>}
          {updateFailed && <CAlert color="warning" closeButton>
            Mohon Maaf, Terjadi Kesalahan Pada Sistem. Silakan Coba Lagi
          </CAlert>}
          {successDelete && <CAlert color="success" closeButton>
            Testimoni Berhasil Dihapus
          </CAlert>}
          {failedDelete && <CAlert color="warning" closeButton>
            Mohon Maaf, Terjadi Kesalahan Pada Sistem. Silakan Coba Lagi
          </CAlert>}
          <CCard>
            <CCardHeader>Transaksi Pembayaran</CCardHeader>
            <CCardBody style={{textAlign: 'center'}}>
              <CDataTable
                items={payments && payments}
                fields={fields}
                itemsPerPage={5}
                dark
                pagination
                sorter
                tableFilter
                hover
                scopedSlots={{
                  No: (item, index) => {
                    return <td className="py-2">{index + 1}.</td>;
                  },
                  'Nama Siswa': (item, index) => {
                    return <td className="py-2">{item.userPayment.nama_lengkap}</td>
                  },
                  'Bukti Pembayaran': (item, index) => {
                    return (
                      <td className="py-2">
                        {item.pembayaran_pertama ?
                          <CImg onClick={() => openImage(item)} src={item.pembayaran_pertama} thumbnail width={70} style={{cursor: 'pointer'}} />
                          :
                          '-'
                        }
                      </td>
                    )
                  },
                  'Action': (item, index) => {
                    return (
                      <td className="py-2" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CButton color="danger" size="sm" style={{cursor: 'pointer'}} onClick={() => onClickDeletePayment(item)}>
                          Delete
                        </CButton>
                      </td>
                    )
                  },
                  'Status':
                    (item)=>(
                      <td style={{width: '150px'}}>
                        <CBadge style={{padding: '5%'}} color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                        <CIcon onClick={() => openPopupUpdata(item)} style={{marginLeft: '5%', cursor: 'pointer'}} color="success" size={'sm'} name={'cilPencil'} />
                      </td>
                    ),
                }}
              />
            </CCardBody>
          </CCard>
          <CModal
            centered
            show={showPopupUpdate}
            onClose={() => setShowPopupUpdate(false)}
          >
            <CModalHeader closeButton>Ubah Status Pembayaran</CModalHeader>
            <CModalBody>
              <CFormGroup>
                <CLabel htmlFor="status">Status</CLabel>
                <CSelect required name='status' onChange={(e) => updateForm(e)}>
                  <option disabled selected>-- Pilih Status --</option>
                  <option value="Cancel">Cancel</option>
                  <option value="Pending">Pending</option>
                  <option value="Waiting Approval">Waiting Approval</option>
                  <option value="Approved">Approved</option>
                </CSelect>
              </CFormGroup>
            </CModalBody>
            <CModalFooter>
              <CButton color="success" onClick={updateStatusPayment}>Ubah</CButton>
              <CButton
                color="secondary"
                onClick={() => setShowPopupUpdate(false)}
              >Tutup</CButton>
            </CModalFooter>
          </CModal>
          <CModal
            centered
            show={showPopupImg}
            onClose={() => setShowPopupImg(false)}
          >
            <CModalHeader closeButton></CModalHeader>
            <CModalBody style={{display: 'flex', justifyContent: 'center'}}>
              <CImg centered src={selectedImg?.pembayaran_pertama} width={350} />
            </CModalBody>
          </CModal>
          <CModal
            show={showDeletePopup}
            onClose={() => setShowDeletePopup(false)}
          >
            <CModalHeader closeButton>Hapus Pembayaran</CModalHeader>
            <CModalBody>
              {`Anda yakin ingin menghapus pembayaran ini ?`}
            </CModalBody>
            <CModalFooter>
              <CButton color="danger" onClick={deleteTestimony}>Hapus</CButton>
              <CButton
                color="secondary"
                onClick={() => setShowDeletePopup(false)}
              >Tutup</CButton>
            </CModalFooter>
          </CModal>
        </CCol>
      </CRow>
    </>
  );
};

export default Tables;
