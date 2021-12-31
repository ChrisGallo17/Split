import { Avatar, Button, Container, Grid, Input, Paper, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import React, {useState} from "react";
import GoogleLogin from "react-google-login";
import Input from "./Input";

export default Auth = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup]= useState(false);
  const handleShowPassword = () => setShowPassword((prevShowPassword) => ! prevShowPassword)

  const handleSubmit = () => {

  };

  const handleChange = () => {

  };

  const googleSuccess = (res) => {
    console.log(res)
  };

  const googleFailure = () => {
    console.log("Google login was unsuccessful")
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false)
  };
  return (
      <Container component="main" maxWidth="xs">
        <Paper elevation={3}>
          <Avatar>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
          <form onSubmit={handleSublit}>
            <Grid container spacing={2}>
              { isSignup && (
                <>
                  <Input name="firstName" label="First Name" onChange={handleChange} autoFocus half />
                </>
              )}
              <Input name="email" label="Email" onChange={handleChange} type="email" />
              <Input name="password" label="Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
              { isSignup && <Input name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password"/>}
            </Grid>
            <GoogleLogin 
              clientId="GOOGLE ID"
              render={(renderProps) => (
                <Button fullWidth color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Button type="submit" variant="contained" fullWidth color="primary" > 
              { isSignup ? "Sign Up" : "Sign In" }
            </Button>
            <Grid container justify="flex-end">
              <Grid item >
                <Button onClick={switchMode} >
                  { isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
  )
};