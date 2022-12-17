import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CImg,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CAlert,
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import { fetchGallery, removeGallery } from "../../../store/action/action";
// import Excel from "../../Excel";

// const fields = ['nama', 'nomor', 'telepon', 'alamat', 'attend', 'pax', 'message', 'action'];
const fields = [
  {
    key: "No",
    sorter: true,
  },
  {
    key: "image",
  },
  {
    key: "title",
    label: "Judul",
  },
  {
    key: "timestamp",
    label: "Timestamp",
  },
  {
    key: "Action",
  },
];

const Tables = () => {
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [successDelete, setSuccessDelete] = useState(false);
  const [failedDelete, setFailedDelete] = useState(false);
  const galleries = useSelector((state) => state.cmsReducer.galleries);
  useEffect(() => {
    dispatch(fetchGallery());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFailedDelete(false);
      setSuccessDelete(false);
    }, 3000);
  }, [successDelete, failedDelete]);

  const onClickDeleteGallery = (teacher) => {
    setShowDeletePopup(true)
    setSelectedGallery(teacher);
  }

  const deleteGallery = () => {
    setShowDeletePopup(false);
    dispatch(removeGallery(
      selectedGallery,
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
          <CCard>
            <CCardHeader>Data Galeri</CCardHeader>
            {successDelete && <CAlert color="success" closeButton>
              Gallery Berhasil Dihapus
            </CAlert>}
            {failedDelete && <CAlert color="warning" closeButton>
              Mohon Maaf, Terjadi Kesalahan Pada Sistem. Silakan Coba Lagi
            </CAlert>}
            <CCardBody style={{textAlign: 'center'}}>
              <CDataTable
                items={galleries && galleries}
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
                  'image': (item, index) => {
                    return (
                      <td className="py-2">
                        {item.image ?
                          <CImg src={item.image} thumbnail width={125} />
                          :
                          '-'
                        }
                      </td>
                    )
                  },
                  'Action': (item, index) => {
                    return (
                      <td className="py-2" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CButton color="danger" size="sm" style={{cursor: 'pointer'}} onClick={() => onClickDeleteGallery(item)}>
                          Delete
                        </CButton>
                      </td>
                    )
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal
        show={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
      >
        <CModalHeader closeButton>Hapus Guru</CModalHeader>
        <CModalBody>
          {`Anda yakin ingin menghapus ${selectedGallery?.title} ?`}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={deleteGallery}>Hapus</CButton>
          <CButton
            color="secondary"
            onClick={() => setShowDeletePopup(false)}
          >Tutup</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Tables;
