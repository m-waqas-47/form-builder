// src/components/QuestionElement.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPageId, getSelectedContent, setSelectedContent, setSelectedContentType, setSelectedLayoutId, updateElementProperties } from '../slices/formSlice';
import { TextField, Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { ContentType } from '../utils/constants';

const QuestionElement = ({ element,layoutId }) => {
  const dispatch = useDispatch();
  const currentPageId = useSelector(getCurrentPageId);
  const selectedContent = useSelector(getSelectedContent);
  const handleElementClick = (event) => {
    event.stopPropagation();
    dispatch(setSelectedContent(element));
    dispatch(setSelectedContentType(ContentType.ELEMENT));
    dispatch(setSelectedLayoutId(layoutId));
  }
  const handleQuestionTextChange = (e) => {
    dispatch(
      updateElementProperties({
        currentPageId,
        elementId: element.id,
        properties: { questionText: e.target.value },
      })
    );
  };
  console.log(element,'element')
  return (
    <Box onClick={(event) => handleElementClick(event)} sx={{ marginBottom: 2, padding: '15px', border: selectedContent?.id === element?.id ? '2px solid blue' : '2px solid transparent', display: 'flex', flexDirection: 'column', gap: '10px', '&:hover': { border: '2px solid blue' } }}>
      {/* <Typography sx={{}}>{element.properties.label}</Typography> */}
      {element.properties.type === 'short-text' ? <Box>
        <TextField
          sx={{ background: 'none !important' }}
          // label="Label Text"
          variant="filled"
          fullWidth
          value={element.properties.label}
          onChange={handleQuestionTextChange}
        />
        <TextField
          // label="Question Text"
          sx={{ background: 'none !important' }}
          variant="filled"
          fullWidth
          value={element.properties.placeholder}
          onChange={handleQuestionTextChange}
        />
      </Box> : element.properties.type === 'long-text' ?
        <Box>
          <TextField
            sx={{ background: 'none !important' }}
            // label="Label Text"
            variant="filled"
            fullWidth
            value={element.properties.label}
            onChange={handleQuestionTextChange}
          />
          <textarea id="w3review" name="w3review" rows="4" cols="50" onChange={handleQuestionTextChange}>
            {element.properties.placeholder}
          </textarea>
        </Box> : <Box>
          <TextField
            sx={{ background: 'none !important' }}
            // label="Label Text"
            variant="filled"
            fullWidth
            value={element.properties.label}
            onChange={handleQuestionTextChange}
          />
          <FormControl>
            {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Box>
      }
      {element.properties.isRequired && <Typography>* This question is required.</Typography>}
    </Box >
  );
};

export default QuestionElement;
