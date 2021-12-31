import React from 'react';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';

export default function FriendsChip({name}) {
  return (
    <Chip
			icon={<TagFacesIcon />}
			label={name}
			onDelete={console.log(name)}
			style={{ margin: "spacing(0.5)"}}
    />
  );
}