import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import {
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
} from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/material/styles";
import { DataContext } from "../context/DataProvider";

const StyledCard = styled(Card)`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 240px;
  margin: 8px;
  box-shadow: none;
`;

const Note = ({ data, onNoteClick, setIsEditings }) => {
  const { notes, setNotes, setAcrchiveNotes, setDeleteNotes } = useContext(
    DataContext
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    heading: data.heading,
    text: data.text,
  });

  const archiveNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setAcrchiveNotes((prevArr) => [data, ...prevArr]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setDeleteNotes((prevArr) => [data, ...prevArr]);
  };

  const startEditing = () => {
    setIsEditing(true);
    setIsEditings(true)
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedData({
      heading: data.heading,
      text: data.text,
    });
  };

  const saveEditing = () => {
    const updatedNotes = notes.map((note) =>
      note.id === data.id
        ? { ...note, heading: editedData.heading, text: editedData.text }
        : note
    );
    setNotes(updatedNotes);
    setIsEditing(false);
  };

  const onTextChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const addElipses = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  return (
    <StyledCard onClick={() => onNoteClick(data , setIsEditings)}>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              multiline
              value={editedData.heading}
              name="heading"
              onChange={onTextChange}
            />
            <TextField
              multiline
              fullWidth
              value={editedData.text}
              name="text"
              onChange={onTextChange}
            />
          </>
        ) : (
          <>
            <Typography>{addElipses(data.heading, 15)}</Typography>
            <Typography>{addElipses(data.text, 50)}</Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {isEditing ? (
          <>
            <Button onClick={cancelEditing}>Cancel</Button>
            <Button onClick={saveEditing}>Save</Button>
          </>
        ) : (
          <>
            <Archive
              fontSize="small"
              style={{ marginLeft: "auto" }}
              onClick={() => archiveNote(data.id)}
            />
            <Delete fontSize="small" onClick={() => deleteNote(data.id)} />
            <EditOutlinedIcon fontSize="small" onClick={startEditing} />
          </>
        )}
      </CardActions>
    </StyledCard>
  );
};

export default Note;
