import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import "./CreateNewTourPage.scss";
import { Tag } from "antd";
import { createNewTour, updateTour } from "../../api/tourApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getTourTypesQuery } from "../../helper/tourTypeQuery";
import { useNavigate, useParams } from "react-router-dom";
import app from "../../firebase/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  useCreateTourQuery,
  useGetSingleTourQuery,
} from "../../helper/tourQuery";
import { forEach } from "lodash";
const CreateNewTourPage = () => {
  const tourId = useParams().tourId || "";
  // console.log("TOurId lay dc la", useParams().tourId);
  const imageRef = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [selectedTypes, setSelectedTypes] = useState();

  const [formData, setFormData] = useState({
    userId: user?._id,
    // Add more fields as needed
  });
  const { data: tourTypes } = getTourTypesQuery();
  const { data: tour, isError, isLoading } = useGetSingleTourQuery(tourId);
  const { title, city, address, price, maxGroupSize, types, desc, photo } =
    tour || {};
  const { mutate: createNewTourMutate } = useCreateTourQuery(); // console.log("TOur lay dc la", tour);
  // console.log("TOur lay dc la", types);

  // types?.map((item) => {
  //   console.log("tourtypes", item);
  // });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onInputChangeSelect = (event) => {
    console.log("Set input select");
    const options = event.target.options;
    const selectedValues = [];
    for (const option of options) {
      if (option.selected) {
        console.log("Selected options", option.value);
        selectedValues.push(option.value);
      }
    }
    setSelectedTypes(selectedValues);
    setFormData({ ...formData, types: selectedValues });
  };
  const handleChangeImage = async (e) => {
    // console.log(e.target.files[0]);
    const image = e.target.files[0];
    if (image) {
      const storage = getStorage(app);
      const storageRef = ref(storage, "images/" + image.name);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      console.log(downloadURL);
      if (downloadURL) {
        setFormData({ ...formData, photo: downloadURL });
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tourId !== "") {
      console.log("No vao update tour");
      updateTour(formData, tourId, toast);
    } else {
      createNewTourMutate(formData, {
        onSuccess: (data) => {
          toast.success("Create new tour successfully.");
          navigate("/profile");
        },
        onError: (error) => {
          toast.success("Something went wrong ! Please try again.");
        },
      });
    }
  };
  // console.log("Photo of create new page", formData?.photo);
  // console.log("FormData truoc khi gui di", formData);
  useEffect(() => {
    if (tourId !== "") {
      setFormData(tour);
    }
    setSelectedTypes(types);
  }, [tour]);
  return (
    <div className="container">
      <div
        style={{
          height: 200,
        }}
      ></div>
      <div className="mainPart">
        <h2>{tourId ? "Update Tour" : "New Tour"}</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Title
            </Label>
            <Col sm={10}>
              <Input
                id="title"
                name="title"
                placeholder="Enter new tour title"
                type="text"
                onChange={onInputChange}
                value={formData?.title}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="city" sm={2}>
              City
            </Label>
            <Col sm={10}>
              <Input
                id="city"
                name="city"
                placeholder="Enter new tour city"
                type="text"
                onChange={onInputChange}
                value={formData?.city}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="address" sm={2}>
              Address
            </Label>
            <Col sm={10}>
              <Input
                id="address"
                name="address"
                placeholder="Enter new tour address"
                type="text"
                onChange={onInputChange}
                value={formData?.address}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleSelect" sm={2}>
              Group Size
            </Label>
            <Col sm={10}>
              <Input
                id="maxGroupSize"
                name="maxGroupSize"
                type="number"
                min={5}
                defaultValue={5}
                onChange={onInputChange}
                value={formData?.maxGroupSize}
                required
              ></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleSelect" sm={2}>
              Price
            </Label>
            <Col sm={10}>
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                required
                onChange={onInputChange}
                value={formData?.price}
              ></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleSelectMulti" sm={2}>
              Select Multiple
            </Label>
            <Col sm={10}>
              <Input
                id="types"
                multiple
                name="types"
                type="select"
                // onChange={onInputChange}
                onChange={onInputChangeSelect}
                value={selectedTypes}
                required
              >
                {tourTypes?.map((type) => (
                  <option value={type._id} key={type._id}>
                    {type.name}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleText" sm={2}>
              Description
            </Label>
            <Col sm={10}>
              <Input
                id="desc"
                name="desc"
                type="textarea"
                onChange={onInputChange}
                value={formData?.desc}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleFile" sm={2}>
              Image
            </Label>
            <Col sm={10}>
              <div className="formImage">
                <img
                  src={formData?.photo}
                  alt=""
                  onClick={() => {
                    imageRef.current?.click();
                  }}
                />
              </div>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleChangeImage}
                ref={imageRef}
                required={formData?.photo ? false : true}
                style={{
                  display:
                    formData?.photo !== "" || formData?.photo !== "undefined"
                      ? "none"
                      : "block",
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup check row>
            <Col
              style={{
                width: "100%",

                textAlign: "center",
              }}
            >
              <Button
                style={{
                  border: "none",
                  backgroundColor: "#faa935",
                }}
              >
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default CreateNewTourPage;
