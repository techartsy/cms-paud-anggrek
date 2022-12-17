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
import { addGallery } from '../../../store/action/action';

const AddGallery = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [displayImg, setDisplayImg] = useState(null);
  const [formGallery, setFormGallery] = useState({
    title: '',
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
    setFormGallery({
      ...formGallery,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
  }

  const submitForm = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.set('title', formGallery.title);
    formData.set('image', formGallery.image[0], formGallery.image[0].name);
    dispatch(addGallery(formData, () => {
      setFormGallery({
        title: '',
        image: '',
      });
      setIsSuccess(true);
      setTimeout(() => {
        history.push('/gallery');
      }, 2000);
    },
    () => {
      setIsFailed(true);
    }
    ));
  }

  return (
    <CContainer fluid>
      <CRow className="justify-content-center">
        <CCol sm="6">
          {isSuccess && <CAlert color="success" closeButton>
            Galeri Berhasil Ditambahkan
          </CAlert>}
          {isFailed && <CAlert color="warning" closeButton>
            Mohon Maaf, Terjadi Kesalahan Pada Sistem. Silakan Coba Lagi
          </CAlert>}
          <CForm onSubmit={submitForm}>
            <CFormGroup style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img style={{ width: '450px'}} src={displayImg ? displayImg : "https://simasda.bandungkab.go.id/images/no-image-dataset.png"} />
              <input
                style={{ marginTop: '4%', marginLeft: '15%'}}
                onChange={(e) => updateForm(e)}
                type="file"
                name="image"
                required
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="title">Judul</CLabel>
              <CInput
                onChange={(e) => updateForm(e)}
                type="text"
                id="title"
                name="title"
                placeholder="Masukan Judul"
                autoComplete="name"
                value={formGallery.title}
                required
              />
            </CFormGroup>
            <CButton type='submit' color="success" block>Tambah Galeri</CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddGallery
