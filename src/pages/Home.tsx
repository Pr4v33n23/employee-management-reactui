import React, { useEffect, useState } from "react";
import {
  addEmployees,
  deleteEmployees,
  loadEmployees,
} from "../actions/employeeActions";
import { v4 as uuid4 } from "uuid";
import "./Home.css";

//UI
import {
  Table,
  Form,
  Input,
  Button,
  Divider,
  Space,
  Popconfirm,
  notification,
} from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { editEmployees } from "./../actions/employeeActions";

export interface Props {}

const Home: React.FC<Props> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

  const { employeeData } = useSelector((state: any) => state.employees);
  const [isEdit, setIsEdit] = useState(false);
  const items: any = [];

  employeeData.map((employee: any) =>
    items.push({
      key: uuid4(),
      employeeId: employee.employeeId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      salary: employee.salary,
      department: employee.department,
    })
  );

  const handleDelete = (rowData: any) => {
    const filteredData = employeeData.filter(
      (key: any) => key.employeeId !== rowData.employeeId
    );
    dispatch(deleteEmployees(filteredData, rowData));
    openDeleteNotificationWithIcon();
  };

  const handleEdit = (rowData: any) => {
    form.setFieldsValue({
      employeeId: rowData.employeeId,
      firstName: rowData.firstName,
      lastName: rowData.lastName,
      salary: rowData.salary,
      department: rowData.department,
    });
    setIsEdit(true);
  };

  const onReset = () => {
    setIsEdit(false);
    form.resetFields();
  };

  const openSuccessNotificationWithIcon = () => {
    notification.success({
      message: "Employee added successfully!",
    });
  };

  const openDeleteNotificationWithIcon = () => {
    notification.warn({
      message: "Employee deleted successfully!",
    });
  };

  const openEditNotificationWithIcon = () => {
    notification.info({
      message: "Employee editted successfully!",
    });
  };

  const columns = [
    {
      key: "column1",
      title: "Employee ID",
      dataIndex: "employeeId",
    },
    {
      key: "column2",
      title: "First Name",
      dataIndex: "firstName",
      render: (text: string) => <p>{text}</p>,
    },
    {
      key: "column3",
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      key: "column4",
      title: "Salary",
      dataIndex: "salary",
    },
    {
      key: "column5",
      title: "Department",
      dataIndex: "department",
    },
    {
      key: "column6",
      render: (rowData: any) =>
        items.length >= 1 ? (
          <Space>
            <Popconfirm
              title="Are you Sure?"
              onConfirm={() => handleDelete(rowData)}
            >
              <DeleteTwoTone />
            </Popconfirm>
            <EditTwoTone onClick={() => handleEdit(rowData)} />
          </Space>
        ) : null,
    },
  ];

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 26 },
  };

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    form.resetFields();
    dispatch(addEmployees(values));
  };

  const onFinishEdit = (values: any) => {
    const editData = employeeData.map((data: any) => {
      if (data.employeeId === values.employeeId) {
        data = {
          ...data,
          employeeId: values.employeeId,
          firstName: values.firstName,
          lastName: values.lastName,
          salary: values.salary,
          department: values.department,
        };
      }

      return data;
    });

    dispatch(editEmployees(editData, values));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div>
        <Divider>Employee Management UI</Divider>
      </div>
      <div className="container">
        {}
        <Form
          {...layout}
          form={form}
          name="basic"
          onFinish={isEdit ? onFinishEdit : onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Employee ID"
            name="employeeId"
            rules={[
              { required: true, message: "Please input your employee ID!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: "Please input your salary!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            rules={[
              { required: true, message: "Please input your department!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={
                isEdit
                  ? () => openEditNotificationWithIcon()
                  : () => openSuccessNotificationWithIcon()
              }
            >
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
        <Divider type="vertical"></Divider>
        <Table columns={columns} dataSource={items} />
      </div>
    </>
  );
};

export default Home;
