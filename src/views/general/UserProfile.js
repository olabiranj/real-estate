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
import { Button, DatePicker, Form, Input, message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React from "react";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

// reactstrap components
import { Card, CardHeader, CardBody, CardText, Row, Col } from "reactstrap";
import { useDashboardData } from "services/hooks";
import { url } from "services/helpers";

function UserProfile() {
  const user = useSelector((state) => state.auth.user.data);
  const { user_profile } = user;

  const { updateProfile } = useDashboardData();
  const onFinish = (values) => {
    // console.log({ ...user_profile, ...values });
    updateProfile({ ...user_profile, ...values });
  };

  function onChangeDate(date, dateString) {
    console.log(date, dateString);
  }
  const props = {
    name: "image",
    action: url(`/images`),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // console.log(info.file.response);
        updateProfile({
          ...user_profile,
          avatar: info.file.response.data.url,
          firstname: user.name,
          lastname: user.last_name,
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={
                        user_profile.avatar === null
                          ? require("assets/img/emilyz.jpg").default
                          : `${process.env.REACT_APP_BASE_URL}/${user_profile.avatar}`
                      }
                      // src={require("assets/img/emilyz.jpg").default}
                    />

                    <h5 className="title">
                      {user.name} {user.last_name}
                    </h5>
                  </a>
                  <p className="description">
                    {user.roles[0].name.toUpperCase()}
                  </p>
                  <ImgCrop rotate>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Change Image</Button>
                    </Upload>
                  </ImgCrop>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form
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
                    name="firstname"
                    initialValue={user.name}
                    rules={[
                      {
                        required: true,
                        message: "Please enter first name",
                      },
                    ]}
                  >
                    <Input readOnly />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastname"
                    initialValue={user.last_name}
                    rules={[
                      {
                        required: true,
                        message: "Please enter last name",
                      },
                    ]}
                  >
                    <Input readOnly />
                  </Form.Item>
                  <Form.Item
                    label="Address"
                    name="address"
                    initialValue={user_profile.address}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Next of Kin Name"
                    name="next_of_kin_name"
                    initialValue={user_profile.next_of_kin_name}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Next of Kin Phone No."
                    name="next_of_kin_number"
                    initialValue={user_profile.next_of_kin_number}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Next of Kin Email"
                    name="next_of_kin_email"
                    initialValue={user_profile.next_of_kin_email}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Next of Kin Relationship"
                    name="next_of_kin_relationship"
                    initialValue={user_profile.next_of_kin_relationship}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Date of Birth" name="date_of_birth">
                    <DatePicker
                      // defaultPickerValue={user_profile.updated_at}
                      onChange={onChangeDate}
                    />
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
                      // disabled={clientLoading}
                      // loading={clientLoading}
                    >
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
