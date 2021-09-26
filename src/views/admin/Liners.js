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
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Tabs, Table } from "antd";
import { addKeysToObj } from "services/helpers";
import { useLiners } from "services/hooks";
const { TabPane } = Tabs;

function Liners() {
  const { liners, linersLoading } = useLiners();
  const columns = [
    {
      title: "Name",
      render: (value, record) => `${record.name} ${record.last_name}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Referral Code",
      dataIndex: "referral_code",
    },
  ];

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Liners</h5>
                <p className="category"></p>
              </CardHeader>
              <CardBody className="all-icons">
                <Tabs defaultActiveKey="1" activeKey="1">
                  <TabPane key="1">
                    <Table
                      scroll={{ x: 1300 }}
                      dataSource={addKeysToObj(liners)}
                      loading={linersLoading}
                      columns={columns}
                    />
                  </TabPane>
                </Tabs>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Liners;
