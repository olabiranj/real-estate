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
import React, { useRef, useState } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Tabs, Table, Form, Input, Button, Drawer } from "antd";
import { addKeysToObj } from "services/helpers";
import { useConsultants } from "services/hooks";
import { useHistory } from "react-router";
const { TabPane } = Tabs;

function Consultants() {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const { consLoading, consultants, registerConsultant } = useConsultants();
  const [tab, setTab] = useState("1");
  let formRef = useRef();
  const onReset = () => {
    formRef.current.resetFields();
  };
  const onFinish = (values) => {
    registerConsultant(values, onReset);
  };
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
      title: "operations",
      dataIndex: "operation",
      render: (value, record) => (
        <Button
          onClick={() => {
            setEditData(record);
            setVisible(true);
          }}
          className="mr-2"
          type="primary"
        >
          View Details
        </Button>
      ),
    },
  ];
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="content">
        {editData && editData.id && (
          <Drawer
            placement="right"
            onClose={onClose}
            width={"400px"}
            visible={visible}
          >
            <div className="mt-4 pt-4">
              <h4 className="mt-4">Consultant Details</h4>
              <p>
                <span className="font-weight-bold">Name: </span>{" "}
                {`${editData.name} ${editData.last_name}`}
              </p>
              <p>
                <span className="font-weight-bold">Phone: </span>{" "}
                {editData.phone}
              </p>
              <p>
                <span className="font-weight-bold">Referral Code: </span>{" "}
                {editData.referral_code}
              </p>
            </div>
            <div className="d-flex">
              <Button
                onClick={() =>
                  history.push(`/admin/liners/${editData.id}/downliners`)
                }
                className="mr-2"
                type="primary"
              >
                View Downliner
              </Button>

              <Button
                onClick={() =>
                  history.push(`/admin/liners/${editData.id}/upliners`)
                }
                className="mr-2"
                type="primary"
              >
                Upliner
              </Button>
            </div>
          </Drawer>
        )}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Manage Consultants</h5>
                <p className="category"></p>
              </CardHeader>
              <CardBody className="all-icons">
                <Tabs defaultActiveKey="1" activeKey={tab}>
                  <TabPane
                    tab={
                      <span onClick={() => setTab("1")}>
                        Register a consultant
                      </span>
                    }
                    key="1"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <Form
                          ref={formRef}
                          name="basic"
                          labelCol={{
                            span: 8,
                          }}
                          wrapperCol={{
                            span: 16,
                          }}
                          onFinish={onFinish}
                          autoComplete="off"
                        >
                          <Form.Item
                            label="First Name"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter first name",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="last Name"
                            name="lname"
                            rules={[
                              {
                                required: true,
                                message: "Please enter a last name",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Email"
                            name="email"
                            type="email"
                            rules={[
                              {
                                required: true,
                                message: "Please enter an email",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Please enter a phone",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="password"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please enter a password",
                              },
                            ]}
                          >
                            <Input.Password />
                          </Form.Item>

                          <Form.Item
                            wrapperCol={{
                              offset: 8,
                              span: 16,
                            }}
                          >
                            <Button
                              type="primary"
                              htmlType="submit"
                              disabled={consLoading}
                              loading={consLoading}
                            >
                              Submit
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span onClick={() => setTab("2")}>View Consultants</span>
                    }
                    key="2"
                  >
                    <Table
                      scroll={{ x: 1300 }}
                      dataSource={addKeysToObj(consultants)}
                      loading={consLoading}
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

export default Consultants;
