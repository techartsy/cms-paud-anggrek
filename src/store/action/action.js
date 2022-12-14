// export const fetchParticipants = () => {
//   return (dispatch) => {
//     axios({
//       url: `${baseUrl}guest`,
//       method: "GET",
//     })
//       .then(({ data }) => {
//         dispatch({
//           type: "FETCH_PARTICIPANTS",
//           payload: data?.data?.guests,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// export const fetchGiftConfirmation = () => {
//   return (dispatch) => {
//     axios({
//       url: `${baseUrl}gift`,
//       method: "GET",
//     })
//       .then(({ data }) => {
//         dispatch({
//           type: "FETCH_GIFT_CONFIRMATION",
//           payload: data?.data?.gifts,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// export const login = (userData) => {
//   return (dispatch) => {
//     axios({
//       url: `${baseUrl}admin/login`,
//       method: "POST",
//       data: userData,
//     })
//       .then(({ data }) => {
//         if (data && data.access_token) {
//           const { access_token } = data;
//           localStorage.setItem("access_token", access_token);
//           dispatch({
//             type: "SET_IS_LOGIN",
//             payload: true,
//           });
//         }
//       })
//       .catch(({ response }) => {
//         dispatch({
//           type: "SET_ERROR_MESSAGE",
//           payload: response.data.message,
//         });
//       });
//   };
// };

// export const deleteMemberDispatcher = (memberId) => {
//   return (dispatch) => {
//     const token = localStorage.getItem("access_token");
//     axios({
//       url: `${baseUrl}delete/${memberId}`,
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(({ data }) => {
//         dispatch({
//           type: "DELETE_MEMBER",
//           payload: memberId,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// export const setIsLogin = (isLogin) => {
//   return (dispatch) => {
//     dispatch({
//       type: "SET_IS_LOGIN",
//       payoad: isLogin,
//     });
//   };
// };

// export const resetErrorMsg = () => {
//   return (dispatch) => {
//     dispatch({
//       type: "RESET_ERROR_MESSAGE",
//     });
//   };
// };

import { 
  LOGIN,
  SET_IS_LOGIN,
  GET_ALL_STUDENT,
  SET_ALL_STUDENT,
  FETCH_PAYMENT,
  SET_PAYMENT_RESPONSE,
  FETCH_CERTIFICATE,
  SET_CERTIFICATE,
} from '../constants';

export const login = (userData) => {
  return {
    type: LOGIN,
    userData,
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

export const setResponsive = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "SET",
      payload: payload,
    });
  };
};
