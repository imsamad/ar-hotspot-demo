import { Button } from "@mui/material";
import React, { useImperativeHandle } from "react";
import { useAnnotations } from "../../AnnotationsProvider";

import AnotationDetails from "../AnotationDetails";

const Annotations = React.forwardRef((props, ref) => {
  const { annots, addAnnots, addHotspotFlag } = useAnnotations();

  useImperativeHandle(ref, () => ({
    handleClick: (annotCords, cameraTarget, cameraOrbit) =>
      handleClick(annotCords, cameraTarget, cameraOrbit),
    log: () => {
      console.log("Log fdrom ");
    },
  }));

  const handleClick = (annotCords, cameraTarget, cameraOrbit) => {
    if (!annotCords || !addHotspotFlag) return;

    let label = prompt("Enter label");

    if (!label) return;
    const newAnnot = {
      dataNormal: getDataNormal(annotCords),
      dataPosition: getDataPosition(annotCords),
      cameraTarget,
      cameraOrbit,
      label,
    };
    addAnnots(newAnnot);
    return "added";
  };

  const getDataPosition = (annot) =>
    `${annot.position.x} ${annot.position.y} ${annot.position.z}`;

  const getDataNormal = (annot) =>
    `${annot.normal.x} ${annot.normal.y} ${annot.normal.z}`;

  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          console.log(annots[0]);
        }}
      >
        Zoom To
      </Button>
      {annots.map((annot, index) => (
        <AnotationDetails annot={annot} key={index} />
      ))}
    </>
  );
});

export default Annotations;
