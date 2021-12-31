import React, { useState } from "react";
// This will require to npm install axios
import axios from 'axios';
import FriendsChip from "./Chip";
import ChipsArray from "./chips";
import { Add, EventNote, Notes, Event, AddLocation , PersonAdd, Image, Email } from '@material-ui/icons';
import { TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button, Container, Chip, IconButton, Grid } from "@material-ui/core";

function Create(props) {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [friendsInvited, setFriendsInvited] = useState([
    {key: "email1@gmail.com", label: "email1@gmail.com"},
    {key: "email2@gmail.com", label: "email2@gmail.com"}
  ]);
  const [friendSet, setFriendSet] = useState(new Set(["email1@gmail.com", "email2@gmail.com"]))
  const [imageAddress, setImageAddress] = useState('');
  const [currentFriend, setCurrentFriend] = useState('');

  const updateChips = (e) => {
    console.log(currentFriend)
    if (!friendSet.has(currentFriend)){
      setFriendsInvited([...friendsInvited, {key: currentFriend, label: currentFriend}]);
      setFriendSet(prev => new Set([...prev, currentFriend]));
      setCurrentFriend('');
    } else {
      window.alert("This friend has already been added")
    }
  }

	// This function will handle the submission.
	const handleSubmit = (e) => {
    e.preventDefault();
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newEvent = {
      event_name: eventName, 
      event_location: eventLocation, 
      event_description: eventDescription,
      event_date: eventDate,
      friends_invited: friendsInvited,
    }

    axios
      .post("http://localhost:5000/event/add", newEvent)
      .then((res) => console.log(res.data));
 
    // We will empty the state after posting the data to the database
		setEventName("");
		setEventLocation("");
		setEventDescription("");
		setEventDate("");
		setFriendsInvited([]);
    setFriendSet(new Set([]))

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
              value={eventLocation}
              onChange={e => setEventLocation(e.target.value)}
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
              value={eventDate}
              // required
            />
          </div>
          <div style={{display: "flex"}}>
            <PersonAdd style={{margin: "8px"}}/>
            <Grid 
              container
              style={{width: "100%"}}
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <Grid item>
                <TextField
                  id="invitefriends"
                  style={{ color: "white", width: "100%" }}
                  label="Invite Friends (email):"
                  variant="outlined"
                  size="small"
                  type="text"
                  className="form-control"
                  value={currentFriend}
                  onChange={e => setCurrentFriend(e.target.value)}
                  InputProps={{endAdornment: <IconButton onClick={e => updateChips(e)}><PersonAdd /></IconButton>}}
                  // required
                />
              </Grid>
              <Grid item style={{marginBottom: "15px"}}>
                <ChipsArray key={friendsInvited} friends={friendsInvited} setFriendsInvited={setFriendsInvited} friendSet={friendSet} setFreindsSet={setFriendSet}/>
              </Grid>
            </Grid>
          </div>
          <div style={{display: "flex"}}>
            <Image style={{margin: "8px"}}/>
            <Button
              variant="outlined"
              component="label"
            >
              {/* <Image style={{ marginRight: "10px" }}/> */}
              <input
                type="file"
                hidden
                value={imageAddress}
                onChange={e => setImageAddress(e.target.value)}
              />
              Add an Image
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