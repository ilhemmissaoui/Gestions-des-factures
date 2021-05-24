import {
  Clipboard,
  Users,
  ShoppingCart,
  Plus,
  Compass,
  ShoppingBag,
  Box,
} from "react-feather";
import React from "react";

const companyItems = [
  {
    label: "Sale",
    path: "sales",
    icon: <ShoppingCart className="icon icon-sm mr-2" />,
    role: ["COMPANY"],
    children: [
      {
        path: "estimate",
        label: "Estimate",
      },
      {
        path: "",
        label: "Client Order",
      },
      {
        path: "",
        label: "Delivery Note",
      },
      {
        path: "",
        label: "Invoice",
      },
      {
        path: "",
        label: "Note issue",
      },
    ],
  },
  {
    label: "Purchase",
    path: "purchase",
    icon: <ShoppingBag className="icon icon-sm mr-2" />,
    role: ["COMPANY"],
    children: [
      {
        path: "",
        label: "Supplier Order",
      },
      {
        path: "",
        label: "Supplier Delivery Note",
      },
      {
        path: "",
        label: "Supplier Invoice",
      },
    ],
  },
  {
    label: "Customers",
    path: "customers",
    icon: <Users className="icon icon-sm mr-2" />,
    role: ["COMPANY"],
  },
  {
    label: "Supplier",
    path: "suppliers",
    icon: <Box className="icon icon-sm mr-2" />,
    role: ["COMPANY"],
  },
  {
    label: "Product And Service",
    path: "product_service",
    icon: <Box className="icon icon-sm mr-2" />,
    role: ["COMPANY"],
  },
  {
    label: "Stock",
    path: "stock",
    icon: <Box className="icon icon-sm mr-2" />,
    role: ["COMPANY"],
    children: [
      {
        path: "",
        label: "Stock Managment",
      },
      {
        path: "",
        label: "Inventory",
      },
    ],
  },
];

const adminItems = [
  {
    label: "Sales",
    icon: <ShoppingCart className="icon icon-sm mr-2" />,
    path: "pricing",
    role: ["SUPER_ADMIN"],
    children: [
      {
        path: "",
        label: "Add new",
        icon: <Plus className="icon icon-sm mr-2" />,
      },
      {
        path: "",
        label: "idk",
        icon: <Clipboard className="icon icon-sm mr-2" />,
      },
      {
        path: "",
        label: "yes",
        icon: <Compass className="icon icon-sm mr-2" />,
      },
    ],
  },
  {
    label: "Customers",
    icon: <Users className="icon icon-sm mr-2" />,
    path: "customers",
    role: ["SUPER_ADMIN"],
  },
  { label: "Sells", path: "sells", role: ["COMPANY,SUPER_ADMIN"] },
];

const SideBarElements = [...companyItems, ...adminItems];

export default SideBarElements;
