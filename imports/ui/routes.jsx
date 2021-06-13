import { Meteor } from "meteor/meteor";
import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import Login from "./pages/Auth/login";
import Authorized from "./components/authorized";
import SignUp from "./pages/Auth/signup";
import DashboardAdmin from "./pages/Dashboard/AdminDashboard";
import Forgot from "./pages/Auth/ForgotPassword";
import AdminLayout from "../ui/layouts/AdminLayout";
import Public from "../ui/layouts/Public";
import {
  SUPER_ADMIN,
  COMPANY,
  SALES_MANAGER,
  PURCHASING_MANAGER,
} from "../api/roles";
import Devis from "./pages/Dashboard/ventes/Devis";
import CompanyLayout from "../ui/layouts/CompanyLayout";
import ClientsList from "../ui/pages/Dashboard/Clients/ClientsList";
import Print from "./pages/Print";
import Profile from "./pages/Dashboard/ventes/Profile";
import Setting from "./pages/Dashboard/ventes/Setting";
import Notification from "./pages/Dashboard/ventes/Notification";
import ContactUs from "./ContactUs";
import CustomersList from "./pages/company/customers/list";
import AddCustomer from "./pages/company/customers/AddCustomer";
import Estimate from "./pages/company/sale/Estimate";
import ClientOrder from "./pages/company/sale/ClientOrder";
import DeliveryNote from "./pages/company/sale/DeliveryNote";
import Invoice from "./pages/company/sale/Invoice";
import IssueNote from "./pages/company/sale/IssueNote";
import AddSales from "./pages/company/sale/AddSales";
import ListProducts from "./pages/company/product_service/ListProducts";
import AddProduct from "./pages/company/product_service/AddProduct";
import SupplierOrder from "./pages/company/purchase/SupplierOrder";
import SupplierDeliveryNote from "./pages/company/purchase/SupplierDeliveryNote";
import SupplierInvoice from "./pages/company/purchase/SupplierInvoice";
import AddPurchases from "./pages/company/purchase/AddPurchases";
import ListSupplier from "./pages/company/suppliers/ListSupplier";
import AddSupplier from "./pages/company/suppliers/AddSupplier";
import UsersList from "./pages/company/company-users/list";
import AddUser from "./pages/company/company-users/Adduser";
import PrintForm from "./pages/company/sale/PrintForm";
import PurchaseStock from "./pages/company/Stock/PurchaseStock";
import SalesStock from "./pages/company/Stock/SaleStock";

const Routes = (props) => {
  let loggingIn = true;
  let user;

  if (Meteor.isClient) {
    loggingIn = useTracker(() => Meteor.loggingIn());
    user = useTracker(() => Meteor.user());
  }
  const authenticated = !loggingIn && !!user;
  return loggingIn || Meteor.isServer ? (
    <></>
  ) : (
    <BrowserRouter>
      <Switch>
        <Public
          exact
          path="/login"
          component={Login}
          {...props}
          authenticated={authenticated}
        />
        <Public
          exact
          path="/signup"
          component={SignUp}
          {...props}
          authenticated={authenticated}
        />
        <Public
          exact
          path="/"
          component={Login}
          {...props}
          authenticated={authenticated}
        />
        <Public
          exact
          path="/forgot-password"
          component={Forgot}
          {...props}
          authenticated={authenticated}
        />

        <CompanyLayout path="/company" {...props}>
          <Switch>
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/customers"
              pathAfterFailure="/401"
              component={CustomersList}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/prchase_stock"
              pathAfterFailure="/401"
              component={PurchaseStock}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/sale_stock"
              pathAfterFailure="/401"
              component={SalesStock}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/suppliers"
              pathAfterFailure="/401"
              component={ListSupplier}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/estimate/add_sale"
              pathAfterFailure="/401"
              component={AddSales}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/estimate/print/:id"
              pathAfterFailure="/401"
              component={PrintForm}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/client_order/add_sale"
              pathAfterFailure="/401"
              component={AddSales}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/delivery_note/add_sale"
              pathAfterFailure="/401"
              component={AddSales}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/invoice/add_sale"
              pathAfterFailure="/401"
              component={AddSales}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/issue_note/add_sale"
              pathAfterFailure="/401"
              component={AddSales}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/delivery_note"
              pathAfterFailure="/401"
              component={DeliveryNote}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/client_order"
              pathAfterFailure="/401"
              component={ClientOrder}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/estimate"
              pathAfterFailure="/401"
              component={Estimate}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/supplier_order"
              pathAfterFailure="/401"
              component={SupplierOrder}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/supplier_delivery_note"
              pathAfterFailure="/401"
              component={SupplierDeliveryNote}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/supplier_invoice"
              pathAfterFailure="/401"
              component={SupplierInvoice}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/invoice"
              pathAfterFailure="/401"
              component={Invoice}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/product_service"
              pathAfterFailure="/401"
              component={ListProducts}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/issue_note"
              pathAfterFailure="/401"
              component={IssueNote}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/customers/add"
              pathAfterFailure="/401"
              component={AddCustomer}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/suppliers/add_supplier"
              pathAfterFailure="/401"
              component={AddSupplier}
              {...props}
            />

            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/product_service/add"
              pathAfterFailure="/401"
              component={AddProduct}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/supplier_order/add_purchases"
              pathAfterFailure="/401"
              component={AddPurchases}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/users"
              pathAfterFailure="/401"
              component={UsersList}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/users/add"
              pathAfterFailure="/401"
              component={AddUser}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/supplier_delivery_note/add_purchases"
              pathAfterFailure="/401"
              component={AddPurchases}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[COMPANY]}
              path="/company/supplier_invoice/add_purchases"
              pathAfterFailure="/401"
              component={AddPurchases}
              {...props}
            />
          </Switch>
        </CompanyLayout>

        {/*  */}
        <CompanyLayout path="/sales_manager" {...props}>
          <Switch>
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/customers"
              pathAfterFailure="/401"
              component={CustomersList}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/estimate/print/:id"
              pathAfterFailure="/401"
              component={PrintForm}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/customers/add"
              pathAfterFailure="/401"
              component={AddCustomer}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/estimate/add_sale"
              pathAfterFailure="/401"
              component={AddSales}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/client_order/add_sale"
              pathAfterFailure="/401"
              component={AddSales}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/delivery_note/add_sale"
              pathAfterFailure="/401"
              component={AddSales}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/invoice/add_sale"
              pathAfterFailure="/401"
              component={AddSales}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/issue_note/add_sale"
              pathAfterFailure="/401"
              component={AddSales}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/delivery_note"
              pathAfterFailure="/401"
              component={DeliveryNote}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/client_order"
              pathAfterFailure="/401"
              component={ClientOrder}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/estimate"
              pathAfterFailure="/401"
              component={Estimate}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/product_service"
              pathAfterFailure="/401"
              component={ListProducts}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SALES_MANAGER]}
              path="/sales_manager/product_service/add"
              pathAfterFailure="/401"
              component={AddProduct}
              {...props}
            />
          </Switch>
        </CompanyLayout>
        {/*  */}
        <CompanyLayout path="/purchasing_manager" {...props}>
          <Switch>
            <Authorized
              exact
              allowedRoles={[PURCHASING_MANAGER]}
              path="/purchasing_manager/suppliers"
              pathAfterFailure="/401"
              component={ListSupplier}
              {...props}
            />

            <Authorized
              exact
              allowedRoles={[PURCHASING_MANAGER]}
              path="/purchasing_manager/suppliers/add_supplier"
              pathAfterFailure="/401"
              component={AddSupplier}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[PURCHASING_MANAGER]}
              path="/purchasing_manager/supplier_order/add_purchases"
              pathAfterFailure="/401"
              component={AddPurchases}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[PURCHASING_MANAGER]}
              path="/purchasing_manager/supplier_order"
              pathAfterFailure="/401"
              component={SupplierOrder}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[PURCHASING_MANAGER]}
              path="/purchasing_manager/supplier_delivery_note/add_purchases"
              pathAfterFailure="/401"
              component={AddPurchases}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[PURCHASING_MANAGER]}
              path="/purchasing_manager/supplier_delivery_note"
              pathAfterFailure="/401"
              component={SupplierDeliveryNote}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[PURCHASING_MANAGER]}
              path="/purchasing_manager/delivery_note/add_sale"
              pathAfterFailure="/401"
              component={AddPurchases}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[PURCHASING_MANAGER]}
              path="/purchasing_manager/delivery_note"
              pathAfterFailure="/401"
              component={DeliveryNote}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[PURCHASING_MANAGER]}
              path="/purchasing_manager/supplier_invoice/add_purchases"
              pathAfterFailure="/401"
              component={AddPurchases}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[PURCHASING_MANAGER]}
              path="/purchasing_manager/supplier_invoice"
              pathAfterFailure="/401"
              component={SupplierInvoice}
              {...props}
            />
          </Switch>
        </CompanyLayout>
        {/*  */}
        <CompanyLayout path="/store_keeper" {...props}></CompanyLayout>
        {/*  */}

        <AdminLayout path="/super_admin" {...props}>
          <Switch>
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin"
              pathAfterFailure="/401"
              component={DashboardAdmin}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/clientslist"
              pathAfterFailure="/401"
              component={ClientsList}
              {...props}
            />

            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/contact_us"
              pathAfterFailure="/401"
              component={ContactUs}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/print"
              pathAfterFailure="/401"
              component={Print}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/profile"
              pathAfterFailure="/401"
              component={Profile}
              {...props}
            />

            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/notification"
              pathAfterFailure="/401"
              component={Notification}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/setting"
              pathAfterFailure="/401"
              component={Setting}
              {...props}
            />
            <Authorized
              exact
              allowedRoles={[SUPER_ADMIN]}
              path="/super_admin/pricing"
              pathAfterFailure="/401"
              component={Devis}
              {...props}
            />
          </Switch>
        </AdminLayout>
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
