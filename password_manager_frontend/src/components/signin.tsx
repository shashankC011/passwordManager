import { Typography,TextField,Button } from "@mui/material";
function Signin(){
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
                        <Button style={{
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