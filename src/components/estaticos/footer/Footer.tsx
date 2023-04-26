import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Typography, Grid } from "@material-ui/core";
import { Box } from "@mui/material";
import "./Footer.css";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";

function Footer() {

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  var footerComponent;
  if (token !== "") {
    footerComponent = <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid alignItems="center" item xs={12}>
        <Box style={{ backgroundColor: "#D2B492", height: "120px" }}>
          <Box
            paddingTop={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              style={{ color: "#977343" }}
            >
              Siga-nos nas redes sociais
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <a
              href="https://github.com/jennifer-cruz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon style={{ fontSize: 60, color: "#977343" }} />
            </a>
            <a
              href="https://www.linkedin.com/in/jennifercruz-/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon style={{ fontSize: 60, color: "#977343" }} />
            </a>
          </Box>
        </Box>
        <Box style={{ backgroundColor: "#977343", height: "40px" }}>
          <Box paddingTop={1}>
            <Typography
              variant="subtitle2"
              align="center"
              gutterBottom
              style={{ color: "#D2B492" }}
            >
              © 2023 Copyright: Jennifer Cruz
            </Typography>
          </Box>

        </Box>
      </Grid>
    </Grid>

  }

  return (
    <>
      {footerComponent}
    </>
  );
}
export default Footer;
