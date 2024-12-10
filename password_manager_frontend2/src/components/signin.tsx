import { Typography,TextField,Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props{
    appbarRefresh: number,
    setAppbarRefresh: React.Dispatch<React.SetStateAction<number>>;
}
function Signin(props:Props){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
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
                <Typography>Sign in below</Typography>
                <div style={{
                        marginTop: 15,
                        display: "flex",
                        justifyContent: "center"
                    }}>
                    <TextField  
                    onChange={e=>setUsername(e.target.value)}
                    placeholder="Enter username"
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
                    <div style={{
                        marginTop:"2vh"
                    }}>
                        <TextField  
                        onChange={e=>setPassword(e.target.value)}
                        type ="password"
                        placeholder="Enter password"
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
                        <Button onClick={async()=>{
                            try{
                                const res = await fetch("http://localhost:5005/signin",{
                                method: "POST",
                                headers:{
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    username: username,
                                    password: password
                                })
                            })
                            if(!res.ok){
                                const data = await res.json();
                                alert(data.message || "Something went wrong");
                                return;
                            }

                            const data = await res.json();

                            if(data.success === false){
                                alert(data.messge + "from inside data.success")
                                return;
                            }
                            localStorage.setItem("Authorization", "token "+data.token);
                            navigate('/home');
                            setAppbarRefresh(e=>e+1);
                        }
                        catch(error){
                            console.error("Error during signup:", error);
                            alert("An unexpected error occurred. Please try again later.");
                        }
                        }}
                        style={{
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
                            Sign in                        
                        </Button>
                    </div>
            </div>
        </div>
    )
}
export default Signin;