import { useAnnotations } from "../Ctx/AnnotationsProvider";

import AnotationBtn from "./AnotationBtn";

const AnnotationBtns = ({ handleActivate_Model_Container }) => {
  const { annots } = useAnnotations();
  return (
    <>
      {annots.map((annot, index) => (
        <AnotationBtn
          annot={annot}
          key={index}
          handleActivate_Model_Container={handleActivate_Model_Container}
        />
      ))}
    </>
  );
};
export default AnnotationBtns;
