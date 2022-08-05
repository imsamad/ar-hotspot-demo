import {
  Box,
  Button,
  styled,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { forwardRef } from "react";

import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ShareIcon from "@mui/icons-material/Share";
import Rotate90DegreesCcwIcon from "@mui/icons-material/Rotate90DegreesCcw";

const FooterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  paddingBottom: "1rem",
  border: "0px solid red",
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap-reverse",
  },
}));

const FooterLogo = forwardRef((props, modelRef) => {
  const resetPosition = () => {
    if (!modelRef || !modelRef.current) return;
    modelRef.current.setAttribute("camera-target", "0 0 0");
    modelRef.current.setAttribute("camera-orbit", " 0deg 75deg 105%");
    modelRef.current.setAttribute("field-of-view", " 45deg");
    // modelRef.current.zoom(0);
  };

  let zoomCount = 1,
    rotateCount = 90;

  const zoomModel = () => {
    console.log("zoom");
    modelRef.current.zoom(++zoomCount);
  };

  const rotateModel = () =>
    modelRef.current.setAttribute(
      "camera-orbit",
      `${(rotateCount += 45)}deg 75deg 105%`
    );
  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );
  return (
    <FooterContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          wordBreak: "keep-all",
        }}
      >
        <Typography fontWeight={200} fontSize={"16px"} noWrap>
          powered by {`   `}
        </Typography>
        &nbsp;
        <Typography fontWeight={700} fontSize={"16px"} noWrap>
          {`   `} actuality.live
        </Typography>
      </Box>
      {/* <Box sx={{ flexGrow: 1 }} /> */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexWrap: "wrap",
          justifyContent: "flex-end",
          alignItems: "center",
          // width: "100%",
          border: "0px solid red",
          paddingBottom: isMobileOrTablet ? "1rem" : 0,
        }}
      >
        <Button
          variant="outlined"
          color="success"
          onClick={resetPosition}
          size={isMobileOrTablet ? "small" : "medium"}
          sx={{
            marginRight: 2,
          }}
        >
          Reset
        </Button>

        {/* <CustomIcon src={"/icons/rotate.png"} onClick={rotateModel} /> */}
        <IconButton onClick={rotateModel} size="small">
          <Rotate90DegreesCcwIcon
            fontSize={isMobileOrTablet ? "small" : "large"}
          />
        </IconButton>
        {/* <CustomIcon src={"/icons/zoom.png"} onClick={zoomModel} /> */}
        <IconButton size="small" onClick={zoomModel}>
          <ZoomInIcon fontSize={isMobileOrTablet ? "small" : "large"} />
        </IconButton>
        {/* <CustomIcon src={"/icons/share.png"} /> */}
        <IconButton size="small">
          <ShareIcon fontSize={isMobileOrTablet ? "small" : "large"} />
        </IconButton>
      </Box>
    </FooterContainer>
  );
});

export default FooterLogo;

const CustomIcon = ({ src, alt, ...rest }) => {
  const isMobileOrTablet = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );
  return (
    <img
      src={src}
      alt={alt || src}
      width={isMobileOrTablet ? "40px" : "60px"}
      height={isMobileOrTablet ? "40px" : "40px"}
      style={{
        paddingRight: "1rem",
      }}
      {...rest}
    />
  );
};
