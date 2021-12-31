import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";

export default Input = ({ name, half, label, autoFocus, type, handleShowPassword}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
		<TextField
			name={name}
			onChange={handleChange}
			variant="outlined"
			required
			fullWidth
			label={label}
			autoFocus={autoFocus}
			type={type}
			inputProps={ name === "password" && {
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleShowPassword}>
							{ type === "password" ? <Visibility /> : <VisibilityOff /> }
						</IconButton>
					</InputAdornment>
				)
			}} />
	</Grid>
);