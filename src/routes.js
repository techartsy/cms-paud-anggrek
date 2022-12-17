import React from "react";

const Student = React.lazy(() => import("./views/base/tables/Students"));
const Payment = React.lazy(() => import("./views/base/tables/Payment"));
const Certificate = React.lazy(() => import("./views/base/tables/Certificate"));
const Teacher = React.lazy(() => import("./views/base/tables/Teacher"));
const Gallery = React.lazy(() => import("./views/base/tables/Gallery"));
const Article = React.lazy(() => import("./views/base/tables/Article"));
const Testimony = React.lazy(() => import("./views/base/tables/Testimony"));
const Assessment = React.lazy(() => import("./views/base/tables/Assessment"));
const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
const AddTeacher = React.lazy(() => import("./views/base/forms/addTeacher"));
const AddGallery = React.lazy(() => import("./views/base/forms/addGallery"));
const AddArticle = React.lazy(() => import("./views/base/forms/addArticle"));
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/student", name: "Siswa", component: Student },
  { path: "/Payment", name: "Pembayaran", component: Payment },
  { path: "/certificate", name: "Sertifikat", component: Certificate },
  { path: "/teacher", name: "Guru", component: Teacher },
  { path: "/gallery", name: "Galeri", component: Gallery },
  { path: "/article", name: "Artikel", component: Article },
  { path: "/assessment", name: "Penilaian", component: Assessment },
  { path: "/testimony", name: "Testimoni", component: Testimony },
  { path: "/create/teacher", name: "Tambah Guru", component: AddTeacher },
  { path: "/create/gallery", name: "Tambah Galeri", component: AddGallery },
  { path: "/create/article", name: "Tambah Artikel", component: AddArticle },
];

export default routes;
