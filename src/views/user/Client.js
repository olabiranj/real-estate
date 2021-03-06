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
import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Tabs, Form, Input, Button, Table, Select, InputNumber } from "antd";
import { useClient } from "services/hooks";
import Password from "antd/lib/input/Password";
import { frontendUrl } from "services/hooks";
import { publicRoutes } from "routes";
import { addKeysToObj } from "services/helpers";
import { useProperties } from "services/hooks";
import { useHistory } from "react-router";
import { toCurrency } from "services/helpers";
const { TabPane } = Tabs;

function Client() {
  const history = useHistory();
  const { properties } = useProperties();
  const { addClient, clientLoading, client, assignProperty } = useClient();
  const [p_measure, setP_measure] = useState(null);
  const [id, setId] = useState(null);
  const [tab, setTab] = useState("1");
  const [editData, setEditData] = useState(null);
  let formRef = useRef();
  const onReset = () => {
    formRef.current.resetFields();
    setId(null);
    setEditData(null);
    setTab("2");
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
  const onFinish2 = (values) => {
    editData === null
      ? assignProperty(values, id, onReset)
      : assignProperty({ ...editData, ...values }, id, onReset);
  };

  useEffect(() => {
    const id = window.location.pathname.split("/")[3];
    id && setTab("3");
  }, []);
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
    },
    {
      title: "Amount Remaining",
      dataIndex: "amount_remaining",
    },

    {
      title: "",
      dataIndex: "id",
      render: (value, record) => (
        <div className="d-flex">
          <Button
            onClick={() => history.push(`/user/deal-history/${record.id}`)}
            className="mr-2"
            type="primary"
          >
            View History
          </Button>
          {record.property_id === null ? (
            <Button
              onClick={() => {
                setId(record.id);
                setEditData(null);
                setTab("3");
              }}
              className="mr-2"
              type="primary"
            >
              Assign Property
            </Button>
          ) : (
            <Button
              onClick={() => {
                setTab("3");
                setId(record.id);
                setEditData({
                  property: record.property_id,
                  property_measurement: record.property_measurement_id,
                  initial_amount: record.amount_paid,
                  units: record.units,
                });
              }}
              className="mr-2"
              type="primary"
            >
              Update Property
            </Button>
          )}
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
                    tab={<span onClick={() => setTab("1")}>Create Client</span>}
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
                            label="Password"
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
                      <span
                        onClick={() => {
                          setTab("2");
                          setEditData(null);
                          setId(null);
                        }}
                      >
                        View Client
                      </span>
                    }
                    key="2"
                  >
                    <Table
                      scroll={{ x: 1300 }}
                      dataSource={addKeysToObj(client)}
                      loading={clientLoading}
                      columns={columns}
                    />
                  </TabPane>
                  <TabPane
                    tab={
                      <span onClick={() => setTab("3")}>
                        Assign Properties to existing clients
                      </span>
                    }
                    key="3"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        {editData === null ? (
                          <Form
                            ref={formRef}
                            onFinish={onFinish2}
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
                            {id === null && (
                              <Form.Item
                                label="Client"
                                name="user_id"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select a client",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a client"
                                  allowClear
                                >
                                  {client?.map((prpty, i) => (
                                    <Select.Option
                                      key={i}
                                      value={prpty.user_id}
                                    >
                                      {`${prpty.user.name} ${prpty.user.last_name}`}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            )}
                            <Form.Item
                              label="Property"
                              name="property"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select a property",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select a property"
                                allowClear
                              >
                                {/* <Select.Option value={editData.state}>
                                {editData.state}
                              </Select.Option> */}
                                {properties?.map((prpty, i) => (
                                  <Select.Option key={i} value={prpty.id}>
                                    <div
                                      className="col-12"
                                      onClick={() =>
                                        setP_measure(
                                          prpty.property_measurements
                                        )
                                      }
                                    >
                                      {prpty.property_name}
                                    </div>
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>

                            {p_measure && (
                              <>
                                <Form.Item
                                  label="Property Measurement"
                                  name="property_measurement"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter a property",
                                    },
                                  ]}
                                >
                                  <Select
                                    placeholder="Select a property measurement"
                                    allowClear
                                  >
                                    {/* <Select.Option value={editData.state}>
                                {editData.state}
                              </Select.Option> */}
                                    {p_measure?.map((prpty, i) => (
                                      <Select.Option key={i} value={prpty.id}>
                                        <span
                                          onClick={() =>
                                            console.log(
                                              prpty.property_measurements
                                            )
                                          }
                                        >
                                          Units: {prpty.units}, Sqr Mtr.:
                                          {prpty.square_meter}
                                        </span>
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  label="Initial Amount"
                                  name="initial_amount"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter initial amount",
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    style={{ width: "100%" }}
                                    formatter={(value) =>
                                      `N ${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )
                                    }
                                    parser={(value) =>
                                      // eslint-disable-next-line
                                      value.replace(/\N\s?|(,*)/g, "")
                                    }
                                  />
                                </Form.Item>
                                <Form.Item
                                  label="Units"
                                  name="units"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter no. of units",
                                    },
                                  ]}
                                >
                                  <InputNumber />
                                </Form.Item>
                                <Form.Item
                                  wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                  }}
                                >
                                  <Button
                                    loading={clientLoading}
                                    disabled={clientLoading}
                                    type="primary"
                                    htmlType="submit"
                                  >
                                    Submit
                                  </Button>
                                </Form.Item>
                              </>
                            )}
                          </Form>
                        ) : (
                          <Form
                            ref={formRef}
                            onFinish={onFinish2}
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
                              label="Initial Amount"
                              name="initial_amount"
                              initialValue={editData.initial_amount}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter initial amount",
                                },
                              ]}
                            >
                              <InputNumber
                                initialvalue={editData.initial_amount}
                                value={editData.initial_amount}
                                style={{ width: "100%" }}
                                formatter={(value) =>
                                  `N ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                parser={(value) =>
                                  // eslint-disable-next-line
                                  value.replace(/\N\s?|(,*)/g, "")
                                }
                              />
                            </Form.Item>
                            <Form.Item
                              wrapperCol={{
                                offset: 8,
                                span: 16,
                              }}
                            >
                              <Button
                                loading={clientLoading}
                                disabled={clientLoading}
                                type="primary"
                                htmlType="submit"
                              >
                                Update
                              </Button>
                            </Form.Item>
                          </Form>
                        )}
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
