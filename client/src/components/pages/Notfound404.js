import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export default function Notfound404({ text }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">{text}</Typography> <br />
            <Link to={"/login"}>
              <Button variant="contained">Back Home</Button>
            </Link>
          </Grid>
          <Grid xs={6}>
            <img src="../assets/404.jpg" alt="" width={500} height={250} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
