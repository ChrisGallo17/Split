import './App.css';
import PrimarySearchAppBar from './components/AppBar';
import { Typography, Box, Fab } from '@material-ui/core';
// We use Route in order to define the different routes of our application
import { Routes, Route, NavLink } from "react-router-dom";
import { Add } from '@material-ui/icons';
// We import all the components we need in our app
// import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";
import EventList from './components/eventList';

function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <Routes>
        <Route exact path="/" element={<EventList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" exact element={<Create />} />
      </Routes>
      {/* <EventList /> */}
    </div>
  );
}

export default App;
