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
  Select,
  Popconfirm,
  InputNumber,
} from "antd";
import { useProperties } from "services/hooks";
import { nigerian_states } from "services/helpers";
import { usePropertyCategories } from "services/hooks";
import { addKeysToObj } from "services/helpers";
const { TabPane } = Tabs;

function Property() {
  const { addProperty, properties, deleteProperty, editProperty } =
    useProperties();
  const { propLoading, propertyCategories } = usePropertyCategories();
  const [editData, setEditData] = useState(null);
  const [tab, setTab] = useState("1");
  let formRef = useRef();
  const onReset = () => {
    formRef.current.resetFields();
  };
  const onFinish = (values) => {
    editData === null && addProperty(values, onReset);
    editData &&
      editData.id &&
      editProperty(
        { ...values, property_id: editData.id },
        editData.id,
        onReset
      );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "property_name",
      fixed: "left",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (value, row) => <p>{value.category_description}</p>,
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Unit(s)",
      dataIndex: "units",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Title Document",
      dataIndex: "title_document",
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
              deleteProperty(record.id, () => {});
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
                <h5 className="title">Manage Properties</h5>
                <p className="category"></p>
              </CardHeader>
              <CardBody className="all-icons">
                <Tabs defaultActiveKey="1" activeKey={tab}>
                  <TabPane
                    tab={
                      <span onClick={() => setTab("1")}>
                        {editData?.id ? "Edit" : "Create"} Property
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
                          {editData === null && (
                            <Form.Item
                              label="Property Name"
                              name="property_name"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a property name",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="Property Name"
                              name="property_name"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a property name",
                                },
                              ]}
                              initialValue={editData.property_name}
                            >
                              <Input defaultValue={editData.property_name} />
                            </Form.Item>
                          )}

                          {editData === null && (
                            <Form.Item
                              label="Description"
                              name="property_description"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a description",
                                },
                              ]}
                            >
                              <Input.TextArea autoSize={{ minRows: 5 }} />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="Description"
                              name="property_description"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a description",
                                },
                              ]}
                              initialValue={editData.property_description}
                            >
                              <Input.TextArea
                                autoSize={{ minRows: 5 }}
                                defaultValue={editData.property_description}
                              />
                            </Form.Item>
                          )}
                          {editData === null && (
                            <Form.Item
                              label="Title Name"
                              name="title_document"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a Title Name",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="Title Name"
                              name="title_document"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a Title Name",
                                },
                              ]}
                              initialValue={editData.title_document}
                            >
                              <Input defaultValue={editData.title_document} />
                            </Form.Item>
                          )}
                          {editData === null && (
                            <Form.Item
                              label="Units"
                              name="units"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter number of units",
                                },
                              ]}
                            >
                              <InputNumber />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="Units"
                              name="units"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter number of units",
                                },
                              ]}
                              initialValue={editData.units}
                            >
                              <InputNumber defualtValue={editData.units} />
                            </Form.Item>
                          )}
                          {editData === null && (
                            <Form.Item
                              label="City"
                              name="city"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a city",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          )}
                          {editData === null && (
                            <Form.Item
                              label="City"
                              name="city"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a city",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="City"
                              name="city"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a city",
                                },
                              ]}
                              initialValue={editData.city}
                            >
                              <Input defaultValue={editData.city} />
                            </Form.Item>
                          )}
                          {editData === null && (
                            <Form.Item
                              name="state"
                              label="State"
                              rules={[{ required: true }]}
                            >
                              <Select placeholder="Select a state" allowClear>
                                {nigerian_states.map((state, i) => (
                                  <Select.Option key={i} value={state}>
                                    {state}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              name="state"
                              label="State"
                              rules={[{ required: true }]}
                              initialValue={editData.state}
                            >
                              <Select placeholder="Select a state" allowClear>
                                <Select.Option value={editData.state}>
                                  {editData.state}
                                </Select.Option>
                                {nigerian_states.map((state, i) => (
                                  <Select.Option key={i} value={state}>
                                    {state}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                          {editData === null && (
                            <Form.Item
                              name="property_category"
                              label="Category"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select a category",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select a property category"
                                allowClear
                              >
                                {propertyCategories.map((category, i) => (
                                  <Select.Option key={i} value={category.id}>
                                    {category.category_name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                          {editData && editData && (
                            <Form.Item
                              name="property_category"
                              label="Category"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select a category",
                                },
                              ]}
                              initialValue={editData.category.id}
                            >
                              <Select
                                placeholder="Select a property category"
                                allowClear
                              >
                                <Select.Option value={editData.category.id}>
                                  {editData.category.category_name}
                                </Select.Option>
                                {propertyCategories.map((category, i) => (
                                  <Select.Option key={i} value={category.id}>
                                    {category.category_name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                          {editData === null && (
                            <Form.Item
                              label="Price"
                              name="price"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter price",
                                },
                              ]}
                            >
                              <InputNumber
                                formatter={(value) =>
                                  `N ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                              />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="Price"
                              name="price"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter price",
                                },
                              ]}
                              initialValue={editData.price}
                            >
                              <InputNumber
                                defaultValue={editData.price}
                                formatter={(value) =>
                                  `N ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                              />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              name="status"
                              label="Status"
                              rules={[{ required: true }]}
                              initialValue={
                                editData && editData.id ? editData.status : ""
                              }
                            >
                              <Select placeholder="Select a status" allowClear>
                                {editData && editData.id ? (
                                  <Select.Option value={editData.status}>
                                    {editData.status}
                                  </Select.Option>
                                ) : (
                                  ""
                                )}
                                <Select.Option value="active">
                                  active
                                </Select.Option>
                                <Select.Option value="sold">sold</Select.Option>
                              </Select>
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
                              {editData?.id ? "Update" : "Submit"}
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
                      dataSource={addKeysToObj(properties)}
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

export default Property;
