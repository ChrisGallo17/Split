import React, { useEffect, useState } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Add } from '@material-ui/icons';
import { Link, NavLink } from "react-router-dom";
import { Box, Fab, makeStyles, Table, TableRow, TableCell, TableContainer, TableHead, TableBody, Paper, Typography } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  // darkHead: {
  //   backgroundColor: "#212121",
  //   color: theme.palette.common.white,
  // },
  // lighterRow: {
  //   backgroundColor: "#212121",
  //   color: theme.palette.common.hover,
  // }
}));

export default function RecordList() {
  // This is the constructor that shall store our data retrieved from the database
  const [records, setRecords] = useState([])
  const classes = useStyles();

  // This method will get the data from the database.
  useEffect(() => {
    axios
      .get("http://localhost:5000/record/")
      .then((response) => {
        setRecords(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // This method will delete a record based on the method
  const deleteRecord = (id) => {
    console.log("id: ", id)
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });
    setRecords(records.filter((el) => el._id !== id));
  }

  // This following section will display the table with the records of individuals.
  return (
    //   <table className="table table-striped" style={{ marginTop: 20 }}>
    <div style={{ margin: 20 }}>
      <Box mt={ 4 } mb={ 3 }>
        <Typography variant="h4" component="h4">
          MERN Stack Playground
        </Typography>
      </Box>
      <TableContainer component={Paper} className={classes.darkHead}>
      <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
          align="left"
          style={{ marginTop: 15, marginLeft: 15 }}
        >
          Record List
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Level</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="lighterRow">
            {records.map((currentrecord) => (
              <TableRow
                key={currentrecord._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{currentrecord.person_name}</TableCell>
                <TableCell>{currentrecord.person_position}</TableCell>
                <TableCell>{currentrecord.person_level}</TableCell>
                <TableCell align="right">
                  <Link to={"/edit/" + currentrecord._id}>
                    <Edit fontSize="small" style={{marginRight: 10}}/>
                  </Link>
                  <a
                    href="/"
                    onClick={() => {
                      deleteRecord(currentrecord._id);
                    }}
                  >
                    <Delete fontSize="small"/>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NavLink to="/create">
        <Fab color="primary" variant="extended" style={{position: 'relative', marginTop: 15}}> 
          <Add />
          Create Person
        </Fab>
      </NavLink>
    </div>
  );
}