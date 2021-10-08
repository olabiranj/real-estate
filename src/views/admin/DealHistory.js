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
import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Table } from "antd";
import { addKeysToObj } from "services/helpers";
import { useDeals } from "services/hooks";
import { toCurrency } from "services/helpers";
import { useParams } from "react-router";

function DealsHistory() {
  const { getDealHistory, deals, dealsLoading } = useDeals();
  const { id } = useParams();
  const columns = [
    {
      title: "Amount Paid",
      dataIndex: "amount_paid",
      render: (value, row) => toCurrency(parseFloat(value)),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (value, row) => value.substring(0, 10),
    },
  ];
  useEffect(() => {
    getDealHistory(id);
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
                <Table
                  dataSource={addKeysToObj(deals.history)}
                  loading={dealsLoading}
                  columns={columns}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DealsHistory;
