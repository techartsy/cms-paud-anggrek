import { 
  LOGIN,
  SET_IS_LOGIN,
  GET_ALL_STUDENT,
  SET_ALL_STUDENT,
  FETCH_PAYMENT,
  SET_PAYMENT_RESPONSE,
  FETCH_CERTIFICATE,
  SET_CERTIFICATE,
  FETCH_TEACHER,
  SET_TEACHER,
  ADD_TEACHER,
  REMOVE_TEACHER,
  SET_REMOVE_TEACHER,
  FETCH_GALLERY,
  SET_GALLERY,
  CREATE_GALLERY,
  REMOVE_GALLERY,
  SET_REMOVE_GALLERY,
  CREATE_ARTICLE,
  FETCH_ARTICLE,
  SET_ARTICLE,
  REMOVE_ARTICLE,
  SET_REMOVE_ARTICLE,
  UPDATE_PAYMENT_STATUS,
  SET_PAYMENT_STATUS,
  FETCH_TESTIMONY,
  SET_TESTIMONY,
  REMOVE_TESTIMONY,
  SET_REMOVE_TESTIMONY,
  REMOVE_PAYMENT,
  SET_REMOVE_PAYMENT,
  FETCH_ASSESSMENT,
  SET_ASSESSMENT,
  REMOVE_ASSESSMENT,
  SET_REMOVE_ASSESSMENT,
  REMOVE_CERTIFICATE,
  SET_REMOVE_CERTIFICATE,
} from '../constants';

export const login = (userData, cb) => {
  return {
    type: LOGIN,
    userData,
    cb
  };
}

export const getAllStudent = () => {
  return {
    type: GET_ALL_STUDENT,
  };
}

export const setAllStudents = (students) => {
  return {
    type: SET_ALL_STUDENT,
    students,
  };
}

export const setIsLogin = (value) => {
  return {
    type: SET_IS_LOGIN,
    value,
  };
}

export const fetchPayment = () => {
  return {
    type: FETCH_PAYMENT,
  };
}

export const setPaymentResponse = (response) => {
  return {
    type: SET_PAYMENT_RESPONSE,
    response
  };
}

export const fetchCertificate = () => {
  return {
    type: FETCH_CERTIFICATE,
  };
}

export const setCertificate = (response) => {
  return {
    type: SET_CERTIFICATE,
    response
  };
}

export const fetchTeacher = () => {
  return {
    type: FETCH_TEACHER,
  };
}

export const setTeacher = (response) => {
  return {
    type: SET_TEACHER,
    response
  };
}

export const addTeacher = (teacher, cbSuccess, cbFailed) => {
  return {
    type: ADD_TEACHER,
    teacher,
    cbSuccess,
    cbFailed,
  };
}

export const removeTeacher = (teacher, cbSuccess, cbFailed) => {
  return {
    type: REMOVE_TEACHER,
    teacher,
    cbSuccess,
    cbFailed,
  };
}

export const setRemoveTeacher = (teacher) => {
  return {
    type: SET_REMOVE_TEACHER,
    teacher,
  }
}

export const fetchGallery = () => {
  return {
    type: FETCH_GALLERY,
  };
}

export const setGallery = (response) => {
  return {
    type: SET_GALLERY,
    response
  };
}

export const addGallery = (gallery, cbSuccess, cbFailed) => {
  return {
    type: CREATE_GALLERY,
    gallery,
    cbSuccess,
    cbFailed,
  };
}

export const removeGallery = (gallery, cbSuccess, cbFailed) => {
  return {
    type: REMOVE_GALLERY,
    gallery,
    cbSuccess,
    cbFailed,
  };
}

export const setRemoveGallery = (gallery) => {
  return {
    type: SET_REMOVE_GALLERY,
    gallery,
  }
}

export const addArticle = (article, cbSuccess, cbFailed) => {
  return {
    type: CREATE_ARTICLE,
    article,
    cbSuccess,
    cbFailed,
  };
}

export const fetchArticle = () => {
  return {
    type: FETCH_ARTICLE,
  };
}

export const setArticle = (response) => {
  return {
    type: SET_ARTICLE,
    response
  };
}

export const removeArticle = (article, cbSuccess, cbFailed) => {
  return {
    type: REMOVE_ARTICLE,
    article,
    cbSuccess,
    cbFailed,
  };
}

export const setRemoveArticle = (article) => {
  return {
    type: SET_REMOVE_ARTICLE,
    article,
  }
}

export const updatePaymentStatus = (payment, value, cbSuccess, cbFailed) => {
  return {
    type: UPDATE_PAYMENT_STATUS,
    payment,
    value,
    cbSuccess,
    cbFailed,
  };
}

export const setPaymentStatus = (payment, value) => {
  return {
    type: SET_PAYMENT_STATUS,
    payment,
    value
  }
}

export const fetchTestimony = () => {
  return {
    type: FETCH_TESTIMONY,
  };
}

export const setTestimony = (response) => {
  return {
    type: SET_TESTIMONY,
    response
  };
}

export const removeTestimony = (testimony, cbSuccess, cbFailed) => {
  return {
    type: REMOVE_TESTIMONY,
    testimony,
    cbSuccess,
    cbFailed,
  };
}

export const setRemoveTestimony = (testimony) => {
  return {
    type: SET_REMOVE_TESTIMONY,
    testimony,
  }
}

export const removePayment = (payment, cbSuccess, cbFailed) => {
  return {
    type: REMOVE_PAYMENT,
    payment,
    cbSuccess,
    cbFailed,
  };
}

export const setRemovePayment = (payment) => {
  return {
    type: SET_REMOVE_PAYMENT,
    payment,
  }
}

export const fetchAssessment = () => {
  return {
    type: FETCH_ASSESSMENT,
  };
}

export const setAssessment = (response) => {
  return {
    type: SET_ASSESSMENT,
    response
  };
}

export const removeAssessment = (assessment, cbSuccess, cbFailed) => {
  return {
    type: REMOVE_ASSESSMENT,
    assessment,
    cbSuccess,
    cbFailed,
  };
}

export const setRemoveAssessment = (assessment) => {
  return {
    type: SET_REMOVE_ASSESSMENT,
    assessment,
  }
}

export const removeCertificate = (certificate, cbSuccess, cbFailed) => {
  return {
    type: REMOVE_CERTIFICATE,
    certificate,
    cbSuccess,
    cbFailed,
  };
}

export const setRemoveCertificate = (certificate) => {
  return {
    type: SET_REMOVE_CERTIFICATE,
    certificate,
  }
}

export const setResponsive = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "SET",
      payload: payload,
    });
  };
};
