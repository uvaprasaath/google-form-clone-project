import React, {useState} from 'react'
import { ArrowDropDownOutlined } from '@mui/icons-material'
import FlexBetween from './Flexbetween'
import profileImage from "../assets/profile.png"
import { AppBar,Toolbar, useTheme, Menu , MenuItem, Box , Button, Typography } from '@mui/material'
import { Authstate } from './aurthprovider'
import formIcon from "../assets/form_icon.png"


function NavBar() {
    const theme = useTheme();
    const {user,logOut} = Authstate();
    const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {

    logOut();
   
     setAnchorEl(null);
   
   };
 
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
     <AppBar 
       sx={{
        position:"static",
        boxShadow:"none",
        background:"none"
       }}
     >
        <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
            <FlexBetween sx={{flexGrow:"1"}} gap="1.5rem">
              <FlexBetween >
                <Box>
                  <img src={formIcon} alt=""/>
                </Box>
                <Typography sx={{color:"black"}}>Forms</Typography>
              </FlexBetween>
              <FlexBetween >
                      <Button
                        onClick={handleClick}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          textTransform: "none",
                          gap: "1rem",
                        }}
                      >
                        <Box
                          component="img"
                          alt="profile"
                          src={profileImage}
                          height="32px"
                          width="32px"
                          borderRadius="50%"
                          sx={{ objectFit: "cover" }}
                        />
                        <Box textAlign="left">
                          <Typography
                            fontSize="0.75rem"
                            sx={{ color: theme.palette.secondary[200] }}
                          >
                            {user?.email}
                          </Typography>
                        </Box>
                        <ArrowDropDownOutlined
                          sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                        />
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={isOpen}
                        onClose={closeMenu}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                      >
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                      </Menu>
              </FlexBetween>
            </FlexBetween>
        </Toolbar>
     </AppBar>
  )
}

export default NavBar