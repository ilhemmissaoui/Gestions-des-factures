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
    path: "sale",
    icon: <ShoppingCart className="icon icon-sm mr-2" />,
    role: ["COMPANY", "SALES_MANAGER"],
    children: [
      {
        path: "estimate",
        label: "Estimate",
      },
      {
        path: "client_order",
        label: "Client Order",
      },
      {
        path: "delivery_note",
        label: "Delivery Note",
      },
      {
        path: "invoice",
        label: "Invoice",
      },
      {
        path: "issue_note",
        label: "Issue Note",
      },
    ],
  },
  {
    label: "Purchase",
    path: "purchase",
    icon: <ShoppingBag className="icon icon-sm mr-2" />,
    role: ["COMPANY","PURCHASING_MANAGER"],
    children: [
      {
        path: "supplier_order",
        label: "Supplier Order",
      },
      {
        path: "supplier_delivery_note",
        label: "Supplier Delivery Note",
      },
      {
        path: "supplier_invoice",
        label: "Supplier Invoice",
      },
    ],
  },

  {
    label: "Customers",
    path: "customers",
    icon: <Users className="icon icon-sm mr-2" />,
    role: ["COMPANY", "SALES_MANAGER"],
  },
  {
    label: "Supplier",
    path: "suppliers",
    icon: <Box className="icon icon-sm mr-2" />,
    role: ["COMPANY","PURCHASING_MANAGER"],
  },
  {
    label: "Product And Service",
    path: "product_service",
    icon: <Box className="icon icon-sm mr-2" />,
    role: ["COMPANY", "SALES_MANAGER"],
  },

  {
    label: "Accounting",
    path: "accounting",
    icon: <ShoppingBag className="icon icon-sm mr-2" />,
    role: ["COMPANY"],
    children: [
      {
        path: "cash_management",
        label: "Cash Management",
      },
      {
        path: "bank_account",
        label: "Bank Account",
      },
      {
        path: "cheque",
        label: "cheque",
      },
      {
        path: "balance_customer",
        label: "Balance Customer",
      },
      {
        path: "balance_supplier",
        label: "Balance Supplier",
      },
    ],
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
