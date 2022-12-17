import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CBadge,
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import { getAllStudent } from "../../../store/action/action";
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
    // label: "Status Pendaftaran",
  },
];

const Tables = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.cmsReducer.students);
  const [totalPax, setTotalPax] = useState(0);
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

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
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
                }}
              />
              {/* <p style={{float: 'right'}}>Total Pax: {totalPax} Person</p> */}
            </CCardBody>
            
          </CCard>
            {/* <Excel csvData={participants} fileName={"Data Tamu Undangan"} /> */}
        </CCol>
      </CRow>
    </>
  );
};

export default Tables;
