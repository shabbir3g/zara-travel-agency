import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


import "./service.css";


const Service = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setService(data));
  }, []);
  return (
      <div className="bg-service">
      <Container className="pt-5 pb-4">
      <div className="my-5 text-center section-title mx-auto">
        <h2>Our Services </h2>
        <p>This Our Services from our valuable Customer, those who get from BD Travel agency. We every time provide best quality services to our cusotmer.</p>
        </div>
        <Row xs={1} md={3} className="g-4">
          {service.map((service, index) => (
            <Col key={service._id}>
              <Card className="box text-center">
                <Card.Img
                  className="services-img"
                  variant="top"
                  src={service.image}
                />
                <Card.Body>
                  <Card.Title className="services-title">
                    {service.title}
                  </Card.Title>
                  {/* <p> {service.description.slice(0, 85)}</p> */}
                 <div className="service-meta"> 
               
                 <Card.Text>
                      <h5>Cost: {service.cost}</h5>
                    </Card.Text>
                

                    <Link className="card-btn" to={`/order/${service._id}`}>
                      Order Now
                    </Link>
                 </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
       
      </Container>
    </div>
  );
};

export default Service;
