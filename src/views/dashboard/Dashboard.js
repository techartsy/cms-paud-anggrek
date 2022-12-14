import React, { lazy } from "react";
import { CCard, CCardBody } from "@coreui/react";
import TableMember from "../base/tables/Students";

const Dashboard = () => {
  return (
    <>
      <CCard>
        <CCardBody>
          <TableMember />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
