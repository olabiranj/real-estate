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
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Tabs, Table, Button } from "antd";
import { addKeysToObj } from "services/helpers";
import { useDeals } from "services/hooks";
import { toCurrency } from "services/helpers";
import { useHistory } from "react-router";
const { TabPane } = Tabs;

function Deals() {
  const history = useHistory();
  const { getDeals, deals, dealsLoading } = useDeals();
  const [tab, setTab] = useState("1");
  const columns = [
    {
      title: "Client Name",
      render: (value, row) => `${row.user.name} ${row.user.last_name}`,
    },
    {
      title: "Consultant Name",
      render: (value, row) =>
        `${row.consultant.name} ${row.consultant.last_name}`,
    },
    {
      title: "Property Name",
      render: (value, row) => row.property && row.property.property_name,
    },
    {
      title: "Payable Amount",
      render: (value, row) => {
        let returnValue;
        row.property !== null &&
          // eslint-disable-next-line
          row.property.property_measurements.map((ppty) => {
            if (ppty.id === row.property_measurement_id) {
              returnValue = row.property.price * ppty.square_meter;
            }
          });
        return returnValue && toCurrency(returnValue);
      },
    },
    {
      title: "Amount Paid",
      dataIndex: "amount_paid",
      render: (value, row) => toCurrency(parseFloat(value)),
    },
    {
      title: "Amount Remaining",
      dataIndex: "amount_remaining",
      render: (value, row) => toCurrency(parseFloat(value)),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "",
      dataIndex: "operation",
      render: (value, record) => (
        <Button
          onClick={() => history.push(`/admin/deal-history/${record.id}`)}
          className="mr-2"
          type="primary"
        >
          View History
        </Button>
      ),
    },
  ];
  useEffect(() => {
    getDeals("all");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Deals</h5>
                <p className="category"></p>
              </CardHeader>
              <CardBody className="all-icons">
                <Tabs defaultActiveKey="1" activeKey={tab}>
                  <TabPane
                    tab={
                      <span
                        onClick={() => {
                          getDeals("all");
                          setTab("1");
                        }}
                      >
                        All Deals
                      </span>
                    }
                    key="1"
                  >
                    <div className="scroll-x">
                      <Table
                        dataSource={addKeysToObj(deals.all)}
                        loading={dealsLoading}
                        columns={columns}
                      />
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span
                        onClick={() => {
                          getDeals("ongoing");
                          setTab("2");
                        }}
                      >
                        Ongoing Deals
                      </span>
                    }
                    key="2"
                  >
                    <div className="scroll-x">
                      <Table
                        dataSource={addKeysToObj(deals.ongoing)}
                        loading={dealsLoading}
                        columns={columns}
                      />
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span
                        onClick={() => {
                          getDeals("closed");
                          setTab("3");
                        }}
                      >
                        Closed Deals
                      </span>
                    }
                    key="3"
                  >
                    <div className="scroll-x">
                      <Table
                        dataSource={addKeysToObj(deals.closed)}
                        loading={dealsLoading}
                        columns={columns}
                      />
                    </div>
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

export default Deals;
