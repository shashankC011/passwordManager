import { Typography,TextField,Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props{
    appbarRefresh: number,
    setAppbarRefresh: React.Dispatch<React.SetStateAction<number>>;
}
function Signup(props:Props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();    
    let appbarRefresh = props.appbarRefresh;
    const setAppbarRefresh = props.setAppbarRefresh;
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
                        <Button onClick={async () => {
                                try {
                                    const response = await fetch("http://localhost:5005/signup", {
                                        method: "POST",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            username: username,
                                            password: password
                                        })
                                    });

                                    // Check if the response status is OK (status code 200-299)
                                    if (!response.ok) {
                                        // Handle HTTP errors like 400, 401, 500, etc.
                                        const data = await response.json();
                                        alert(data.message || 'Something went wrong');
                                        return; // Stop further execution if there's an error
                                    }

                                    // Parse the response JSON
                                    const data = await response.json();

                                    // Handle application-specific errors (e.g., success flag in response)
                                    if (data.success === false) {
                                        alert(data.messge + "from inside data.success")
                                    } else {
                                        // Store the token in localStorage
                                        localStorage.setItem("Authorization", "token " + data.token);
                                        // Navigate to the home page
                                       navigate('/home');
                                       setAppbarRefresh(e=>e+1);
                                    }
                                } catch (error) {
                                    // Handle any network or unexpected errors
                                    console.error("Error during signup:", error);
                                    alert("An unexpected error occurred. Please try again later.");
                                }
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