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
import {
  Tabs,
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
  InputNumber,
} from "antd";
import { useCommission } from "services/hooks";
import { addKeysToObj } from "services/helpers";
const { TabPane } = Tabs;

function Commission() {
  const [editData, setEditData] = useState(null);
  const {
    addCommission,
    propLoading,
    commissions,
    deleteCommission,
    editCommission,
  } = useCommission();
  let formRef = useRef();
  const onReset = () => {
    formRef.current.resetFields();
  };
  const onFinish = (values) => {
    editData === null && addCommission(values, onReset);
    editData &&
      editData.id &&
      editCommission(
        { ...values, commissionId: editData.id },
        editData.id,
        onReset
      );
    setEditData(null);
  };
  const [tab, setTab] = useState("1");
  const columns = [
    {
      title: "Name",
      dataIndex: "commission_name",
    },
    {
      title: "Amount",
      dataIndex: "total_commission",
    },
    {
      title: "First Gen",
      dataIndex: "first_gen",
    },
    {
      title: "Second Gen",
      dataIndex: "third_gen",
    },
    {
      title: "Third Gen",
      dataIndex: "third_gen",
    },
    {
      title: "Fourth Gen",
      dataIndex: "fourth_gen",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (value, record) => (
        <div className="d-flex">
          <Button
            onClick={() => {
              setEditData(record);
              setTab("1");
            }}
            className="mr-2"
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              deleteCommission(record.id, () => {});
            }}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
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
                <h5 className="title">Manage Commissions</h5>
                <p className="category"></p>
              </CardHeader>
              <CardBody className="all-icons">
                <Tabs defaultActiveKey="1" activeKey={tab}>
                  <TabPane
                    tab={
                      <span onClick={() => setTab("1")}>Create Category</span>
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
                          {editData === null && (
                            <Form.Item
                              label="Name"
                              name="name"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a name",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="Name"
                              name="name"
                              initialValue={editData.commission_name}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a name",
                                },
                              ]}
                            >
                              <Input defaultValue={editData.commission_name} />
                            </Form.Item>
                          )}

                          {editData === null && (
                            <Form.Item
                              label="Percentage"
                              name="amount"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter an amount",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="Percentage"
                              name="amount"
                              initialValue={editData.total_commission}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter an amount",
                                },
                              ]}
                            >
                              <Input defaultValue={editData.total_commission} />
                            </Form.Item>
                          )}
                          {editData === null && (
                            <Form.Item
                              label="FirstGen"
                              name="firstGen"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter an firstGen",
                                },
                              ]}
                            >
                              <InputNumber />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="FirstGen"
                              name="firstGen"
                              initialValue={editData.first_gen}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter an firstGen",
                                },
                              ]}
                            >
                              <InputNumber defaultValue={editData.first_gen} />
                            </Form.Item>
                          )}
                          {editData === null && (
                            <Form.Item
                              label="SecondGen"
                              name="secondGen"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter an secondGen",
                                },
                              ]}
                            >
                              <InputNumber />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="SecondGen"
                              name="secondGen"
                              initialValue={editData.second_gen}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter an secondGen",
                                },
                              ]}
                            >
                              <InputNumber defaultValue={editData.second_gen} />
                            </Form.Item>
                          )}
                          {editData === null && (
                            <Form.Item
                              label="ThirdGen"
                              name="thirdGen"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter an thirdGen",
                                },
                              ]}
                            >
                              <InputNumber />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="ThirdGen"
                              name="thirdGen"
                              initialValue={editData.third_gen}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter an thirdGen",
                                },
                              ]}
                            >
                              <InputNumber defaultValue={editData.third_gen} />
                            </Form.Item>
                          )}
                          {editData === null && (
                            <Form.Item
                              label="FourthGen"
                              name="fourthGen"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter an fourthGen",
                                },
                              ]}
                            >
                              <InputNumber />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="FourthGen"
                              name="fourthGen"
                              initialValue={editData.fourth_gen}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter an fourthGen",
                                },
                              ]}
                            >
                              <InputNumber defaultValue={editData.fourth_gen} />
                            </Form.Item>
                          )}
                          <Form.Item
                            wrapperCol={{
                              offset: 8,
                              span: 16,
                            }}
                          >
                            <Button
                              type="primary"
                              htmlType="submit"
                              disabled={propLoading}
                              loading={propLoading}
                            >
                              {editData && editData.id ? "Update" : "Submit"}
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span onClick={() => setTab("2")}>View Commissions</span>
                    }
                    key="2"
                  >
                    <Table
                      dataSource={addKeysToObj(commissions)}
                      loading={propLoading}
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

export default Commission;
