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
import { FiDelete } from "react-icons/fi";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import {
  useDeleteTourQuery,
  useGetToursByUserIdQuery,
} from "../../helper/tourQuery";
import { useGetBookingsByUserId } from "../../helper/bookingQuery";
import { changeFormatDate } from "../../utils/changeFormatDate";
import { deleteTour } from "../../api/tourApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const historyColumns = [
  {
    title: "Tour Name",
    dataIndex: "tourName",
    key: "tourName",
  },
  {
    title: "Booked At",
    dataIndex: "bookAt",
    key: "bookAt",
    render: (text) => <div>{changeFormatDate(text)}</div>,
  },
  {
    title: "Email",
    dataIndex: "userEmail",
    key: "userEmail",
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Booked Slots",
    dataIndex: "guestSize",
    key: "guestSize",
  },
];
const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);
  const [tourDetail, setTourDetail] = useState({});
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
  const {
    data: tours,
    isLoading,
    isError,
    refetch: refetchTours,
  } = useGetToursByUserIdQuery(user?._id);
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
          console.log("Data in onSUccess");
          toast.error("Delete tour failed!");
          setModal(!modal);
        } else {
          console.log("Vao thanh cong xoa");
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
                    <Input id="phone" name="phone" placeholder="+84384719028" />
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
                    <Label check>Male</Label>
                    <Input
                      id="male"
                      name="male"
                      type="radio"
                      checked={user?.gender === "Male"}
                    />
                  </FormGroup>
                </Col>
                <Col
                  lg="3"
                  className="d-flex align-items-center justify-content-start"
                >
                  <FormGroup check>
                    <Label check>Female</Label>
                    <Input
                      id="female"
                      name="female"
                      type="radio"
                      checked={user?.gender === "Female"}
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
              dataSource={tours}
              key={tours?.map((item, index) => ({
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
              dataSource={bookings?.map((item, index) => ({
                ...item,
                key: index,
              }))}
              key={bookings?.map((item, index) => ({
                key: index,
              }))}
              columns={historyColumns}
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
