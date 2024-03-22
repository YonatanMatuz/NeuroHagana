import { AppBar, Button,  Grid, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import logoImage from "../../../Assets/Images/Logo.png"
import "./Navbar.css";
import DropdownOption from "./DropdownOption/DropdownOption";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import infoTopicsService from "../../../Services/InfoTopicsService";
import CategoryModel from "../../../Models/CategoryModel";
import notifyService from "../../../Services/NotifyService";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import MenuIcon from '@mui/icons-material/Menu';


function Navbar(): JSX.Element {

    const [ categories, setCategories ] = useState<CategoryModel[]>([]);

    const [ open, setOpen ] = useState<boolean>(false);

    // Loads all relevant categories 
    useEffect(() => {

        infoTopicsService.getAllCategories()
        .then(dbCategories => setCategories(dbCategories))
        .catch(err => notifyService.error(err));
        
    }, []);
    
    // For the cases a category has spaces between the words
    function filterSpaces(category: string): string {
        return category.replace(/\s/g, '');
    }

    return (

        <div className="Navbar">
            
            {/* Main container for the navbar */}
             <AppBar color="secondary">

                <Toolbar>

                    {/* For small-medium screens */}
                    <MenuIcon sx={{ display: {xs: 'block', sm: 'block', md: 'block', lg: 'none'} }} onClick={() => setOpen(!open)}/>

                    {/* This entire menu is for small-medium screens */}
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        open={open}
                        onClose={() => setOpen(!open)}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={() => setOpen(!open)}>

                            <NavLink to="/Home">

                                <Typography>
                                    Home
                                </Typography>

                            </NavLink>

                        </MenuItem>
                        
                        {/* Displays categories relevant to information topics */}
                        {categories.map(c => 

                            <MenuItem key={c.categoryId} onClick={() => setOpen(!open)}>

                                <NavLink to={`/${filterSpaces(c.category)}/${c.categoryId}`}>

                                    <Typography>
                                        {c.category}
                                    </Typography>

                                </NavLink>

                            </MenuItem>

                        )}

                        <MenuItem onClick={() => setOpen(!open)}>

                            <NavLink to="/ThePlatform">

                                <Typography>
                                    The Platform
                                </Typography>

                            </NavLink>

                        </MenuItem>

                        <MenuItem onClick={() => setOpen(!open)}>

                            <NavLink to="/Team">

                                <Typography>
                                    The Team
                                </Typography>

                            </NavLink>

                        </MenuItem>

                        <MenuItem onClick={() => setOpen(!open)}>

                            <NavLink to="/Publications">

                                <Typography>
                                    Publications & News
                                </Typography>

                            </NavLink>

                        </MenuItem>     

                    </Menu>

                    {/* For medium-xl screens */}
                    <Grid item sx={{ display: {xs: 'none', sm: 'none', md: 'none', lg: 'flex'} }}>
                        <img src={logoImage} alt="Logo" />
                    </Grid>
                    
                    {/* For medium-xl screens */}
                    <Grid container justifyContent={"center"} alignItems={"center"} marginRight={"150px"} sx={{ display: {xs: 'none', sm: 'none', md: 'none', lg: 'flex'} }}>

                        <Grid item xs={1.5}>

                            <NavLink to="/home">

                                <Button size="large">
                                    Home
                                </Button>

                            </NavLink>

                        </Grid>

                        <Grid item xs={2}>

                            <DropdownOption
                            label="Solutions"
                            categories={categories}
                            />
                            
                        </Grid>

                        <Grid item xs={2}>

                            <PopupState variant="popover" popupId="demo-popup-menu" >

                                {(popupState) => (

                                    <>
                                        <Button size="large" {...bindTrigger(popupState)}>      
                                            About Us
                                        </Button>

                                        <Menu {...bindMenu(popupState)}>

                                            <MenuItem onClick={popupState.close}>

                                                <NavLink to="/ThePlatform">

                                                    <Typography variant="subtitle1">
                                                        The Platform
                                                    </Typography>

                                                </NavLink>

                                            </MenuItem>        

                                            <MenuItem onClick={popupState.close}>

                                                <NavLink to="/Team">

                                                    <Typography variant="subtitle1">
                                                        Team
                                                    </Typography>

                                                </NavLink>

                                            </MenuItem>

                                        </Menu>
                                    </>                
                                )}
                            </PopupState>

                        </Grid>

                        <Grid item xs={3}>

                            <NavLink to="/Publications">
                                <Button size="large">
                                    Publications & News
                                </Button>
                            </NavLink>

                        </Grid>
                        
                    </Grid>
                    
                    {/* Displays if admin is logged in */}
                    <AuthMenu />

                </Toolbar>

            </AppBar>
              
        </div>
    );
}

export default Navbar;
