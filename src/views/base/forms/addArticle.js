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
  CRow,
  CTextarea
} from '@coreui/react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addArticle } from '../../../store/action/action';

const AddArticle = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [displayImg, setDisplayImg] = useState(null);
  const [formArticle, setFormArticle] = useState({
    title: '',
    description: '',
    category: '',
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
    setFormArticle({
      ...formArticle,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
  }

  const submitForm = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.set('title', formArticle.title);
    formData.set('description', formArticle.description);
    formData.set('category', formArticle.category);
    formData.set('image', formArticle.image[0], formArticle.image[0].name);
    dispatch(addArticle(formData, () => {
      setFormArticle({
        title: '',
        image: '',
        description: '',
        category: '',
      });
      setIsSuccess(true);
      setTimeout(() => {
        history.push('/article');
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
            Artikel Berhasil Ditambahkan
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
              <CLabel htmlFor="category">Kategori</CLabel>
              <CSelect required name='category' onChange={(e) => updateForm(e)}>
                <option disabled selected>-- Pilih --</option>
                <option value="Kegiatan">Kegiatan</option>
                <option value="Prestasi">Prestasi</option>
              </CSelect>
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
                value={formArticle.title}
                required
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="description">Deskripsi</CLabel>
              <CTextarea
                size="md"
                onChange={(e) => updateForm(e)}
                type="text"
                id="description"
                name="description"
                placeholder="Deskripsi Artikel"
                autoComplete="name"
                value={formArticle.description}
                required
              />
            </CFormGroup>
            <CButton type='submit' color="success" block>Tambah Artikel</CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddArticle
