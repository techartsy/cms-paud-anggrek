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
import { fetchPayment } from "../../../store/action/action";
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
    key: "kode_pembayaran",
    label: "Kode Pembayaran",
  },
  {
    key: "nama_bank",
    label: "Nama Bank",
  },
  {
    // key: "pembayaran_pertama",
    key: "Bukti Pembayaran",
  },
  {
    key: "status",
    label: "Status",
  },
];

const Tables = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.cmsReducer.payments);
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchPayment());
  }, []);

  const redirectPage = (id) => {
    history.push(`/detail/transaction/${id}`);
  }

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Transaksi Pembayaran</CCardHeader>
            <CCardBody>
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
                  'Nama Lengkap': (item, index) => {
                    return <td className="py-2">{item.userPayment.nama_lengkap}</td>
                  },
                  'Bukti Pembayaran': (item, index) => {
                    return (
                      <td className="py-2" onClick={() => redirectPage(item.id)}>
                        {item.pembayaran_pertama ?
                          <img style={{ width: '50px', display: 'flex', justifyContent: 'center', textAlign: 'center' }} src={item.pembayaran_pertama}/>
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
