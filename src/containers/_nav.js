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
        to: "/invitation/guests",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Transaksi Pembayaran",
        to: "/invitation/payment",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sertifikat",
        to: "/invitation/certificate",
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
        to: "/invitation/guests",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Transaksi Pembayaran",
      //   to: "/invitation/payment",
      // },
    ],
  },
];

export default _nav;
