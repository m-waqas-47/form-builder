// src/components/LayoutSelector.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
// import { updateElementColumns } from '../slices/formSlice';
import { ButtonGroup, Button, Box } from '@mui/material';

const LayoutSelector = ({ elementId, pageId }) => {
  const dispatch = useDispatch();

  const handleColumnsChange = (columns) => {
    // dispatch(updateElementColumns({ pageId, elementId, columns }));
  };

  return (
    <Box sx={{ marginBottom: 1 }}>
      <ButtonGroup variant="outlined" size="small">
        <Button onClick={() => handleColumnsChange(1)}>1 Column</Button>
        <Button onClick={() => handleColumnsChange(2)}>2 Columns</Button>
        <Button onClick={() => handleColumnsChange(3)}>3 Columns</Button>
      </ButtonGroup>
    </Box>
  );
};

export default LayoutSelector;
