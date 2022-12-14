import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
// import { login, resetErrorMsg } from "../../../store/action/action";
import { login } from "../../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((state) => state.cmsReducer.isLogin);
  const errorMsg = useSelector((state) => state.cmsReducer.errorMsg);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      history.push("/dashboard");
    } else if (isLogin) {
      history.push("/dashboard");
    }
  }, [isLogin]);

  useEffect(() => {
    setTimeout(() => {
      // dispatch(resetErrorMsg());
    }, 3000);
  }, [errorMsg]);

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
    if (isLogin) {
      history.push("/dashboard");
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={(e) => onSubmit(e)}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        required
                        placeholder="Username"
                        autoComplete="Username"
                        onChange={(e) => changeUsername(e)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        required
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => changePassword(e)}
                      />
                    </CInputGroup>
                    {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          type="submit"
                          className="px-4 text-white"
                          style={{ backgroundColor: "rgb(60, 75, 100)" }}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                  <CRow className="justify-content-center">
                    <p style={{ marginTop: "2rem", marginBottom: "-35px" }}>
                      Paud Anggrek 05 &copy; 2022
                    </p>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5 d-md-down-none"
                style={{
                  width: "44%",
                  backgroundColor: "rgb(60, 75, 100)",
                }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Paud Anggrek 05</h2>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
