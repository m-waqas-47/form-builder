
// TextFieldElement.jsx
import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { getSelectedContent, setSelectedContent, setSelectedContentType, setSelectedLayoutId } from '../slices/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ContentType } from '../utils/constants';
const TextFieldElement = ({ element, layoutId }) => {
  const dispatch = useDispatch();
  const selectedContent = useSelector(getSelectedContent);
  const handleElementClick = (event) => {
    event.stopPropagation();
    dispatch(setSelectedContent(element));
    dispatch(setSelectedContentType(ContentType.ELEMENT));
    dispatch(setSelectedLayoutId(layoutId));
  }
  return (
    <Box onClick={(event) => handleElementClick(event)} sx={{ marginBottom: 2, padding: '15px', border: selectedContent?.id === element?.id ? '2px solid blue' : '2px solid transparent', display: 'flex', flexDirection: 'column', gap: '10px', '&:hover': { border: '2px solid blue' } }}>
      <Typography sx={{}}>{element.properties.label}</Typography>
      <TextField
        label={element.properties.label || 'Text Field'}
        placeholder={element.properties.placeholder || 'Enter your text'}
        fullWidth
      />
      {element.properties.isRequired && <Typography>* This question is required.</Typography>}
    </Box>
  );
};
export default TextFieldElement;