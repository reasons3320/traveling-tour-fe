import React, { useEffect, useRef, useState } from "react";
import "./createtour.scss";
import * as yup from "yup";
import { Field, Formik, useFormikContext } from "formik";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase/firebase";
import { Button } from "reactstrap";
import { Select, Skeleton } from "antd";
import { useCitiesQuery } from "../../helper/cityQuery";
import { getTourTypesQuery } from "../../helper/tourTypeQuery";
import { useSelector } from "react-redux";
import {
  useCreateTourQuery,
  useDeleteTourQuery,
  useGetSingleTourQuery,
  useUpdateTourQuery,
} from "../../helper/tourQuery";
import toast from "react-hot-toast";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getSingleTour } from "../../api/tourApi";
const MAX_COUNT = 3;
const CreateTour = () => {
  const navigate = useNavigate();
  const r = useLocation();
  const [tour, setTour] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(0);
  const [value, setValue] = React.useState([]);
  const suffix = (
    <>
      <span>
        {value.length} / {MAX_COUNT}
      </span>
      {/* <Down /> */}
    </>
  );
  const imageRef = useRef(null);
  const formRef = useRef(null);
  const { data, isLoading: loading } = useCitiesQuery();
  const { data: tourTypes } = getTourTypesQuery();
  const { data: singleTour } = useGetSingleTourQuery(r?.state?.id);
  // console.log(singleTour)
  const {mutate:deleteMutate} = useDeleteTourQuery();
  const {mutate:updateTourMutate} = useUpdateTourQuery()
  const user = useSelector((state) => state.user.user);
  const { mutate: createNewTour } = useCreateTourQuery();
  const validationSchema = yup.object({
    title: yup.string().required("Tour name is required"),
    desc: yup.string().required("Description is required"),
    location_id: yup.string().required("Please choose location"),
    maxGroupSize: yup.number().min(0, "Can not less than 0"),
    duration_days: yup
      .number()
      .required("This field might not be empty")
      .min(0, "Day must be more than 0"),
    price: yup.number().required().min(0, "Price can not less than 0"),
    photo: yup.string(),
    types: yup.array().required("Tour's type is required"),
  });
  const handleUploadImage = async (e, setFieldValue) => {
    const image = e.target.files[0];
    if (image) {
      setIsLoading(true);
      const storage = getStorage(app);
      const storageRef = ref(storage, "images/" + image.name);
      try {
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setFieldValue("photo", downloadURL);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleSubmitForm = (values) => {
    console.log(values);
    if (!values.photo) {
      alert("Tour's thumbnail can not be empty");
    } else {
      switch (number) {
        case 1:
          createNewTour(values, {
            onSuccess: (data) => {
              if (data.success) {
                toast.success("Created new tour succeed !");
                navigate("/organizer/tours");
                nav;
              } else {
                if (data.message.includes("duplicate key")) {
                  toast.error("Tour's name is existed !");
                } else {
                  toast.error("Something went wrong ! Please try again..");
                }
              }
            },
          });
          break;
        case 2:
          updateTourMutate(values, {
            onSuccess: (data) => {
                toast.success("Update tour succeed !");
            },
            onError: (result) => {
              toast.error("Something went wrong ! Please try again..");
            },
          });
          break;
        default:
          break;
      }
    }
  };
  useEffect(() => {
    if (r?.state?.id) {
      setNumber(2);
      setTour(singleTour);
    } else {
      setNumber(1);
    }
  }, [singleTour]);
  return (
    <div className="create-container">
      <div className="create-title">
        <h3>{r?.state?.id ? "Tour Updating" : "Tour Creating"}</h3>
      </div>
      <div className="create-mainSide">
        <Formik
          innerRef={formRef}
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={{
            id:tour?._id || '',
            organizer_id: user?._id,
            title: tour?.title || "",
            desc: tour?.desc || "",
            location_id: tour?.location_id?._id || "",
            maxGroupSize: tour?.maxGroupSize || 0,
            duration_days: tour?.duration_days || 0,
            price: tour?.price || 0,
            photo: tour?.photo || "",
            types: tour?.types || [],
          }}
          onSubmit={handleSubmitForm}
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            setFieldValue,
            setFieldError,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} className="form-wrapper">
              <div className="tour-leftSide">
                <div className="form-item">
                  <label htmlFor="title">
                    <h6>Tour name</h6>
                  </label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Tour's name"
                    className="form-control"
                    onChange={handleChange}
                    value={values.title}
                  />
                  {errors.title && touched.title && (
                    <div className="error">{errors.title}</div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="form-item"
                    style={{
                      width: "45%",
                    }}
                  >
                    <label htmlFor="title">
                      <h6>Location</h6>
                    </label>
                    <Select
                      value={values.location_id}
                      options={data?.data.map((item) => ({
                        label: item.city_name,
                        value: item._id,
                      }))}
                      onChange={(value) => setFieldValue("location_id", value)}
                    />
                    {errors.location_id && touched.location_id && (
                      <div className="error">{errors.location_id}</div>
                    )}
                  </div>
                  <div
                    className="form-item"
                    style={{
                      width: "45%",
                    }}
                  >
                    <label>
                      <h6>Max group size</h6>
                    </label>
                    <Field
                      type="number"
                      name="maxGroupSize"
                      placeholder="0"
                      className="form-control"
                      onChange={handleChange}
                      value={values.maxGroupSize}
                    />
                    {errors.maxGroupSize && touched.maxGroupSize && (
                      <div className="error">{errors.maxGroupSize}</div>
                    )}
                  </div>
                </div>
                <div className="form-item">
                  <label>
                    <h6>Types of Tour</h6>
                  </label>
                  <Select
                    mode="multiple"
                    maxCount={MAX_COUNT}
                    value={values.types}
                    style={{
                      width: "100%",
                    }}
                    onChange={(e) => {
                      setFieldValue("types", e);
                    }}
                    suffixIcon={suffix}
                    placeholder="Please select"
                    options={tourTypes?.map((item) => ({
                      value: item._id,
                      label: item.name,
                    }))}
                  />
                  {errors.location_id && touched.location_id && (
                    <div className="error">{errors.location_id}</div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="form-item">
                    <label htmlFor="title">
                      <h6>Duration(day)</h6>
                    </label>
                    <Field
                      type="number"
                      name="duration_days"
                      placeholder="Duration days"
                      className="form-control"
                      onChange={handleChange}
                      value={values.duration_days}
                    />
                    {errors.duration_days && touched.duration_days && (
                      <div className="error">{errors.duration_days}</div>
                    )}
                  </div>

                  <div className="form-item">
                    <label htmlFor="price">
                      <h6>Tour price (VND)</h6>
                    </label>
                    <input
                      name="price"
                      className="form-control"
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      value={values.price}
                    />
                    {errors.price && touched.price && (
                      <div className="error">{errors.price}</div>
                    )}
                  </div>
                </div>
                <div className="form-item">
                  <label htmlFor="description">
                    <h6>Description</h6>
                  </label>
                  <textarea
                    rows={4}
                    name="desc"
                    placeholder="Tour's description"
                    className="form-control"
                    onChange={handleChange}
                    value={values.desc}
                  />
                  {errors.desc && touched.desc && (
                    <div className="error">{errors.desc}</div>
                  )}
                </div>
                {r?.state?.id ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "50px",
                    }}
                  >
                    <Button type="submit">Update</Button>
                    <Button disabled={isLoading} onClick={()=>{
                      deleteMutate(r?.state?.id,{
                        onSuccess:(data)=>{
                          toast.success("Delete succeed !");
                          navigate('/organizer/tours');
                        }
                      });
                    }}>Delete</Button>
                  </div>
                ) : (
                  <Button type="submit" disabled={isLoading}>
                    Create
                  </Button>
                )}
              </div>
              <div
                className="tour-rightSide"
                onClick={() => {
                  imageRef.current.click();
                }}
              >
                <input
                  id="choose_image"
                  ref={imageRef}
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleUploadImage(e, setFieldValue, setFieldError)
                  }
                />
                {isLoading ? (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton.Image
                      active={isLoading}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                ) : values.photo ? (
                  <img
                    src={values.photo}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Skeleton.Image />
                    <p>Please choose image...</p>
                  </div>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateTour;
