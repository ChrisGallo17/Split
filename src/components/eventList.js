import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Add, AddLocation, ChatBubble, PanTool, PanToolOutlined, PersonAdd, TagFaces } from '@material-ui/icons';
import { NavLink } from "react-router-dom";
import { Chip, Fab, Typography } from "@material-ui/core";
import { Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, IconButton, Container } from "@material-ui/core";
import { Delete, MoreVert, Favorite, Share } from "@material-ui/icons";
import ChipsArray from "./chips";

export default function EventList() {
  // This is the constructor that shall store our data retrieved from the database
  const url = "http://localhost:5000/event/"
  const [events, setEvents] = useState([])
  const [willAttend, setWillAttend] = useState(false)
  // const [noEvents, setNoEvents] = useState(false)


  const onClickWillAttend = () => setWillAttend((prevWillAttend) => ! prevWillAttend)
  // This method will get the data from the database.
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setEvents(response.data);
        // console.log(response.data);
        // if (response.data.length > 0) {
        //   setNoEvents(false)
        // } else {
        //   setNoEvents(true)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // This method will delete an event based on the method
  const deleteEvent = (id) => {
    if (window.confirm("Do you want to delete this event?")){
      console.log("id: ", id)
      axios.delete("http://localhost:5000/" + id).then((response) => {
        console.log(response.data);
      });
      setEvents(events.filter((el) => el._id !== id));
    }
  }

  // console.log(noEvents)
  // This following section will display the table with the records of individuals.
  // if (noEvents) {
  //   return (
  //     <div>
  //       <Typography variant="h5" style={{ marginTop: '25px' }}>
  //         Looks like there's no events, plan one
  //       </Typography>
  //       <NavLink to="/create">
  //         <Fab color="secondary" variant="extended" style={{position: 'relative', margin: 15}}> 
  //           <Add />
  //           Create Event
  //         </Fab>
  //       </NavLink>
  //     </div>

  //   )
  // } else {
    return (
      <div>
        {events.map((currentevent) => (
          <Container maxWidth="sm" style={{ marginTop: '15px' }} key={currentevent._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe">
                    CG
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
                title={currentevent.event_name}
                subheader={currentevent.event_date}
              />
              <CardMedia
                component="img"
                height="194"
                src={"https://s3-media0.fl.yelpcdn.com/bphoto/4xekxff-5mjxc_9VaHA2hQ/o.jpg"}
                alt="Bowling"
              />
              <CardContent>
                <Typography variant="body2">
                  {currentevent.event_description}
                </Typography>
                <Typography variant="body2">
                  {currentevent.event_location}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="attend" onClick={onClickWillAttend}>
                  { willAttend ? <PanToolOutlined /> : <PanTool /> }
                </IconButton>
                <IconButton aria-label="add person">
                  <PersonAdd />
                </IconButton>
                <IconButton aria-label="add location">
                  <AddLocation />
                </IconButton>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
                <IconButton aria-label="chat">
                  <ChatBubble />
                </IconButton>
                <IconButton onClick={() => deleteEvent(currentevent._id)}>
                    <Delete />
                </IconButton>
              </CardActions>
              {currentevent.friends_invited &&
                <Container>
                  {currentevent.friends_invited.map((data) => {
                    return (
                      <Chip icon={<TagFaces />} label={data.key} style={{ margin: '5px', marginBottom: "15px"}}/>
                    );
                  })}
                </Container> }
            </Card>
          </Container> ))}
        <NavLink to="/create">
          <Fab color="secondary" variant="extended" style={{position: 'relative', margin: 15}}> 
            <Add />
            Create Event
          </Fab>
        </NavLink>
        {/* <ChipsArray /> */}
      </div>
    );
  // }
}