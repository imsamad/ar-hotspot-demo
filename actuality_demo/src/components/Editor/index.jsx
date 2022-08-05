import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box, Button } from "@mui/material";
import Content from "../Content";

const Editor = () => {
  const [state, setState] = useState("");
  const editorRef = useRef();
  const getData = () => {
    console.log("getData ", editorRef.current.getData());
  };
  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "1rem auto",
        border: "1px solid #ddd",
        borderRadius: "0.3rem",
        padding: 1,
        // margin: 1,
      }}
    >
      <Button onClick={getData}> Get Data</Button>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          editorRef.current = editor;
          // You can store the "editor" and use when it is needed.
          //   console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          //   console.log({ event, editor });
          const data = editor.getData();
          setState(data);
          // console.log(editor.getData());
          //   console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          //   console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
        }}
      />
      <Box sx={{ padding: 2 }}>
        <div>
          <pre>{state}</pre>
        </div>
      </Box>
      <br />
      <br />
      <hr />
      <Box sx={{ padding: 2 }}>
        <Content data={state} />
        {/* <div dangerouslySetInnerHTML={{ __html: state }} /> */}
      </Box>
    </Box>
  );
};

export default Editor;
