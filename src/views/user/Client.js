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
import { Tabs, Form, Input, Button, Table } from "antd";
import { useClient } from "services/hooks";
import Password from "antd/lib/input/Password";
import { frontendUrl } from "services/hooks";
import { publicRoutes } from "routes";
// import axios from "axios";
const { TabPane } = Tabs;

function Client() {
  const { addClient, clientLoading, client } = useClient();
  const [tab, setTab] = useState("1");
  let formRef = useRef();
  const onReset = () => {
    formRef.current.resetFields();
  };
  const onFinish = (values) => {
    addClient(
      {
        ...values,
        phone_country: "NG",
        callback_url: `${frontendUrl}${publicRoutes.VERIFY_ACCOUNT}`,
      },
      onReset
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "id",
      render: (value, row) => `${row.user.name} ${row.user.last_name}`,
    },
    {
      title: "Email",
      dataIndex: "id",
      render: (value, row) => row.user.email,
    },
    {
      title: "Phone",
      dataIndex: "id",
      render: (value, row) => row.user.phone,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "amount_paid",
    },
    {
      title: "Phone",
      dataIndex: "amount_remaining",
    },

    {
      title: "",
      dataIndex: "id",
      render: (value, record) => (
        <div className="d-flex">
          <Button
            onClick={() => {
              setTab("3");
            }}
            className="mr-2"
            type="primary"
          >
            Assign Property
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Manage Client</h5>
                <p className="category"></p>
              </CardHeader>
              <CardBody className="all-icons">
                <Tabs defaultActiveKey="1" activeKey={tab}>
                  <TabPane
                    tab={
                      <span onClick={() => setTab("1")}>Create Property</span>
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
                                message: "Please enter client's name",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Last Name"
                            name="lname"
                            rules={[
                              {
                                required: true,
                                message: "Please enter client's name",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Email"
                            name="email"
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
                                message: "Please enter a phone number",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Phone"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please enter a password number",
                              },
                            ]}
                          >
                            <Password />
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
                              disabled={clientLoading}
                              loading={clientLoading}
                            >
                              Create
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span onClick={() => setTab("2")}>View Properties</span>
                    }
                    key="2"
                  >
                    <Table
                      scroll={{ x: 1300 }}
                      dataSource={client}
                      loading={clientLoading}
                      columns={columns}
                    />
                  </TabPane>
                  <TabPane
                    tab={
                      <span onClick={() => setTab("3")}>Assign Properties</span>
                    }
                    key="3"
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
                          // onFinish={imageUpload}
                          autoComplete="off"
                        >
                          <Form.Item
                            wrapperCol={{
                              offset: 8,
                              span: 16,
                            }}
                          >
                            {/* <Button
                              type="primary"
                              htmlType="submit"
                              disabled={propLoading}
                              loading={propLoading}
                            >
                              Upload
                            </Button> */}
                          </Form.Item>
                        </Form>
                      </div>
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

export default Client;
