import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import { fetchCertificate } from "../../../store/action/action";
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
];

const Tables = () => {
  const dispatch = useDispatch();
  const certificates = useSelector((state) => state.cmsReducer.certificates);
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchCertificate());
  }, []);

  const redirectPage = (id) => {
    history.push(`/detail/transaction/${id}`);
  }

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Sertifikat</CCardHeader>
            <CCardBody>
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
                      <td className="py-2" onClick={() => redirectPage(item.id)}>
                        {item.file ?
                          <img style={{ width: '50px', display: 'flex', justifyContent: 'center', textAlign: 'center' }} src={item.file}/>
                          :
                          "-"
                        }
                      </td>
                    )
                  }
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Tables;
