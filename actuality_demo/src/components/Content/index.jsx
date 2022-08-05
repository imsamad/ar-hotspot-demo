import "./style.css";
const Content = ({ data }) => {
  return (
    <div
      className="ck-content"
      dangerouslySetInnerHTML={{ __html: data }}
      // style={convertedCss}
    />
  );
};

export default Content;
