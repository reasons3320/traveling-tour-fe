import React from "react";
import "./Blogs.scss";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { Col, Container, Row } from "reactstrap";
import background from "../../../src/assets/background.jpg";
import { Helmet } from "react-helmet";
import { blogs } from "../../data/blogs";
const Blogs = () => {
  return (
    <div className="blogsContainer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blogs Page</title>
        <link rel="canonical" href="http://localhost:5173/blogs" />
      </Helmet>
      <div className="backgroundSection"></div>
      <div className="blogTitle">
        <h3>Our Blog</h3>
        <p>Check out all our blogs for the best tour experience</p>
      </div>
      <Container className="blogCardContainer" data-aos="fade-up">
        <Row className="gap-5 w-full justify-content-center">
          {blogs.map((blog) => (
            <Col lg="3" md="4" sm="12" className="g-5" key={blog?.id}>
              <BlogCard blog={blog} key={blog?.id} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Blogs;
