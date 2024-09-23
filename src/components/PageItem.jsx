import { ListItem, ListItemButton, ListItemText, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setPageName } from "../slices/formSlice";
import Pageicon from '../assets/Vector.png'
import { useState } from "react";

const PageItem = ({ page }) => {
    const [pageName, setPageNameLocal] = useState(page?.name);
    const currentPageId = useSelector((state) => state.form.currentPageId);
    const dispatch = useDispatch();
    const handlePageSelect = (pageId) => {
        dispatch(setCurrentPage(pageId));
    };
    const handleChange = (event) => {
        setPageNameLocal(event.target.value);
        dispatch(setPageName({ pageId: currentPageId, name: event.target.value }));
        console.log(event.target.value, 'sss;', page);
    }

    return (<ListItem key={page.id} disablePadding sx={{ display: 'flex', gap: '10px',margin:'10px' }}>
        <img style={{ width: '60px', height: '60px', border: currentPageId === page.id ? '2px solid blue' : '2px solid transparent' }} src={Pageicon} onClick={() => handlePageSelect(page.id)} />

        <TextField variant="outlined" value={pageName} onChange={handleChange} size="medium"/>

    </ListItem>)
}

export default PageItem;