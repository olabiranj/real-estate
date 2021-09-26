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
import { Tabs, Form, Input, Button, Table, Popconfirm } from "antd";
import { usePropertyCategories } from "services/hooks";
import { addKeysToObj } from "services/helpers";
const { TabPane } = Tabs;

function PropertyCategory() {
  const [editData, setEditData] = useState(null);
  const {
    addPropertyCategory,
    propLoading,
    propertyCategories,
    deletePropertyCategory,
    editPropertyCategory,
  } = usePropertyCategories();
  let formRef = useRef();
  const onReset = () => {
    formRef.current.resetFields();
  };
  const onFinish = (values) => {
    editData === null && addPropertyCategory(values, onReset);
    editData &&
      editData.id &&
      editPropertyCategory(
        { ...values, category_id: editData.id },
        editData.id,
        onReset
      );
    setEditData(null);
  };
  const [tab, setTab] = useState("1");
  const columns = [
    {
      title: "Name",
      dataIndex: "category_name",
    },
    {
      title: "Description",
      dataIndex: "category_description",
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
              deletePropertyCategory(record.id, () => {});
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
                <h5 className="title">Manage Property Categories</h5>
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
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="Category Name"
                              name="category_name"
                              initialValue={editData.category_name}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a category name",
                                },
                              ]}
                            >
                              <Input defaultValue={editData.category_name} />
                            </Form.Item>
                          )}

                          {editData === null && (
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
                              <Input.TextArea autoSize={{ minRows: 5 }} />
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              label="Description"
                              name="category_description"
                              initialValue={editData.category_description}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a description",
                                },
                              ]}
                            >
                              <Input.TextArea
                                autoSize={{ minRows: 5 }}
                                defaultValue={editData.category_description}
                              />
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
                      <span onClick={() => setTab("2")}>View Categories</span>
                    }
                    key="2"
                  >
                    <Table
                      dataSource={addKeysToObj(propertyCategories)}
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
