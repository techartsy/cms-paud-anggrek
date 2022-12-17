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
import { fetchTeacher, removeTeacher } from "../../../store/action/action";
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
    key: "jabatan",
    label: "Jabatan",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "no_telpon",
    label: "Nomor Telpon",
  },
  {
    key: "image",
  },
  {
    key: "Action",
  },
];

const Tables = () => {
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [successDelete, setSuccessDelete] = useState(false);
  const [failedDelete, setFailedDelete] = useState(false);
  const teachers = useSelector((state) => state.cmsReducer.teachers);
  useEffect(() => {
    dispatch(fetchTeacher());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFailedDelete(false);
      setSuccessDelete(false);
    }, 3000);
  }, [successDelete, failedDelete]);

  const onClickDeleteTeacher = (teacher) => {
    setShowDeletePopup(true)
    setSelectedTeacher(teacher);
  }

  const deleteTeacher = () => {
    setShowDeletePopup(false);
    dispatch(removeTeacher(
      selectedTeacher,
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
            <CCardHeader>Data Guru</CCardHeader>
            {successDelete && <CAlert color="success" closeButton>
              Guru Berhasil Dihapus
            </CAlert>}
            {failedDelete && <CAlert color="warning" closeButton>
              Mohon Maaf, Terjadi Kesalahan Pada Sistem. Silakan Coba Lagi
            </CAlert>}
            <CCardBody style={{textAlign: 'center'}}>
              <CDataTable
                items={teachers && teachers}
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
                          <CImg src={item.image} thumbnail width={50} />
                          :
                          '-'
                        }
                      </td>
                    )
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
        <CModalHeader closeButton>Hapus Guru</CModalHeader>
        <CModalBody>
          {`Anda yakin ingin menghapus ${selectedTeacher?.nama} ?`}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={deleteTeacher}>Hapus</CButton>
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
