import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import axios from 'axios';
import {Redirect} from 'react-router-dom';

class ModalAddEvent extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      image: null,
      redirect: false,
    }
  }

  makeId = () => {
    let id = '';
    for (let index = 0; index < 25; index++) {
      id += String(Math.floor(Math.random() * 10));
    }
    return id;
  }

  handleAddEvent = (e) => {
    e.preventDefault();
    
    let f = e.target;
    let fields = {
      e_id: this.makeId(), 
      e_title: f.e_title.value, 
      e_description: f.e_description.value,
      e_slogan: f.e_slogan.value,
      e_address: f.e_address.value, 
      e_venue: f.e_venue.value,
      e_start_date: f.e_start_date.value, 
      e_start_time: f.e_start_time.value, 
      e_end_date: f.e_end_date.value, 
      e_end_time: f.e_end_time.value,
      e_price: f.e_price.value, 
      e_discount: f.e_discount.value, 
      e_tickets: f.e_tickets.value, 
      e_organizers: f.e_organizers.value, 
      e_guests: f.e_guests.value,
      e_created_by: f.e_created_by.value,
      e_partners: f.e_partners.value,
      e_status: f.e_status.value,
      e_image: this.state.image
    };
    let data = new FormData();
    Object.keys(fields).map(f=>data.append(f, fields[f]))
    axios.post("/api/events", data, { // receive two parameter endpoint url ,form data 
    })
      .then(res => { // then print response status
        if(res.statusText === 'OK'){
          this.setRedirect();
        }
      })
  }

  redirectToEvents =()=>{
    if (this.state.redirect) return <Redirect to='/events' />
  }

  setRedirect =()=>{
    this.setState({redirect:true});
  }

  eventStatusChange =(e)=>{
    alert('Status Changed');
  }

  fileChange =e=>{
    this.setState({
      image: e.target.files[0],
      loaded: 0,
    });
  }

  render(){
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {this.redirectToEvents()}
    
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Event
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleAddEvent} method='POST'>
            <Form.Row>
              <Form.Group as={Col} controlId="e_title">
                <Form.Label>Event Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Event Title" required={true} />
              </Form.Group>

              <Form.Group as={Col} controlId="e_slogan">
                <Form.Label>Slogan</Form.Label>
                <Form.Control type="text" placeholder="Catch Phrase" required={true} />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="e_image">
              <Form.Label>Poster</Form.Label>
              <Form.Control type="file" onChange={this.fileChange} placeholder="Poster for the Event" />
            </Form.Group>

            <Form.Group controlId="e_venue">
              <Form.Label>Venue</Form.Label>
              <Form.Control type='text' placeholder="Event Venue" required={true} />
            </Form.Group>

            <Form.Group controlId="e_address">
              <Form.Label>Address</Form.Label>
              <Form.Control type='text' placeholder="5th Street, Indutrial Area, Kampala" required={true} />
            </Form.Group>
            <hr />
            <Form.Label><h5>Tickets</h5></Form.Label>
            <Form.Row>
              <Form.Group as={Col} controlId="e_price">
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' min='0' max='100000000' required={true} />
              </Form.Group>

              <Form.Group as={Col} controlId="e_tickets">
                <Form.Label>No. of Seats</Form.Label>
                <Form.Control type='number' min='0' max='500000' required={true} />
              </Form.Group>

              <Form.Group as={Col} controlId="e_discount">
                <Form.Label>Discount [%]</Form.Label>
                <Form.Control type='number' min='0' max='100' />
              </Form.Group>
            </Form.Row>

            <Form.Label>Date and Time</Form.Label>
            <Form.Row>
              <Form.Group as={Col} controlId="e_start_date">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type='date' required={true}/>
              </Form.Group>

              <Form.Group as={Col} controlId="e_start_time">
                <Form.Label>Start Time</Form.Label>
                <Form.Control type='time' min='0' max='500000' />
              </Form.Group>

              <Form.Group as={Col} controlId="e_end_date">
                <Form.Label>End Date</Form.Label>
                <Form.Control type='date' required={true} />
              </Form.Group>

              <Form.Group as={Col} controlId="e_end_time">
                <Form.Label>End Time</Form.Label>
                <Form.Control type='time' min='0' max='500000' />
              </Form.Group>

            </Form.Row>

            <Form.Group controlId="e_description">
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' required={true} placeholder='Event Description' />
            </Form.Group>

            <Form.Group controlId="e_guests">
              <Form.Label>Event Guests</Form.Label>
              <Form.Control as='textarea' placeholder='Guests' />
            </Form.Group>

            <Form.Group controlId="e_partners">
              <Form.Label>Partners</Form.Label>
              <Form.Control as="select" required={true}>
                <option value='Ultimate Fitness Kampala'>Ultimate Fitness Kampala</option>
                <option value='Ultimate Cycling Kampala'>Ultimate Cycling Kampala</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="e_organizers">
              <Form.Label>Organizers</Form.Label>
              <Form.Control type='text' required={true} placeholder='Ultimate Sports Events' />
            </Form.Group>

            <Form.Group controlId="e_created_by">
              <Form.Label>Created By</Form.Label>
              <Form.Control type='text' required={true} placeholder='Full Name' />
            </Form.Group>
            <Form.Group controlId="e_status">
              <Form.Label>Event Status</Form.Label>
              <Form.Control as="select" required={true}>
                <option value='Active'>Active</option>
                <option value='Inactive'>Inactive</option>
              </Form.Control>
            </Form.Group>

            <Modal.Footer>
              <Button variant="primary" type="submit">Save Event</Button>
              <Button variant='danger' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>

          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default ModalAddEvent;