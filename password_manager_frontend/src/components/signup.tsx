import { Typography,TextField,Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return(
        <div>
            <div style={{
                display: "flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                height: "60vh"
            }}>
                <Typography>Sign up below</Typography>
                <div style={{
                        marginTop: 15,
                        display: "flex",
                        justifyContent: "center"
                    }}>
                    <TextField  
                    placeholder="Enter username"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                            borderColor: "transparent", // Remove border color on focus
                            }
                        }
                    }}
                    onChange={e=>setUsername(e.target.value)}
                        InputProps={{ 
                        style: {
                            backgroundColor: "white",
                            border: "1px solid #15a13a",
                            width: "30vw",
                            borderRadius: "50px",
                            height: 40
                        }}}/>  
                    </div> 
                    <div style={{
                        marginTop:"2vh"
                    }}>
                        <TextField  
                        type ="password"
                        placeholder="Enter password"
                        onChange={e=>setPassword(e.target.value)}
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
                                width: "30vw",
                                borderRadius: "50px",
                                height: 40
                            }}}/>
                    </div>
                    <div
                    style={{
                        width:"30vw",
                        justifyContent: "flex-start",
                    }}>
                        <Button onClick={()=>{
                            fetch("http://localhost:5005/signup",{
                                method:"POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    username: username,
                                    password: password
                                })
                            }).then(response=>{
                                if(!response.ok){
                                    throw new Error("Network response was not ok" + response.statusText);
                                }
                                return response.json();
                            }).then(data=>{
                                localStorage.setItem("Authorization","token " + data.token);
                                navigate('/home');
                            })
                        }}style={{
                            color: "black",
                            backgroundColor: "rgb(93,227,148)",
                            marginTop: "1.5vh",
                            textTransform: 'none',
                            borderRadius: "15px",
                            padding: "15px",
                            border: "1.5px solid #15a13a",
                            minWidth: "6vw",
                            height: "4vh"
                            }}>
                            Sign up                        
                        </Button>
                    </div>
            </div>
        </div>
    )
}
export default Signup;