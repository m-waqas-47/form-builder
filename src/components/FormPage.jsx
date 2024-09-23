// src/components/FormPage.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Dialog } from '@mui/material';
import ElementWrapper from './ElementWrapper';
import ElementSelector from './ElementSelector';
import AddIcon from '@mui/icons-material/Add';
import { getSelectedContent, getSelectedContentType, setPageContent, setSelectedContent, setSelectedContentType } from '../slices/formSlice';
import { ContentType } from '../utils/constants';
// import { Draggable } from 'react-drag-reorder';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const FormPage = () => {
  const selectedContent = useSelector(getSelectedContent);
  const selectedContentType = useSelector(getSelectedContentType);
  const currentPageId = useSelector((state) => state.form.currentPageId);
  const pages = useSelector((state) => state.form.pages);
  const dispatch = useDispatch();
  const [openElementSelector, setOpenElementSelector] = useState(false);

  const currentPage = pages.find((page) => page.id === currentPageId);

  if (!currentPage) {
    return <Box sx={{ flexGrow: 1, padding: 2 ,border:'2px solid #ccc'}}>No Page Selected</Box>;
  }

  const handleAddWidgetClick = () => {
    setOpenElementSelector(true);
  };

  const handleCloseElementSelector = () => {
    setOpenElementSelector(false);
  };

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
     console.log(destination,'sdsds');
    // If there's no destination, return (dropped outside the list)
    if (!destination) return;

    // // If the item is dropped at the same place, do nothing
    // if (source.index === destination.index) return;

    // // Create a new layouts array with reordered items
    // const updatedLayouts = Array.from(currentPage.layouts);
    // const [reorderedItem] = updatedLayouts.splice(source.index, 1); // Remove dragged item
    // updatedLayouts.splice(destination.index, 0, reorderedItem); // Insert it in the new position

    // // Update state with new layouts order
    // dispatch(setPageContent({
    //   ...currentPage,
    //   layouts: updatedLayouts,
    // }));
  };

  // const handlePageClick = (page) => {
  //   dispatch(setSelectedContent(page));
  //   dispatch(setSelectedContentType(ContentType.PAGE));
  // }
  
  //  console.log(currentPage,'page');
   console.log(currentPage.layouts,'content selected');
  return (
    <Box sx={{ flexGrow: 1, padding: 0,border:'2px solid #ccc',overflowY:'scroll'}}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              flexGrow: 1,
              padding: 0,
              border: '2px solid #ccc',
              overflowY: 'scroll',
            }}
          >
            {currentPage.layouts.map((layout, index) => (
              <Draggable key={layout.id} draggableId={layout.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ElementWrapper index={index} layout={layout} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
      {/* {currentPage.layouts.map((layout,index) => (
        <ElementWrapper
          // key={layout.id}
          key={index}
          index={index}
          layout={layout}
        />
      ))} */}
    
      <Box sx={{display:'flex',justifyContent:'center'}}>
      <Button
      
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleAddWidgetClick}
        sx={{ margin: '20px auto' }}
      >
        Add Widget
      </Button>
      </Box>
      

      <Dialog open={openElementSelector} onClose={handleCloseElementSelector}>
        <ElementSelector
          pageId={currentPageId}
          onClose={handleCloseElementSelector}
        />
      </Dialog>
    </Box>
  );
};

export default FormPage;
