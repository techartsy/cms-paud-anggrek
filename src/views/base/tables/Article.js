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
import { fetchArticle, removeArticle } from "../../../store/action/action";

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
    key: "description",
    label: "Deskripsi",
  },
  {
    key: 'category',
    label: 'Kategori'
  },
  {
    key: "timestamp",
    label: "Timestamp",
  },
  {
    key: "Action",
  },
];

const Article = () => {
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [successDelete, setSuccessDelete] = useState(false);
  const [failedDelete, setFailedDelete] = useState(false);
  const articles = useSelector((state) => state.cmsReducer.articles);

  useEffect(() => {
    dispatch(fetchArticle());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFailedDelete(false);
      setSuccessDelete(false);
    }, 3000);
  }, [successDelete, failedDelete]);

  const onClickDeleteArticle = (article) => {
    setShowDeletePopup(true)
    setSelectedArticle(article);
  }

  const deleteArticle = () => {
    setShowDeletePopup(false);
    dispatch(removeArticle(
      selectedArticle,
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
            <CCardHeader>Data Artikel</CCardHeader>
            {successDelete && <CAlert color="success" closeButton>
              Artikel Berhasil Dihapus
            </CAlert>}
            {failedDelete && <CAlert color="warning" closeButton>
              Mohon Maaf, Terjadi Kesalahan Pada Sistem. Silakan Coba Lagi
            </CAlert>}
            <CCardBody style={{textAlign: 'center'}}>
              <CDataTable
                items={articles && articles}
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
                        <CButton color="danger" size="sm" style={{cursor: 'pointer'}} onClick={() => onClickDeleteArticle(item)}>
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
        <CModalHeader closeButton>Hapus Artikel</CModalHeader>
        <CModalBody>
          {`Anda yakin ingin menghapus ${selectedArticle?.title} ?`}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={deleteArticle}>Hapus</CButton>
          <CButton
            color="secondary"
            onClick={() => setShowDeletePopup(false)}
          >Tutup</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Article;
