
// RightSidebar.jsx
import React from 'react';
import { TextField, ButtonGroup, Button, List, Divider, Box, Typography, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateElementProperties, updateLayoutColumns, updateLayoutBackground, getPages, getCurrentPageId, getSelectedContent, getSelectedContentType, addPage } from '../slices/formSlice';
import PageItem from './PageItem';
import { ContentType } from '../utils/constants';
import Pageicon from '../assets/Vector.png'
const RightSidebar = () => {
  const pages = useSelector(getPages);
  const selectedContent = useSelector(getSelectedContent);
  const selectedContentType = useSelector(getSelectedContentType);
  const currentPageId = useSelector(getCurrentPageId);
  const dispatch = useDispatch();
  const handlePropertyChange = (e) => {
    dispatch(updateElementProperties({
      currentPageId,
      elementId: selectedContent.id,
      properties: { [e.target.name]: e.target.value }
    }));
  };
  const handleLayoutColumnChange = (columns) => {
    dispatch(updateLayoutColumns({ pageId: currentPageId, layoutId: selectedContent.id, columns }));
  };
  const handleLayoutBackgroundChange = (color) => {
    dispatch(updateLayoutBackground({ pageId: currentPageId, layoutId: selectedContent.id, color }));
  }
  const handleAddPage = () => {
    dispatch(addPage());
  };
  const handleElementTypeChange = (val) => {
    console.log('val', val);
    dispatch(updateElementProperties({
      pageId: currentPageId,
      elementId: selectedContent.id,
      properties: { type: val }
    }));
  }
  const handleToggleChange = (e) => {
    dispatch(updateElementProperties({
      pageId: currentPageId,
      elementId: selectedContent.id,
      properties: { [e.target.name]: e.target.checked }
    }));
  }
  console.log(selectedContent, 'selected')
  return (
    <Box sx={{ border: '2px solid #ccc', width: '300px' }}>
      <List>
        {pages.map((page, index) =>
          <PageItem page={page} />
        )}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <Button variant="contained" onClick={handleAddPage} size='medium'>
          Add Page
        </Button>
      </Box>

      <Divider />
      {/* Layout selection */}
      {selectedContentType === ContentType.LAYOUT && <Box>
        <Box>
          <Typography>Columns</Typography>
          <ButtonGroup sx={{ padding: '15px' }}>
            <Button onClick={() => handleLayoutColumnChange(1)}>1 Column</Button>
            <Button onClick={() => handleLayoutColumnChange(2)}>2 Columns</Button>
            <Button onClick={() => handleLayoutColumnChange(3)}>3 Columns</Button>
          </ButtonGroup>
        </Box>
        <Box>
          <Typography>Background Color</Typography>
          <ButtonGroup >
            <Button onClick={() => handleLayoutBackgroundChange('red')} sx={{ width: '100px', height: '40px', background: 'red' }}><Typography>Red</Typography></Button>
            <Button onClick={() => handleLayoutBackgroundChange('green')} sx={{ width: '100px', height: '40px', background: 'green' }}><Typography>Green</Typography></Button>
            <Button onClick={() => handleLayoutBackgroundChange('white')} sx={{ width: '100px', height: '40px', background: 'white' }}><Typography>White</Typography></Button>
          </ButtonGroup>
        </Box>

      </Box>}
      {selectedContentType === ContentType.ELEMENT && <Box>
        {['email', 'text', 'question'].includes(selectedContent?.type) && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <Typography>Question Required</Typography>
            <Switch checked={selectedContent?.properties?.isRequired} name="isRequired" onChange={handleToggleChange} />
          </Box>
        )}
        {['question'].includes(selectedContent?.type) && (
          <Box sx={{padding: '10px' }}>
            <Typography sx={{marginBottom:'10px'}}>Question Type</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Box>
                  <Box onClick={() => handleElementTypeChange('short-text')}>
                    <img src={Pageicon} style={{ width: '60px', height: '60px', border: selectedContent?.properties?.type === 'short-text' ? "2px solid blue" : "2px solid transparent" }} />
                  </Box>
                  <Typography>Short Text</Typography>
                </Box>
                <Box>
                  <Box onClick={() => handleElementTypeChange('long-text')}>
                    <img src={Pageicon} style={{ width: '60px', height: '60px', border: selectedContent?.properties?.type === 'long-text' ? "2px solid blue" : "2px solid transparent" }} />
                  </Box>
                  <Typography>Long Text</Typography>
                </Box>
                <Box>
                  <img src={Pageicon} onClick={() => handleElementTypeChange('multiple-choice')} style={{ width: '60px', height: '60px', border: selectedContent?.properties?.type === 'multiple-choice' ? "2px solid blue" : "2px solid transparent" }} />
                  <Typography>Multiple Choice</Typography>
                </Box>
                <Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>}


      <Divider />


      {/* {['email', 'text', 'question'].includes(selectedContent?.type) && (
        <>
          <TextField
            label="Label"
            name="label"
            value={selectedElement.properties.label || ''}
            onChange={handlePropertyChange}
            fullWidth
          />
          <TextField
            label="Placeholder"
            name="placeholder"
            value={selectedElement.properties.placeholder || ''}
            onChange={handlePropertyChange}
            fullWidth
          />
        </>
      )} */}

    </Box >
  );
};
export default RightSidebar;