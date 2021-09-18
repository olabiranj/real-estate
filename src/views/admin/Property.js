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
import React, { useRef } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Tabs, Form, Input, Button, Table, Select } from "antd";
import { useProperties } from "services/hooks";
import { nigerian_states } from "services/helpers";
import { usePropertyCategories } from "services/hooks";
const { TabPane } = Tabs;

function Property() {
  const { addProperty } = useProperties();
  const { propLoading, propertyCategories } = usePropertyCategories();
  let formRef = useRef();
  const onReset = () => {
    formRef.current.resetFields();
  };
  const onFinish = (values) => {
    addProperty(values, onReset);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "category_description",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "category_name",
      key: "age",
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
                <Tabs defaultActiveKey="2">
                  <TabPane tab={<span>Create Property</span>} key="1">
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
                            <Input />
                          </Form.Item>
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
                            <Input />
                          </Form.Item>
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
                          <Form.Item
                            name="state"
                            label="State"
                            rules={[{ required: true }]}
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
                            <Input />
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
                              disabled={propLoading}
                              loading={propLoading}
                            >
                              Submit
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab={<span>View Properties</span>} key="2">
                    <Table
                      dataSource={propertyCategories}
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
