import { useImperativeHandle, forwardRef, useState } from "react";
import { useAnnotations } from "../Ctx/AnnotationsProvider";

import CKEEditorDialog from "../../../CKEEditorDialog2";

const getDataPosition = (annot) =>
  `${annot.position.x} ${annot.position.y} ${annot.position.z}`;

const getDataNormal = (annot) =>
  `${annot.normal.x} ${annot.normal.y} ${annot.normal.z}`;

const AddAnnotaions = forwardRef((_props, addRef) => {
  const [data, setData] = useState({
    title: "",
    content: "",
    dataPosition: "",
    dataNormal: "",
    cameraTarget: "",
    cameraOrbit: "",
  });

  const [openEditor, setOpenEditor] = useState(false);

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const { addHotspotFlag, addAnnots } = useAnnotations();

  useImperativeHandle(addRef, () => ({
    handleClick: (newAnnotCords) => handleClick(newAnnotCords),
    log: () => {
      console.log("Log fdrom ");
    },
  }));

  const handleClick = (newAnnotCords) => {
    console.log(`newAnnotCords`, newAnnotCords);
    if (!addHotspotFlag) return;

    const { annotCords, cameraTarget, cameraOrbit } = newAnnotCords;

    var newAnnot = {
      dataNormal: getDataNormal(annotCords),
      dataPosition: getDataPosition(annotCords),
      cameraTarget,
      cameraOrbit,
    };

    setData((pre) => ({
      ...pre,
      ...newAnnot,
    }));

    setOpenEditor(true);
  };

  const handleSaveData = (title, content) => {
    addAnnots({ ...data, title, content });
    setOpenEditor(false);
  };

  return (
    <CKEEditorDialog
      openEditor={openEditor}
      handleClose={handleCloseEditor}
      handleSaveData={handleSaveData}
    />
  );
});

export default AddAnnotaions;
