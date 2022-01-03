import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Delete, MoreVert, PersonAdd, Share } from "@material-ui/icons";

export default function EventMenu({currentevent, deleteEvent}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Share /></MenuItem>
        <MenuItem onClick={handleClose}><PersonAdd /></MenuItem>
        <MenuItem onClick={() => deleteEvent(currentevent._id)}><Delete /></MenuItem>
      </Menu>
    </div>
  )
}