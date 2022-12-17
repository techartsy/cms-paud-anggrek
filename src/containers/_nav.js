import React from "react";

const _nav = [
  {
    _tag: "CSidebarNavDropdown",
    name: "Siswa",
    route: "/home",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Data Siswa",
        to: "/student",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Transaksi Pembayaran",
        to: "/payment",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sertifikat",
        to: "/certificate",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Guru",
    route: "/home",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Data Guru",
        to: "/teacher",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Tambah Guru",
        to: "/create/teacher",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Penilaian Guru",
        to: "/assessment",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Galeri",
    route: "/home",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Data Galeri",
        to: "/gallery",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Tambah Galeri",
        to: "/create/gallery",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Artikel",
    route: "/home",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Data Artikel",
        to: "/article",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Tambah Artikel",
        to: "/create/article",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Testimoni",
    route: "/home",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Data Testimoni",
        to: "/testimony",
      },
    ],
  },
];

export default _nav;
