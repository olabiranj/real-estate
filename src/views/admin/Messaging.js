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
import { Tabs, Form, Input, Button, Select } from "antd";
import { useMessaging } from "services/hooks";
const { TabPane } = Tabs;

function Messaging() {
  const [recipientType, setRecipientType] = useState("all");
  const { messagingLoading, sendSms, sendEmail } = useMessaging();
  const [tab, setTab] = useState("1");
  let formRef = useRef();
  const onReset = () => {
    formRef.current.resetFields();
  };
  const onFinish = (values) => {
    if (recipientType === "phone") {
      sendSms({ ...values, recipients: values.phone }, onReset);
    } else {
      sendSms(values, onReset);
    }
  };
  const onFinish2 = (values) => {
    sendEmail(values, onReset);
  };
  const { Option } = Select;
  function handleChange(value) {
    setRecipientType(value);
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Messaging</h5>
                <p className="category"></p>
              </CardHeader>
              <CardBody className="all-icons">
                <Tabs defaultActiveKey="1" activeKey={tab}>
                  <TabPane
                    tab={<span onClick={() => setTab("1")}>Bulk SMS</span>}
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
                            label="Message"
                            name="message"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your message",
                              },
                            ]}
                          >
                            <Input.TextArea />
                          </Form.Item>
                          <Form.Item
                            label="Recipients"
                            name="recipients"
                            rules={[
                              {
                                required: true,
                                message: "Please select recipients",
                              },
                            ]}
                          >
                            <Select
                              defaultValue="all"
                              style={{ width: 120 }}
                              onChange={handleChange}
                            >
                              <Option value="all">All</Option>
                              <Option value="consultant">Consultants</Option>
                              <Option value="client">Clients</Option>
                              <Option value="phone">Phone</Option>
                            </Select>
                          </Form.Item>
                          {recipientType === "phone" && (
                            <>
                              <p className="text-danger font-weight-bold m-0">
                                Please seperate phone numbers by comma when
                                entering more than one number
                              </p>
                              <Form.Item
                                label="Phone Number(s)"
                                name="phone"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your message",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </>
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
                              disabled={messagingLoading}
                              loading={messagingLoading}
                            >
                              Submit
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane
                    tab={<span onClick={() => setTab("2")}>Bulk Email</span>}
                    key="2"
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
                          onFinish={onFinish2}
                          autoComplete="off"
                        >
                          <Form.Item
                            label="Subject"
                            name="subject"
                            rules={[
                              {
                                required: true,
                                message: "Please enter subject",
                              },
                            ]}
                          >
                            <Input.TextArea />
                          </Form.Item>
                          <Form.Item
                            label="Message"
                            name="message"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your message",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Recipients"
                            name="recipients"
                            rules={[
                              {
                                required: true,
                                message: "Please select recipients",
                              },
                            ]}
                          >
                            <Select defaultValue="all" style={{ width: 120 }}>
                              <Option value="all">All</Option>
                              <Option value="consultant">Consultants</Option>
                              <Option value="client">Clients</Option>
                            </Select>
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
                              disabled={messagingLoading}
                              loading={messagingLoading}
                            >
                              Submit
                            </Button>
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

export default Messaging;
