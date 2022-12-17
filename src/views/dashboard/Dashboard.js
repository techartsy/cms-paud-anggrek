import React, { lazy } from "react";
import { CCard, CCardBody } from "@coreui/react";
import TableMember from "../base/tables/Students";
import TablePayment from "../base/tables/Payment";
import TableArticle from "../base/tables/Article";
import TableGallery from "../base/tables/Gallery";

const Dashboard = () => {
  return (
    <>
      <CCard>
        <CCardBody>
          <TableMember />
          <TablePayment />
          <TableArticle />
          <TableGallery />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
