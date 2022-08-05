import { Box, Typography } from "@mui/material";

import "@google/model-viewer";
import React, { useRef, useState } from "react";

import "./App.css";

const App = () => {
  const modelRef = useRef();
  /**
     Annot structure
   * @annots  [{
      dataPosition: "",
      dataNormal: "",
      label: "",
    }]
   */

  const [annots, setAnnots] = useState([
    {
      dataPosition: "0  1.0054235458374023 -0.006166502833366394",
      dataNormal: "0 0 1",
      label: "Label One",
    },
  ]);

  const handleClick = ({ clientX, clientY }) => {
    const model = modelRef.current;
    if (!model) return;
    let hit = model.positionAndNormalFromPoint(clientX, clientY);
    if (hit) {
      // model.disableInteraction();
      // model.removeAttribute("camera-controls");

      let label = prompt("Enter label");
      setAnnots((annots) => {
        return [
          ...annots,
          {
            dataNormal: getDataNormal(hit),
            dataPosition: getDataPosition(hit),
            label,
          },
        ];
      });
    }
  };

  const getDataPosition = (annot) => {
    return `${annot.position.x} ${annot.position.y} ${annot.position.z}`;
  };

  const getDataNormal = (annot) => {
    return `${annot.normal.x} ${annot.normal.y} ${annot.normal.z}`;
  };
  let str = `enable-pan camera-controls`;
  return (
    <div>
      <Box display="flex" width="100vw" height="100vh">
        <Box width="70vw" mr={1} border="2px solid red">
          <model-viewer
            src="/shared-assets/models/Astronaut.glb"
            ar
            ar-modes="webxr quick-look scene-viewer"
            touch-action="pan-x"
            onClick={handleClick}
            ref={(ref) => {
              modelRef.current = ref;
            }}
            enable-pan
            camera-controls
            alt="A 3D model of an astronaut."
          >
            {annots.map((annot) => (
              <Annotation key={annot.dataNormal} annot={annot} />
            ))}
          </model-viewer>
        </Box>
        <Box
          width="30vw"
          border="2px solid #eee"
          ml={1}
          p={2}
          sx={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <Typography variant="h4">You added</Typography>
          <hr />
          {annots.map((annot, index) => (
            <React.Fragment key={index}>
              <Typography variant="h6"> {annot.label} </Typography>
              {/* <pre>{JSON.stringify(annot, null, 4)}</pre> <hr /> */}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default App;

const Annotation = ({ annot: { dataPosition, dataNormal, label } }) => (
  <button
    className="annotBtn"
    slot={`hotspot-${label}`}
    data-position={dataPosition}
    data-normal={dataNormal}
  >
    <div className="annotLabel">{label}</div>
  </button>
);
