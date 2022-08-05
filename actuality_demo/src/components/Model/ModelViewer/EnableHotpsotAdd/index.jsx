import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

import { useAnnotations } from "../Ctx/AnnotationsProvider";

const FloatBtn = styled(Box)({
  position: "fixed",
  top: 0,
  right: 0,
  padding: "1rem",
  bordreRadius: "1rem",
  background: "rgba(0,0,255,0.2)",
  zIndex: 20,
});

const EnableHotpsotAdd = () => {
  const { addHotspotFlag, setAddHotspotFlag } = useAnnotations();

  return (
    <FloatBtn>
      <Button
        onClick={() => setAddHotspotFlag((p) => !p)}
        color="secondary"
        variant="contained"
        size="large"
      >
        {addHotspotFlag ? "Disable  " : "Enable  "} Add Hotspot
      </Button>
    </FloatBtn>
  );
};

export default EnableHotpsotAdd;
