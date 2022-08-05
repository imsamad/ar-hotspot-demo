import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import AnnotationsProvider, { useAnnotations } from "./AnnotationsProvider";

import "./App.css";

import ModelViewer from "./components/ModelViewer";
import HotspotLabels from "./components/HotspotLabels";
import MediaQuery from "./components/MediaQuery";

const App = () => {
  return (
    <>
      <MediaQuery />
      <AnnotationsProvider>
        <Box display="flex" width="100vw" height="100vh">
          <Box width="70vw" mr={1} border="2px solid red">
            <ModelViewer />
          </Box>
          <Box
            width="30vw"
            border="2px solid #eee"
            ml={1}
            p={2}
            sx={{ maxHeight: "100vh", overflowY: "auto" }}
          >
            <HotspotLabels />
          </Box>
        </Box>
      </AnnotationsProvider>
    </>
  );
};

export default App;
