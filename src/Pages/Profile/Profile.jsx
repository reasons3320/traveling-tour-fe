import React, { useEffect, useState } from "react";
import "./Profile.scss";
import avt from "../../assets/avt3.jpg";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { Table, Tag } from "antd";
import { useSelector } from "react-redux";
import { CgAdd } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteTourQuery } from "../../helper/tourQuery";
import { useGetBookingsByUserId } from "../../helper/bookingQuery";
import { changeFormatDate } from "../../utils/changeFormatDate";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useStyleRegister } from "antd/es/theme/internal";

const historyColumns = [
  {
    title: "Tour Name",
    dataIndex: "tourName",
    key: "tourName",
    render: (value, record, index) => (
      <div>{record?.tour_schedule_id?.tourId?.title}</div>
    ),
  },
  {
    title: "Booked At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value, record, index) => <div>{changeFormatDate(value)}</div>,
    sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
  },
  {
    title: "Ready date",
    dataIndex: "tour_schedule_id",
    key: "tour_schedule_id",
    render: (value, record, index) => <div>{changeFormatDate(value?.available_date)}</div>,
    sorter: (a, b) => moment(a.tour_schedule_id?.available_date).unix() - moment(b.tour_schedule_id?.available_date).unix(),
  },
  
  {
    title: "Email",
    dataIndex: "userEmail",
    key: "userEmail",
    render: (value, record, index) => <div>{record.customerId?.email}</div>,
  },
  {
    title: "Full Name",
    dataIndex: "username",
    key: "username",
    render: (value) => <div>{value}</div>,
    onCell: (record) => ({
      style: { backgroundColor: "white" }, // Light blue background
    }),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (value) => <div>{value}</div>,
    onCell: (record) => ({
      style: { backgroundColor: "white" }, // Light blue background
    }),
  },
  {
    title: "Booked Slots",
    dataIndex: "guestSize",
    key: "guestSize",
    onCell: (record) => ({
      style: { backgroundColor: "white" }, // Light blue background
    }),
  },
  {
    title: "Total($)",
    dataIndex: "totalPrice",
    key: "totalPrice",
    sorter: (a, b) => {
      return a.totalPrice - b.totalPrice;
    },
    onCell: (record) => ({
      style: { backgroundColor: "white" }, // Light blue background
    }),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value, record, index) => <Tag color="geekblue">{value}</Tag>,
    onCell: (record) => ({
      style: { backgroundColor: "white" }, // Light blue background
    }),
  },
];
const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);
  const [tourDetail, setTourDetail] = useState({});
  const [userForm, setUserForm] = useState({
    gender: "Male" || "Female",
  });
  const toggle = () => setModal(!modal);
  const user = useSelector((state) => state.user.user) || {};
  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text) => (
        <img
          src={text}
          style={{
            borderRadius: 20,
            width: 100,
            height: 100,
          }}
        ></img>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Types",
      dataIndex: "types",
      key: "types",
      render: (_, record) =>
        record?.types?.map((type, index) => {
          return (
            <Tag color={index % 2 === 0 ? "blue-inverse" : "cyan-inverse"}>
              {type.name}
            </Tag>
          );
        }),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Max Size",
      dataIndex: "maxGroupSize",
      key: "maxGroupSize",
    },
    {
      title: "Actions",
      render: (record) => (
        <>
          <Link
            to={`/updateTour/${record._id}`}
            style={{
              color: "black",
            }}
          >
            <BiEdit className="edit-icon" />
          </Link>
          <MdDeleteOutline
            className="edit-icon"
            // onClick={() => {
            //   handleDeleteTour(record._id);
            // }}
            onClick={() => {
              setModal(true);
              setTourDetail(record);
            }}
          />
        </>
      ),
    },
  ];
  // console.log(user);
  // const {
  //   data: tours,
  //   isLoading,
  //   isError,
  //   refetch: refetchTours,
  // } = useGetToursByUserIdQuery(user?._id);
  const {
    data,
    isLoading,
    isError,
    refetch: refetchTours,
  } = useGetBookingsByUserId(user?._id);
  const {
    data: bookings,
    isLoading: bookingLoading,
    isError: bookingError,
    refetch: refetchBookings,
  } = useGetBookingsByUserId(user?._id);
  const { mutate: deleteTourMutate, isLoading: deleteLoading } =
    useDeleteTourQuery();
  const handleDeleteTour = () => {
    deleteTourMutate(tourDetail?._id, {
      onSuccess: (data) => {
        if (data?.success === false) {
          toast.error("Delete tour failed!");
          setModal(!modal);
        } else {
          refetchTours();
          toast.success(data?.message);
          setModal(!modal);
        }
      },
      onError: (error) => {
        // Handle error if the mutation fails
        console.error("Error deleting tour:", error);
        toast.error("An error occurred while deleting the tour.");
      },
    });
  };

  const goToCreatePage = () => {
    return navigate(`/createTour`);
  };
  useEffect(() => {
    refetchBookings();
    refetchTours();
  }, [refetchBookings, refetchTours]);
  return (
    <div className="profileContainer">
      <div className="profileForm">
        <div className="profileFormUpper">
          <div className="imgFormItems">
            <img src={avt} alt="" />
            <div className="imgFormInfo">
              <div className="imgFormInfoItems">
                <Label>Role</Label>
                <Tag color="green">{user.role}</Tag>
              </div>
            </div>
          </div>
          <div className="formItems">
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      id="exampleEmail"
                      name="email"
                      placeholder="with a placeholder"
                      type="email"
                      value={user.email}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Enter user name"
                      type="text"
                      value={user.username}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Label>Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+8412 345 678"
                      value={user?.phone}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={"123456"}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="exampleAddress">Address</Label>
                <Input
                  id="exampleAddress"
                  name="address"
                  placeholder="1234 Main St"
                />
              </FormGroup>
              <Row>
                <Label>Gender</Label>
                <Col
                  lg="3"
                  className="d-flex align-items-center justify-content-start"
                >
                  <FormGroup check inline>
                    <Label check htmlFor="male">Male</Label>
                    <Input
                      id="male"
                      name="male"
                      type="radio"
                      value={"Male"}
                      // checked={user?.gender === "Male"}
                      checked={userForm.gender === "Male"}
                      onChange={(e) =>
                        setUserForm((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                    />
                  </FormGroup>
                </Col>
                <Col
                  lg="3"
                  className="d-flex align-items-center justify-content-start"
                >
                  <FormGroup check>
                    <Label check htmlFor="female">Female</Label>
                    <Input
                      id="female"
                      name="female"
                      type="radio"
                      // checked={user?.gender === "Female"}
                      value="Female"
                      checked={userForm.gender === "Female"}
                      onChange={(e) => {
                        setUserForm((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }));
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>

              {/* <div className="d-flex justify-content-center mt-5">
                <Button className="btnProfileForm">Submit</Button>
              </div> */}
            </Form>
          </div>
        </div>
        {user?.role.toLowerCase() === "admin" ? (
          <div className="profileTable">
            <div className="profileTableCreateBar">
              <h5>Tours Management</h5>
              <div className="createTourBar">
                <Button className="createTourBar__btn" onClick={goToCreatePage}>
                  <span>
                    <CgAdd className="icon" />
                  </span>
                  <span className="createTourBar__title">Add Tour</span>
                </Button>
              </div>
            </div>
            <Table
              dataSource={data}
              key={data?.map((item, index) => ({
                key: index,
              }))}
              columns={columns}
            ></Table>
          </div>
        ) : (
          <div className="profileTable">
            <div className="profileTableCreateBar">
              <h5>History</h5>
            </div>
            <Table
              loading={isLoading}
              dataSource={data?.map((item, index) => ({
                ...item,
                key: index,
              }))}
              key={data?.map((item, index) => ({
                key: index,
              }))}
              columns={historyColumns}
              scroll={{ x: 800 }}
            ></Table>
          </div>
        )}
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirm delete</ModalHeader>
        <ModalBody>Are you sure to delete {tourDetail?.title} !</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDeleteTour}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Profile;
