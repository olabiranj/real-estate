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
import { Tabs, Form, Input, Button, Table } from "antd";
import { usePropertyCategories } from "services/hooks";
const { TabPane } = Tabs;

function PropertyCategory() {
  const { addPropertyCategory, propLoading, propertyCategories } =
    usePropertyCategories();
  let formRef = useRef();
  const onReset = () => {
    formRef.current.resetFields();
  };
  const onFinish = (values) => {
    addPropertyCategory(values, onReset);
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
                <h5 className="title">Manage Property Categories</h5>
                <p className="category"></p>
              </CardHeader>
              <CardBody className="all-icons">
                <Tabs defaultActiveKey="2">
                  <TabPane tab={<span>Create Category</span>} key="1">
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
                            label="Category Name"
                            name="category_name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter a category name",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            label="Description"
                            name="category_description"
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
                  <TabPane tab={<span>View Categories</span>} key="2">
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

export default PropertyCategory;
