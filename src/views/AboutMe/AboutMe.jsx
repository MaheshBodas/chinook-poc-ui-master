import React, { Component } from 'react';
import { Card, CardBody, CardGroup, Col, Container, Form, Row } from 'reactstrap';
import styles from './AboutMe.css'

class ContactMe extends Component {
    
    render() {
      return (      
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="4">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form>
                      <Row className="justify-content-center">
                          <Col xs="10">
                          <div className="form-group">
                            <h1 className="justify-content-center">About Me</h1>
                          </div>
                          </Col>                        
                        </Row>                         
                        <Row className="justify-content-center">
                          <Col xs="20">
                          <div className="form-group">
                          <p htmlFor="address" style={styles.helpTextLabel}>
                            If you like my work and would like to hire me.
                            Kindly contact me.
                          </p>
                          </div>
                          </Col>                        
                        </Row>                        
                        <Row className="justify-content-center">
                          <Col xs="4">
                              <img src={'assets/img/avatars/Mahesh4.jpg'} className="img-avatar" alt="Mahesh Bodas" />                            
                          </Col>                        
                        </Row>                                                   
                        <Row className="justify-content-center">
                          <Col xs="8">
                            <i className="fa fa-twitter fa-lg mt-4"></i>   
                            &nbsp;&nbsp;
                            <a href="https://twitter.com/Maheshbodas">@maheshbodas</a>                         
                          </Col>
                        </Row>
                        <Row className="justify-content-center">
                          <Col xs="8">
                          <i className="fa fa-facebook fa-lg mt-4"></i>
                            &nbsp;&nbsp;
                            <a href="https://facebook.com/maheshbodas">maheshbodas</a>
                          </Col>
                        </Row>
                        <Row className="justify-content-center">
                          <Col xs="8">                          
                          <i className="fa fa-mobile-phone fa-lg mt-4"></i>
                          &nbsp;&nbsp;                          
                          <span>(+91) (9619206121)</span>
                          </Col>                        
                        </Row>    
                        <Row className="justify-content-center">
                          <Col xs="10">                          
                          <i className="fa fa-envelope-open fa-lg mt-4"></i>
                          &nbsp;&nbsp;                          
                          <a href="mailto:mahesh.bodas@gmail.com">mahesh.bodas@gmail.com</a>                 
                          </Col>                        
                        </Row>  
                        
                        <br/>
                        <br/>
                        <Row className="justify-content-center">
                          <Col xs="20">
                          <label htmlFor="address" style={styles.helpTextLabel}>
                            &copy; Mahesh Bodas. All rights reserved.
                          </label>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>                
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>      
      );
    }
}

export default ContactMe