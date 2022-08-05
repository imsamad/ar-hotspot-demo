import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAnnotations } from "../Model/ModelViewer/Ctx/AnnotationsProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function CKEEditorDialog({
  openEditor,
  handleClose,
  annotCords,
}) {
  const [data, setData] = React.useState({
    title: "",
    content: "",
  });

  const [isError, setIsError] = React.useState(false);
  const { addAnnots } = useAnnotations();

  const handleSave = () => {
    if (!data.title) {
      setIsError(true);
      return;
    }
    addAnnots({ ...data, ...annotCords });
    handleClose();
  };

  return (
    <Dialog
      open={openEditor}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Add Informations</DialogTitle>

      <DialogContent>
        <Box sx={{ paddingTop: "1rem" }} />
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ margin: 1, marginLeft: 0 }}
        >
          Title
        </Typography>
        <TextField
          onChange={(e) => setData((p) => ({ ...p, title: e.target.value }))}
          error={isError && !data?.title}
          value={data.title}
          fullWidth
          helperText="Title is required."
          id="fullWidth"
          placeholder="Title"
          size="small"
        />
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ margin: 1, marginLeft: 0 }}
        >
          Content
        </Typography>
        <CKEditor
          config={{
            ckfinder: {
              uploadUrl: "/upload",
            },
          }}
          data={`<h2>What is Lorem Ipsum?</h2><ul><li>List One</li><li>List Two</li><li>List Three</li></ul><h2>Hero Goes Heading 1</h2><h3>Hero Goes Heading 2</h3><h4>Hero Goes Heading 3</h4><p>&nbsp;</p><ol><li>OL one</li><li>OL Two</li></ol><blockquote><p>It is blockquote.</p></blockquote><p>&nbsp;</p><figure class=\"table\"><table><tbody><tr><td>Col 1</td><td>Col 2</td><td>Col 3</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure><p>&nbsp;</p><p>&nbsp;</p>`}
          onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
          }}
          onReady={(editor) => {
            setData((p) => ({ ...p, content: editor.getData() }));
          }}
          onFocus={(event, editor) => {
            console.log("focus");
            //   console.log("Focus.", editor);
          }}
          editor={ClassicEditor}
          onChange={(e, editor) => {
            setData((p) => ({ ...p, content: editor.getData() }));
          }}
        />
      </DialogContent>
      <DialogActions sx={{ marginBottom: 1 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="error"
          size="small"
          sx={{
            marginRight: "1rem",
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            marginRight: "0.5rem",
          }}
          variant="contained"
          color="success"
          size="small"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
