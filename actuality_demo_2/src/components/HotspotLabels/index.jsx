import { useAnnotations } from "../../AnnotationsProvider";
import { Button, Typography } from "@mui/material";
import React from "react";

const HotspotLabels = () => {
  const { annots, addHotspotFlag, setAddHotspotFlag } = useAnnotations();

  return (
    <>
      <Button variant="contained" onClick={() => setAddHotspotFlag((p) => !p)}>
        {addHotspotFlag ? "Close Hotspot" : "Add Hotspot"}
      </Button>
      <Typography variant="h4">You added</Typography>
      <hr />
      {annots?.map((annot, index) => (
        <React.Fragment key={index}>
          <Typography variant="h6">
            {index + 1} - {annot.label}
          </Typography>
          {/* <pre>{JSON.stringify(annot, null, 4)}</pre> <hr /> */}
        </React.Fragment>
      ))}
    </>
  );
};

export default HotspotLabels;
