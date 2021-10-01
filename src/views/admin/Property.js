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
  Upload,
  Drawer,
  Tooltip,
  Tag,
} from "antd";
import Icon from "@ant-design/icons";
import { useProperties } from "services/hooks";
import { nigerian_states } from "services/helpers";
import { usePropertyCategories } from "services/hooks";
import { addKeysToObj } from "services/helpers";
import { backendRoutes } from "routes";
import { url } from "services/helpers";
import { useCommission } from "services/hooks";
// import axios from "axios";
const { TabPane } = Tabs;

function Property() {
  const { addProperty, properties, deleteProperty, editProperty } =
    useProperties();
  const { propLoading, propertyCategories } = usePropertyCategories();
  const { commissions } = useCommission();
  const [editData, setEditData] = useState(null);
  const [visible, setVisible] = useState(true);
  const [unitArr, setUnitArr] = useState({
    units: "",
    square_meter: "",
    arr: [],
  });
  const [tab, setTab] = useState("1");
  let formRef = useRef();
  const onReset = () => {
    formRef.current.resetFields();
  };
  const onFinish = (values) => {
    editData === null &&
      addProperty({ ...values, units: unitArr.arr }, onReset);
    editData &&
      editData.id &&
      editProperty(
        { ...values, property_id: editData.id },
        editData.id,
        onReset
      );
    setEditData(null);
    setUnitArr({
      units: "",
      square_meter: "",
      arr: [],
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "property_name",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (value, row) => <p>{value.category_name}</p>,
    },
    {
      title: "Image",
      render: (value, record) =>
        record.property_images.length > 0 && (
          <img
            width="200"
            src={`${process.env.REACT_APP_BASE_URL}/${record.property_images[0].image_url}`}
            alt={record.property_images[0].image_url}
          />
        ),
    },
    {
      title: "LandMark",
      dataIndex: "landmark",
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
      title: "operations",
      dataIndex: "operation",
      render: (value, record) => (
        <div className="d-flex">
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
          <Button
            onClick={() => {
              setEditData(record);
              setTab("3");
            }}
            className="mr-2"
            type="primary"
          >
            Add Image
          </Button>
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
  const fileList = [];

  const props = {
    action: url(
      `${backendRoutes.admin_properties}/${editData && editData.id}/image`
    ),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    listType: "picture",
    defaultFileList: [...fileList],
    name: "image",
  };
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
              <h4 className="mt-4">{editData.property_name}</h4>
              <p>
                <span className="font-weight-bold">City: </span> {editData.city}
              </p>
              <p>
                <span className="font-weight-bold">Category: </span>{" "}
                {editData.category.category_name}
              </p>
              <p>
                <span className="font-weight-bold">State: </span>{" "}
                {editData.state}
              </p>
              <p>
                <span className="font-weight-bold">Units: </span>{" "}
                {editData.units}
              </p>
              <p>
                <span className="font-weight-bold">Status: </span>{" "}
                {editData.status}
              </p>
              <p>
                <span className="font-weight-bold">Price: </span>{" "}
                {editData.price}
              </p>
              <p>
                <span className="font-weight-bold">City: </span>{" "}
                {editData.price}
              </p>
              <p>
                <span className="font-weight-bold">Title Document: </span>{" "}
                {editData.title_document}
              </p>
              <div className="">
                {editData.property_images.map((img) => (
                  <img
                    onClick={() =>
                      (window.location.href = `${process.env.REACT_APP_BASE_URL}/${img.image_url}`)
                    }
                    width="200"
                    className="m-2"
                    src={`${process.env.REACT_APP_BASE_URL}/${img.image_url}`}
                    alt={img.image_url}
                  />
                ))}
              </div>
              <div>
                {editData.property_measurements.map((data) => (
                  <p>
                    <span className="font-weight-bold">Units</span>:{" "}
                    {data.units},{" "}
                    <span className="font-weight-bold">Square Meter:</span>{" "}
                    {data.square_meter}
                  </p>
                ))}
              </div>
            </div>
          </Drawer>
        )}
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
                            <Form.Item label="Land Mark" name="landmark">
                              <Input />
                            </Form.Item>
                          )}

                          {editData && editData.id && (
                            <Form.Item
                              label="Land Mark"
                              name="landmark"
                              initialValue={editData.landmark}
                            >
                              <Input defaultValue={editData.landmark} />
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
                          {editData && editData.id && (
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
                              name="property_commission"
                              label="Commission"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select a commission",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select a property commission"
                                allowClear
                              >
                                {commissions.map((commission, i) => (
                                  <Select.Option key={i} value={commission.id}>
                                    {commission.commission_name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                          {editData && editData.id && (
                            <Form.Item
                              name="property_commission"
                              label="Commission"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select a commission",
                                },
                              ]}
                              initialValue={editData.commission.id}
                            >
                              <Select
                                placeholder="Select a property commission"
                                allowClear
                              >
                                <Select.Option value={editData.commission.id}>
                                  {editData.commission.commission_name}
                                </Select.Option>
                                {commissions.map((commission, i) => (
                                  <Select.Option key={i} value={commission.id}>
                                    {commission.commission_name}
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
                                parser={(value) =>
                                  // eslint-disable-next-line
                                  value.replace(/\N\s?|(,*)/g, "")
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
                                parser={(value) =>
                                  // eslint-disable-next-line
                                  value.replace(/\N\s?|(,*)/g, "")
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
                          {unitArr.arr?.map((res, i) => (
                            <Tooltip
                              color="red"
                              title="Click to delete"
                              key={i}
                            >
                              <Tag
                                onClick={() =>
                                  setUnitArr({
                                    ...unitArr,
                                    arr: unitArr.arr.filter(
                                      (data) => data !== res
                                    ),
                                  })
                                }
                              >
                                U: {res.units}, SM: {res.square_meter}
                              </Tag>
                            </Tooltip>
                          ))}
                          <hr />
                          {editData === null && (
                            <div className="row">
                              <div className="col-sm-4">
                                <Form.Item
                                  label="Units"
                                  value={unitArr.units}
                                  onChange={(e) =>
                                    setUnitArr({
                                      ...unitArr,
                                      units: e.target.value,
                                    })
                                  }
                                >
                                  <InputNumber />
                                </Form.Item>
                              </div>
                              <div className="col-sm-4">
                                <Form.Item
                                  label="Units"
                                  value={unitArr.square_meter}
                                  onChange={(e) =>
                                    setUnitArr({
                                      ...unitArr,
                                      square_meter: e.target.value,
                                    })
                                  }
                                >
                                  <InputNumber />
                                </Form.Item>
                              </div>
                              <div className="col-sm-4">
                                <Button
                                  type="primary"
                                  onClick={() =>
                                    setUnitArr({
                                      ...unitArr,
                                      arr: [
                                        ...unitArr.arr,
                                        {
                                          units: unitArr.units,
                                          square_meter: unitArr.square_meter,
                                        },
                                      ],
                                    })
                                  }
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          )}
                          {/* {editData && editData.id && (
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
                          )} */}

                          <Form.Item
                            wrapperCol={{
                              offset: 8,
                              span: 16,
                            }}
                          >
                            <Button
                              type="primary"
                              htmlType="submit"
                              disabled={propLoading || !unitArr.arr.length}
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
                  <TabPane
                    tab={<span onClick={() => setTab("3")}>Upload Image</span>}
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
                          {editData && editData.id && (
                            <Upload {...props}>
                              <Button>
                                <Icon type="upload" /> upload
                              </Button>
                            </Upload>
                            // <input
                            //   type="file"
                            //   name="image"
                            //   id=""
                            //   onChange={(e) => setFile(e.target.files[0])}
                            // />
                          )}

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

export default Property;
