import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Add, AddLocation, Comment, PanTool, PanToolOutlined, PersonAdd, Place, TagFaces } from '@material-ui/icons';
import { NavLink } from "react-router-dom";
import { Chip, Fab, Grid, Typography, Switch } from "@material-ui/core";
import { Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, IconButton, Container } from "@material-ui/core";
import { Delete, MoreVert, Favorite, Share } from "@material-ui/icons";
import ChipsArray from "./chips";
import EventMenu from "./eventMenu";

export default function EventList() {
  // This is the constructor that shall store our data retrieved from the database
  const url = "http://localhost:5000/event/"
  const [events, setEvents] = useState([])
  const [willAttend, setWillAttend] = useState(false)
  const [active, setActive] = useState(false)
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
          <Container maxWidth="sm" style={{ marginTop: '15px', textAlign: "left" }} key={currentevent._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe">
                    CG
                  </Avatar>
                }
                action={
                  // <IconButton aria-label="settings">
                    <EventMenu currentevent={currentevent} deleteEvent={deleteEvent} />
                  // </IconButton>
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
              <CardContent style={{paddingBottom: "16px" }}>
                <Grid container spacing={2} style={{ display: "flex" }}>
                  <Grid item style={{ alignItems: "flex-start", flexGrow: 1 }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                      <Place fontSize="small" style={{ marginRight: "5px" }}/>
                      <Typography variant="body2" style={{ top: 0 }}>
                        {currentevent.event_location}
                      </Typography>
                    </div>
                    <Typography variant="body2">
                      {currentevent.event_description}
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <IconButton aria-label="attend" onClick={onClickWillAttend}>
                      { willAttend ? <PanToolOutlined /> : <PanTool style={{ color: "#32d532" }}/> }
                    </IconButton>
                    <IconButton aria-label="chat">
                      <Comment />
                    </IconButton>
                    {/* <CardActions disableSpacing> */}
                    {/* </CardActions> */}
                  </Grid>
                </Grid>
              {currentevent.friends_invited &&
                <>
                  {currentevent.friends_invited.map((data) => {
                    return (
                      <Chip icon={<TagFaces />} label={data.key} style={{ margin: '5px'}}/>
                    );
                  })}
                </> }
              </CardContent>
            </Card>
          </Container> ))}
        <NavLink to="/create">
          <Fab color="secondary" variant="extended" style={{position: 'relative', margin: 15}}> 
            <Add />
            Create Event
          </Fab>
        </NavLink>
        <Switch value="active" onChange={() => setActive(!active)} checked={ active }/>
        {/* <ChipsArray /> */}
      </div>
    );
  // }
}