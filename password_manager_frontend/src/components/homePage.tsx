import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import YourPasswords from "./yourPasswords";
function Home(){
    const [url,seturl]=useState("");
    const[websiteName,setWebsiteName]=useState("");
    const[username,setUsername]=useState("");
    const[password,setPassword] =useState("");
    useEffect(()=>{
    },[])
    return(
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            height: "60vh",
        }}>
            <Typography style={{
                color: "#123d0d",
                opacity: "0.8"
            }}>Password Manager</Typography>

            <div style={{
                marginTop: 15,
                display: "flex",
                justifyContent: "center"
            }}>
            <TextField  
            onChange={e=>seturl(e.target.value)}
            placeholder="Enter website URL"
            sx={{
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: "transparent", // Remove border color on focus
                    }
                }
            }}
                InputProps={{ 
                style: {
                    backgroundColor: "white",
                    border: "1px solid #15a13a",
                    width: "70vw",
                    borderRadius: "50px",
                    height: 33
                }}}/>   
            </div>
            <div style={{
                marginTop: 15,
                width:"70vw",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
            <TextField  
            placeholder="Enter Website Name"
            sx={{
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: "transparent", // Remove border color on focus
                    }
                }
            }}
                InputProps={{ 
                style: {
                    backgroundColor: "white",
                    borderRadius: "50px",
                    width: "36vw",
                    border: "1px solid #15a13a",
                    height: 33,
            }}}/>
            <TextField
                onChange={e=>setUsername(e.target.value)}
                placeholder="Enter Username"

                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: "transparent", // Remove border color on focus
                        }
                    }
                }}
                InputProps={{ 
                style: {
                    backgroundColor: "white",
                    borderRadius: "50px",
                    width: "15vw",
                    border:"1px solid #15a13a",
                    height: 33
            }}}/>
                <TextField  
                placeholder="Enter Password"
                type="password"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: "transparent", // Remove border color on focus
                        }
                    }
                }}
                InputProps={{ 
                style: {
                    backgroundColor: "white",
                    borderRadius: "50px",
                    width: "15vw",
                    border:"1px solid #15a13a",
                    height: 33
            }}}/>
            </div>
            <div>
                <Button style={{
                    color: "black",
                    backgroundColor: "rgb(93,227,148)",
                    marginTop: "2vh",
                    textTransform: 'none',
                    borderRadius: "15px",
                    padding: "15px",
                    border: "1.5px solid #15a13a",
                    minWidth: "6vw",
                    height: "4vh"
                }}>
                Save                        
                </Button>
            </div>
            <YourPasswords/>
        </div>
    )
}
export default Home;