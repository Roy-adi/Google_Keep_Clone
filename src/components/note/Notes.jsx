import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Form from "./Form";
import { DataContext } from "../context/DataProvider";
import Note from "./Note";
import EmptyNotes from "./EmptyNotes";
import NoteModal from "./NoteModal";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Notes = () => {
  const { notes, setNotes } = useContext(DataContext);

  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  useEffect(() => {
    if (!isEditing) {
      setIsModalOpen(true);
    }
  }, [handleNoteClick ,isEditing ]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
    setIsEditing(false);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ p: 3, width: "100%" }}>
        <DrawerHeader />
        <Form />
        {notes.length > 0 ? (
          <Grid container style={{ marginTop: 38 }}>
            {notes.map((items) => (
              <Grid item key={items.id}>
                <Note
                  data={items}
                  onNoteClick={handleNoteClick}
                  setIsEditings={setIsEditing}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyNotes />
        )}
      </Box>
      <NoteModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        noteData={selectedNote}
      />
    </Box>
  );
};

export default Notes;


