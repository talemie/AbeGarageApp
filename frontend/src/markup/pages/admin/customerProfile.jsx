import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddVehicleForm from "../../components/Admin/AddVehicleForm/AddVehicleForm";
function customerProfile() {
  return (
    <div classNameName="container-fluid admin-pages">
      <div classNameName="row">
        <div classNameName="col-md-3 admin-left-side">
          <AdminMenu />
        </div>

        <div className="auto-container col-md-9 admin-right-side">
          <div className="history-block">
            <div className="years">Info</div>
            <div className="content">Customer :Adugna Bekele</div>
            <div>Email:</div>
            <div>Phone Number:</div>
            <div>Active Customer</div>
            <div>Edit Customer info:</div>
          </div>

          <div>
            <div className="history-block">
              <div className="years">Cars</div>
              <div className="content">Vehicle of Adugna </div>
              <div>Vehicle</div>
            </div>
          </div>
          <div classNameName="form-group col-md-12">
            <AddVehicleForm />
          </div>

          <div className="history-block">
            <div className="years">Orders</div>
            <div className="content">Orders of Adugna </div>
            <div>orders</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default customerProfile;
