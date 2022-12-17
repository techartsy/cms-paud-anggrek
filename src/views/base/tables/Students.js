import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CBadge,
  CButton,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CAlert,
  CFormGroup,
  CLabel,
  CInput,
  CContainer
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import { getAllStudent, removeStudent } from "../../../store/action/action";
// import Excel from "../../Excel";

// const fields = ['nama', 'nomor', 'telepon', 'alamat', 'attend', 'pax', 'message', 'action'];
const fields = [
  {
    key: "No",
    sorter: true,
  },
  // { key: "name" },
  // { key: "attend" },
  {
    key: "nama_lengkap",
    label: "Nama Lengkap",
  },
  {
    key: "tempat_lahir",
    label: "Tempat Lahir",
  },
  {
    key: "kelompok_belajar",
    label: "Kelompok Belajar",
  },
  {
    key: "jenis_kelamin",
    label: "Jenis Kelamin",
  },
  {
    key: "nomor_pendaftaran",
    label: "Nomor Pendaftaran",
  },
  {
    key: "Status Pendaftaran",
  },
  {
    key: "Action",
  },
];

const Tables = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.cmsReducer.students);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [failedDelete, setFailedDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    dispatch(getAllStudent());
  }, []);

  const getBadge = (status)=>{
    switch (status.toLowerCase()) {
      case 'approved': return 'success'
      case 'pending': return 'secondary'
      case 'waiting approval': return 'warning'
      case 'cancel': return 'danger'
      default: return 'primary'
    }
  }

  
  const onClickDeleteUser = (payment) => {
    setShowDeletePopup(true)
    setSelectedUser(payment);
  }

  const deleteUser = () => {
    setShowDeletePopup(false);
    dispatch(removeStudent(
      selectedUser,
      () => {
        setSuccessDelete(true)
      },
      () => {
        setFailedDelete(true);
      }
      ));
  }

  const openDetail = (user) => {
    setSelectedUser(user);
    setShowDetail(true);
  }

  return (
    <CContainer fluid>
      <CRow>
        <CCol xs="12" lg="12">
          {successDelete && <CAlert color="success" closeButton>
            Siswa Berhasil Dihapus
          </CAlert>}
          {failedDelete && <CAlert color="warning" closeButton>
            Mohon Maaf, Terjadi Kesalahan Pada Sistem. Silakan Coba Lagi
          </CAlert>}
          <CCard>
            <CCardHeader>Data Siswa</CCardHeader>
            <CCardBody style={{textAlign: 'center'}}>
              <CDataTable
                items={students && students}
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
                  'Status Pendaftaran':
                    (item)=>(
                      <td>
                        <CBadge style={{padding: '5%'}} color={getBadge(item.status_pendaftaran)}>
                          {item.status_pendaftaran}
                        </CBadge>
                      </td>
                    ),
                  'Action': (item, index) => {
                    return (
                      <td className="py-2" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CButton color="warning" size="sm" style={{cursor: 'pointer', marginRight: '4%'}} onClick={() => openDetail(item)}>
                          Detail
                        </CButton>
                        <CButton color="danger" size="sm" style={{cursor: 'pointer'}} onClick={() => onClickDeleteUser(item)}>
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
            show={showDeletePopup}
            onClose={() => setShowDeletePopup(false)}
          >
            <CModalHeader closeButton>Hapus Siswa</CModalHeader>
            <CModalBody>
              {`Anda yakin ingin menghapus ${selectedUser?.nama_lengkap} ?`}
            </CModalBody>
            <CModalFooter>
              <CButton color="danger" onClick={deleteUser}>Hapus</CButton>
              <CButton
                color="secondary"
                onClick={() => setShowDeletePopup(false)}
              >Tutup</CButton>
            </CModalFooter>
          </CModal>
            {/* <Excel csvData={participants} fileName={"Data Tamu Undangan"} /> */}
        </CCol>
      </CRow>
      {showDetail &&
        <>
        <CRow>
          <CCol sm="12">
            <CCard>
              <CCardHeader onClick={() => setShowDetail(false)} style={{display: 'flex', justifyContent: 'flex-end', cursor: 'pointer'}}>&times;</CCardHeader>
              <CCardBody style={{textAlign: 'center'}}>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">NIK</span>
                  <input disabled type="text" value={selectedUser?.nik_anak} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Nama Lengkap</span>
                  <input disabled type="text" value={selectedUser?.nama_lengkap} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Nama Panggilan</span>
                  <input disabled type="text" value={selectedUser?.nama_panggilan} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                  <input disabled type="text" value={selectedUser?.email} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Tempat Lahir</span>
                  <input disabled type="text" value={selectedUser?.tempat_lahir} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Jenis Kelamin</span>
                  <input disabled type="text" value={selectedUser?.jenis_kelamin} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Agama</span>
                  <input disabled type="text" value={selectedUser?.agama} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Anak ke</span>
                  <input disabled type="text" value={selectedUser?.anak_ke_dari} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Tinggi Badan</span>
                  <input disabled type="text" value={selectedUser?.tinggi_badan} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Berat Badan</span>
                  <input disabled type="text" value={selectedUser?.berat_badan} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Alamat</span>
                  <input disabled type="text" value={selectedUser?.alamat_rumah} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Penyakit Diderita</span>
                  <input disabled type="text" value={selectedUser?.penyakit_diderita} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Penyakit Berat</span>
                  <input disabled type="text" value={selectedUser?.penyakit_berat} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Pantangan Makan</span>
                  <input disabled type="text" value={selectedUser?.pantangan_makan} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CCard>
              <CCardHeader onClick={() => setShowDetail(false)}>Data Ayah</CCardHeader>
              <CCardBody style={{textAlign: 'center'}}>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Nama Ayah</span>
                  <input disabled type="text" value={selectedUser?.nama_ayah} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Telpon Ayah</span>
                  <input disabled type="text" value={selectedUser?.telpon_ayah} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Pekerjaan Ayah</span>
                  <input disabled type="text" value={selectedUser?.pekerjaan_ayah} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Pendidikan</span>
                  <input disabled type="text" value={selectedUser?.pendidikan_ayah} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Agama</span>
                  <input disabled type="text" value={selectedUser?.agama_ayah} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Penghasilan</span>
                  <input disabled type="text" value={selectedUser?.penghasilan_ayah} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CCard>
              <CCardHeader onClick={() => setShowDetail(false)}>Data Ibu</CCardHeader>
              <CCardBody style={{textAlign: 'center'}}>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Nama Ibu</span>
                  <input disabled type="text" value={selectedUser?.nama_ibu} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Telpon Ibu</span>
                  <input disabled type="text" value={selectedUser?.telpon_ibu} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Pekerjaan Ibu</span>
                  <input disabled type="text" value={selectedUser?.pekerjaan_ibu} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Pendidikan</span>
                  <input disabled type="text" value={selectedUser?.pendidikan_ibu} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Agama</span>
                  <input disabled type="text" value={selectedUser?.agama_ibu} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  <span class="input-group-text" id="inputGroup-sizing-default">Penghasilan</span>
                  <input disabled type="text" value={selectedUser?.penghasilan_ibu} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
      }
    </CContainer>
  );
};

export default Tables;
