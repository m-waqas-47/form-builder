// src/components/PageList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { setCurrentPage } from '../slices/formSlice';

const PageList = () => {
  const pages = useSelector((state) => state.form.pages);
  const currentPageId = useSelector((state) => state.form.currentPageId);
  const dispatch = useDispatch();

  const handlePageSelect = (pageId) => {
    dispatch(setCurrentPage(pageId));
  };

  return (
    <List>
      {pages.map((page, index) => (
        <ListItem key={page.id} disablePadding>
          <ListItemButton
            selected={currentPageId === page.id}
            onClick={() => handlePageSelect(page.id)}
          >
            <ListItemText primary={`Page ${index + 1}`} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default PageList;
