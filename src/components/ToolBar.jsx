// src/components/ToolBar.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { addPage } from '../slices/formSlice';
import { Button, Box } from '@mui/material';
import PageList from './PageList';

const ToolBar = () => {
  const dispatch = useDispatch();

  const handleAddPage = () => {
    dispatch(addPage());
  };

  return (
    <Box sx={{ width: '250px', padding: 2 }}>
      <Button variant="contained" onClick={handleAddPage} fullWidth>
        Add Page
      </Button>
      <PageList />
    </Box>
  );
};

export default ToolBar;
