import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CImg,
  CModal,
  CModalHeader,
  CModalBody,
  CButton,
  CModalFooter,
  CAlert,
} from "@coreui/react";
import { CIcon } from '@coreui/icons-react';


import { useDispatch, useSelector } from "react-redux";
import { fetchCertificate, removeCertificate } from "../../../store/action/action";
import { useHistory } from "react-router-dom";

const fields = [
  {
    key: "No",
    sorter: true,
  },
  {
    key: 'Nama Lengkap'
  },
  {
    key: "Nama Guru",
  },
  {
    key: "Sertifikat",
  },
  {
    key: "Action",
  },
];

const Tables = () => {
  const dispatch = useDispatch();
  const certificates = useSelector((state) => state.cmsReducer.certificates);
  const history = useHistory();
  const [selectedImg, setSelectedImg] = useState(null);
  const [showPopupImg, setShowPopupImg] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [failedDelete, setFailedDelete] = useState(false);


  useEffect(() => {
    dispatch(fetchCertificate());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFailedDelete(false);
      setSuccessDelete(false);
    }, 3000);
  }, [successDelete, failedDelete]);

  const openImage = (image) => {
    setSelectedImg(image);
    setShowPopupImg(true);
  }

  const onClickDeleteCertificate = (certificate) => {
    setShowDeletePopup(true)
    setSelectedCertificate(certificate);
  }

  const deleteCertificate = () => {
    setShowDeletePopup(false);
    dispatch(removeCertificate(
      selectedCertificate,
      () => {
        setSuccessDelete(true)
      },
      () => {
        setFailedDelete(true);
      }
      ));
  }

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          {successDelete && <CAlert color="success" closeButton>
            Sertifikat Berhasil Dihapus
          </CAlert>}
          {failedDelete && <CAlert color="warning" closeButton>
            Mohon Maaf, Terjadi Kesalahan Pada Sistem. Silakan Coba Lagi
          </CAlert>}
          <CCard>
            <CCardHeader>Sertifikat</CCardHeader>
            <CCardBody style={{textAlign: 'center'}}>
              <CDataTable
                items={certificates && certificates}
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
                  'Nama Lengkap': (item, index) => {
                    return <td className="py-2">{item?.studentData?.nama_lengkap}</td>
                  },
                  'Nama Guru': (item, index) => {
                    return <td className="py-2">{item?.teacherData?.nama}</td>
                  },
                  'Sertifikat': (item, index) => {
                    return (
                      <td className="py-2">
                        {item.file ?
                          <CImg src={item.file} thumbnail width={75} onClick={() => openImage(item)} style={{cursor: 'pointer'}} />
                          :
                          "-"
                        }
                      </td>
                    )
                  },
                  'Action': (item, index) => {
                    return (
                      <td className="py-2" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CButton color="danger" size="sm" style={{cursor: 'pointer'}} onClick={() => onClickDeleteCertificate(item)}>
                          Delete
                        </CButton>
                      </td>
                    )
                  },
                }}
              />
            </CCardBody>
          </CCard>
          <CModal
            centered
            show={showPopupImg}
            onClose={() => setShowPopupImg(false)}
          >
            <CModalHeader closeButton>{`Sertifikat ${selectedImg?.studentData?.nama_lengkap}`}</CModalHeader>
            <CModalBody style={{display: 'flex', justifyContent: 'center'}}>
              <CImg centered src={selectedImg?.file} width={500} />
            </CModalBody>
          </CModal>
          <CModal
            show={showDeletePopup}
            onClose={() => setShowDeletePopup(false)}
          >
            <CModalHeader closeButton>Hapus Sertifikat</CModalHeader>
            <CModalBody>
              {`Anda yakin ingin menghapus sertifikat ini ?`}
            </CModalBody>
            <CModalFooter>
              <CButton color="danger" onClick={deleteCertificate}>Hapus</CButton>
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
