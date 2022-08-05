import "@google/model-viewer";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import ModelViewer from "./ModelViewer";
import AnnotationsProvider from "./ModelViewer/Ctx/AnnotationsProvider";
import EnableHotpsotAdd from "./ModelViewer/EnableHotpsotAdd";

const Wrapper = styled(Box)(({ theme }) => ({
  // Dimensions
  maxWidth: "100vw",
  maxHeight: "100vh",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  // Layout
  display: "grid",
  placeItems: "center",

  padding: "2rem",
  [theme.breakpoints.down("md")]: {
    padding: "1rem",
  },
  border: "0px solid red",
}));

const Model = () => {
  console.log(`Model`);
  return (
    <AnnotationsProvider>
      <EnableHotpsotAdd />
      <Wrapper>
        <ModelViewer
          brandLogoSrc={"/icons/brandLogo.png"}
          enableAddAnnotations={true}
          src="/assets/gbl/rover.glb"
          alt="A 3D model of an astronaut."
          modelId="1"
        />
      </Wrapper>
    </AnnotationsProvider>
  );
};

export default Model;
