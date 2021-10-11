/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components
import { useSelector } from "react-redux";
import { message, Skeleton } from "antd";
import { useDashboardData } from "services/hooks";

function ConsultantDashboard(props) {
  const user = useSelector((state) => state.auth.user.data);
  const { dataLoading, dashboardData } = useDashboardData();
  return (
    <>
      <div className="content">
        {dataLoading ? (
          <Skeleton avatar paragraph={{ rows: 4 }} />
        ) : (
          <>
            <Row>
              <Col lg="12">
                <Card className=" p-3">
                  <CardHeader>
                    <h4 className="card-category">Hello,</h4>
                    <CardTitle tag="h2">
                      {user.name} {user.last_name} 😁
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="d-flex mb-4">
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(user.referral_link);
                          message.info("Link copied to clipboard");
                        }}
                      >
                        Copy Referral Link
                      </Button>
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(user.referral_code);
                          message.info("Code copied to clipboard");
                        }}
                      >
                        Copy Referral Code
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category">Total Consultants</h3>
                    <CardTitle tag="h1">
                      <i className="tim-icons icon-bell-55 text-info" />
                      {dashboardData.totalConsultants || 0}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category">Total Clients</h3>
                    <CardTitle tag="h1">
                      <i className="tim-icons icon-delivery-fast text-primary" />
                      {dashboardData.totalClients || 0}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category">Total Deals</h3>
                    <CardTitle tag="h1">
                      <i className="tim-icons icon-send text-success" />
                      {dashboardData.totalDeals || 0}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category">Total Deals Amount</h3>
                    <CardTitle tag="h1">
                      <i className="tim-icons icon-bell-55 text-info" />
                      {dashboardData.totalDealsAmount || 0}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category">Total Open Deals</h3>
                    <CardTitle tag="h1">
                      <i className="tim-icons icon-delivery-fast text-primary" />
                      {dashboardData.totalOpenDeals || 0}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category">Total Closed Deals</h3>
                    <CardTitle tag="h1">
                      <i className="tim-icons icon-send text-success" />
                      {dashboardData.totalClosedDeals || 0}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category">Today's Consultants</h3>
                    <CardTitle tag="h1">
                      <i className="tim-icons icon-send text-success" />
                      {dashboardData.todayConsultants || 0}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category">Today's Clients</h3>
                    <CardTitle tag="h1">
                      <i className="tim-icons icon-bell-55 text-info" />
                      {dashboardData.todayClients || 0}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category">Total Commissions Paid</h3>
                    <CardTitle tag="h1">
                      <i className="tim-icons icon-delivery-fast text-primary" />
                      {dashboardData.totalCommissionsPaid || 0}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h3 className="card-category">Total Referrals</h3>
                    <CardTitle tag="h1">
                      <i className="tim-icons icon-send text-success" />
                      {dashboardData.totalReferrals || 0}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default ConsultantDashboard;
