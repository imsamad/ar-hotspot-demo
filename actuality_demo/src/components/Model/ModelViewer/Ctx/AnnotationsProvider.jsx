import { createContext, useContext, useState, useEffect } from "react";

const AnnotCtx = createContext();

const ANNOTS_CORDS = "ANNOTS_CORDS";

const AnnotationsProvider = ({ children }) => {
  /*
    Annot structure
      @annots  [ {
      dataPosition: "",
      dataNormal: "",
      label: "",
      cameraTarget: "",
      cameraOrbit: "",
    } ]
  */

  const [annots, setAnnots] = useState([]);
  const [addHotspotFlag, setAddHotspotFlag] = useState(false);

  useEffect(() => {
    const annotFromLocalStorage = localStorage.getItem(ANNOTS_CORDS);
    if (annotFromLocalStorage) {
      setAnnots(JSON.parse(annotFromLocalStorage));
    }
  }, []);

  const addAnnots = (newAnnot) => {
    const newAnnots = [...annots, newAnnot];

    setAnnots(newAnnots);
    localStorage.setItem(ANNOTS_CORDS, JSON.stringify(newAnnots));
  };

  return (
    <AnnotCtx.Provider
      value={{ annots, addAnnots, addHotspotFlag, setAddHotspotFlag }}
    >
      {children}
    </AnnotCtx.Provider>
  );
};

export default AnnotationsProvider;

export const useAnnotations = () => useContext(AnnotCtx);
