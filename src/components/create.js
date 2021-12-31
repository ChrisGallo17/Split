import React, { useState } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Add, EventNote, Notes, Event, AddLocation , PersonAdd, Image } from '@material-ui/icons';
import { TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button, Container } from "@material-ui/core";

function Create(props) {
  const [personName, setPersonName] = useState('');
  const [personPosition, setPersonPosition] = useState('');
  const [personLevel, setPersonLevel] = useState('');
  
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(React.useState(new Date('2014-08-18T21:11:54')));


  const handleChange = (position) => {
    if (position === "Intern") {
      console.log(position)
      setPersonLevel("Intern")
    } else if (position === "Junior") {
      console.log(position)
      setPersonLevel("Junior")
    } else {
      console.log(position)
      setPersonLevel("Senior")
    }
  };
 
	// This function will handle the submission.
	const handleSubmit = (e) => {
    e.preventDefault();
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newEvent = {
      event_name: eventName, 
      event_description: eventDescription,
      event_date: eventDate,
    }
    console.log(newEvent)

    // axios
    //   .post("http://localhost:5000/record/add", newperson)
    //   .then((res) => console.log(res.data));
    axios
      .post("http://localhost:5000/event/add", newEvent)
      .then((res) => console.log(res.data));
 
    // We will empty the state after posting the data to the database
		setEventName("");
		setEventDescription("");
		setEventDate("");

    window.location.href = "/"
  }
 
  // This following section will display the form that takes the input from the user.
    return (
      <Container maxWidth='sm' style={{ marginTop: 20 }}>
        <h3>Create New Event</h3>
        <form onSubmit={handleSubmit} >
          <div className="form-group" style={{display: "flex"}}>
            <EventNote style={{margin: "8px"}}/>
            <TextField
              style={{color: "white", marginBottom: 15, width: "100%" }}
              label="Name of Event:"
              variant="outlined"
              size="small"
              type="text"
              className="form-control"
              value={eventName}
              onChange={e => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{display: "flex"}}>
            <AddLocation style={{margin: "8px"}}/>
            <TextField
              style={{color: "white", marginBottom: 15, width: "100%" }}
              label="Event Location:"
              variant="outlined"
              size="small"
              type="text"
              className="form-control"
              // value={eventLocation}
              // onChange={e => setEventLocation(e.target.value)}
              // required
            />
          </div>
          <div className="form-group" style={{display: "flex"}}>
            <Notes style={{margin: "8px"}}/>
            <TextField
              style={{color: "white", marginBottom: 15, width: "100%"}}
              label="Event Description:"
              multiline
              rows={4}
              variant="outlined"
              size="small"
              type="text"
              className="form-control"
              value={eventDescription}
              onChange={e => setEventDescription(e.target.value)}
              // required
            />
          </div>
          <div style={{display: "flex"}}>
            <Event style={{margin: "8px"}}/>
            <TextField
              id="eventdate"
              label="Event Date"
              type="date"
              variant="outlined"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ color: "white", marginBottom: 15, width: "100%" }}
              onChange={e => setEventDate(e.target.value)}
              // required
            />
          </div>
          <div style={{display: "flex"}}>
            <PersonAdd style={{margin: "8px"}}/>
            <TextField
              id="invitefriends"
              style={{ color: "white", marginBottom: 15, width: "100%" }}
              label="Invite Friends:"
              variant="outlined"
              size="small"
              type="text"
              className="form-control"
              // required
            />
          </div>
          <div style={{display: "flex"}}>
            <Image style={{margin: "8px"}}/>
            <TextField
              id="eventpicture"
              style={{ color: "white", marginBottom: 15, width: "100%" }}
              label="Add Picture:"
              variant="outlined"
              size="small"
              type="text"
              className="form-control"
              // required
            />
            <Button
              variant="contained"
              component="label"
            >
              <Image/>
              <input
                type="file"
                hidden
              />
            </Button>
          </div>
          <div className="form-group">
            <Button 
              style={{marginTop: '15px'}}
              variant="contained" 
              type="submit"
              value="Create person"
              className="btn btn-primary"
              startIcon={<Add />}>
              Create Event
            </Button>
          </div>
        </form>
      </Container>
    );
}

export default Create;