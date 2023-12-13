// NoteModal.jsx
import React from "react";
import { Dialog, DialogContent, Typography } from "@mui/material";

const NoteModal = ({ open, handleClose, noteData }) => {
  if (!noteData) {
    // Add a check for null noteData
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Typography>{noteData.heading}</Typography>
        <Typography>{noteData.text}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default NoteModal;
