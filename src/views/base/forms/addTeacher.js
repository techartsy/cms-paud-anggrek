import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CInput,
  CFormGroup,
  CLabel,
  CSelect,
  CAlert,
  CRow
} from '@coreui/react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addTeacher } from '../../../store/action/action';

const AddTeacher = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [errMsg, setErrMsg] = useState('')
  const [displayImg, setDisplayImg] = useState(null);
  const [formTeacher, setFormTeacher] = useState({
    nama: '',
    email: '',
    no_telpon: '',
    password: '',
    jabatan: ''
  });

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
    },5000)
  }, [isSuccess])

  useEffect(() => {
    setTimeout(() => {
      setIsFailed(false);
    },5000)
  }, [isFailed])

  const updateForm = (e) => {
    if (e.target.files) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setDisplayImg(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setFormTeacher({
      ...formTeacher,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
  }

  const submitForm = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.set('nama', formTeacher.nama);
    formData.set('email', formTeacher.email);
    formData.set('no_telpon', formTeacher.no_telpon);
    formData.set('jabatan', formTeacher.jabatan);
    formData.set('password', formTeacher.password);
    formData.set('image', formTeacher.image[0], formTeacher.image[0].name);
    dispatch(addTeacher(formData, () => {
      setFormTeacher({
        nama: '',
        email: '',
        no_telpon: '',
        password: '',
        jabatan: '',
        image: '',
      });
      setIsSuccess(true);
      setTimeout(() => {
        history.push('/teacher');
      }, 2000);
    },
    (error) => {
      setErrMsg(error)
      setIsFailed(true);
    }
    ));
  }

  return (
    <CContainer fluid>
      <CRow className="justify-content-center">
        <CCol sm="6">
          {isSuccess && <CAlert color="success" closeButton>
            Guru Berhasil Ditambahkan
          </CAlert>}
          {isFailed && <CAlert color="warning" closeButton>
            {errMsg}
          </CAlert>}
          <CForm onSubmit={submitForm}>
            <CFormGroup style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img style={{ width: '150px'}} src={displayImg ? displayImg : "https://tse1.mm.bing.net/th?id=OIP.zsaaVp0tIiSnOK-1rYpBnwAAAA&pid=Api&P=0"} />
              <input
                style={{ marginTop: '4%', marginLeft: '15%'}}
                onChange={(e) => updateForm(e)}
                type="file"
                name="image"
                required
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="name">Nama</CLabel>
              <CInput
                onChange={(e) => updateForm(e)}
                type="text"
                id="nf-email"
                name="nama"
                placeholder="Nama Lengkap.."
                autoComplete="name"
                value={formTeacher.nama}
                required
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="email">Email</CLabel>
              <CInput
                onChange={(e) => updateForm(e)}
                type="email"
                id="email"
                name="email"
                placeholder="Email.."
                autoComplete="email"
                value={formTeacher.email}
                required
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="no_telpon">Nomor Telpon</CLabel>
              <CInput
                onChange={(e) => updateForm(e)}
                type="text"
                id="no_telpon"
                name="no_telpon"
                placeholder="Nomor Telpon"
                autoComplete="number"
                value={formTeacher.no_telpon}
                required
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="jabatan">Jabatan</CLabel>
              <CSelect required name='jabatan' onChange={(e) => updateForm(e)}>
                <option disabled selected>-- Pilih --</option>
                <option value="Kepala Sekolah">Kepala Sekolah</option>
                <option value="Bendahara">Bendahara</option>
                <option value="Sekretaris">Sekretaris</option>
                <option value="Guru">Guru</option>
              </CSelect>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="password">Password</CLabel>
              <CInput
                onChange={(e) => updateForm(e)}
                type="password"
                id="password"
                name="password"
                placeholder="Password.."
                autoComplete="current-password"
                value={formTeacher.password}
                required
              />
            </CFormGroup>
            <CButton type='submit' color="success" block>Tambah Guru</CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddTeacher
