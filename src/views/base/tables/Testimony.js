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
import { fetchTestimony, removeTestimony } from "../../../store/action/action";
// import Excel from "../../Excel";

// const fields = ['nama', 'nomor', 'telepon', 'alamat', 'attend', 'pax', 'message', 'action'];
const fields = [
  {
    key: "No",
    sorter: true,
  },
  {
    key: "nama",
    label: "Nama Lengkap",
  },
  {
    key: "message",
    label: "Pesan",
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
  const [selectedTestimony, setSelectedTestimony] = useState(null);
  const [successDelete, setSuccessDelete] = useState(false);
  const [failedDelete, setFailedDelete] = useState(false);
  const testimonies = useSelector((state) => state.cmsReducer.testimonies);

  useEffect(() => {
    dispatch(fetchTestimony());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFailedDelete(false);
      setSuccessDelete(false);
    }, 3000);
  }, [successDelete, failedDelete]);

  const onClickDeleteTeacher = (testimony) => {
    setShowDeletePopup(true)
    setSelectedTestimony(testimony);
  }

  const deleteTestimony = () => {
    setShowDeletePopup(false);
    dispatch(removeTestimony(
      selectedTestimony,
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
            <CCardHeader>Data Testimoni</CCardHeader>
            {successDelete && <CAlert color="success" closeButton>
              Testimoni Berhasil Dihapus
            </CAlert>}
            {failedDelete && <CAlert color="warning" closeButton>
              Mohon Maaf, Terjadi Kesalahan Pada Sistem. Silakan Coba Lagi
            </CAlert>}
            <CCardBody style={{textAlign: 'center'}}>
              <CDataTable
                items={testimonies && testimonies}
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
                  'Action': (item, index) => {
                    return (
                      <td className="py-2" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CButton color="danger" size="sm" style={{cursor: 'pointer'}} onClick={() => onClickDeleteTeacher(item)}>
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
        <CModalHeader closeButton>Hapus Testimoni</CModalHeader>
        <CModalBody>
          {`Anda yakin ingin menghapus testimoni ini ?`}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={deleteTestimony}>Hapus</CButton>
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
