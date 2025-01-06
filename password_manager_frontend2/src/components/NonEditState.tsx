import { TextField, Typography } from "@mui/material";
import DeleteButton from "./deleteButton";
import EditButton from "./EditButton";
import { useState } from "react";
interface Data{
    url :string,
    username :string,
    password: string,
    websiteName ?: string,
    _id: string
}
interface Props{
    data: Data[],
    state:number,
    setState: React.Dispatch<React.SetStateAction<number>>,
}
function NonEditState(props:Props){

    const data = props.data;
    const[tempDatumId,setTempDatumId] = useState("");
    const[editButtonWebsiteName,setEditButtonWebsiteName] = useState("");
    const[editButtonUsername,setEditButtonUsername] = useState("");
    const[editButtonPassword,setEditButtonPassword] = useState("");
    const[editButtonUrl,setEditButtonUrl] = useState("");
    const setState = props.setState;
    const state = props.state;
    return(
        <div>
            <div style={{
                display: "flex",
                width:"70vw",
                flexDirection:"column",
            }}>
                <div>
                    <Typography variant ="h6" style={{
                        fontWeight:"bold",
                        marginTop:"2vh"
                    }}> Your Passwords</Typography>
                </div>
                <div style={{
                    marginTop:"2vh",
                    backgroundColor:"#18743c",
                    height:"4vh",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection:"row",
                    }}>
                        <div style={{
                            width: "19vw",
                            display: "flex",
                            flexDirection:"column"
                            }}>
                            <div>
                                <Typography style={{
                                    color: "white",
                                    textAlign:"center",
                                }}>Website Name</Typography>
                            </div>
                            <div style={{
                                backgroundColor:"#cdfad6",
                                textAlign:"center",
                                overflowWrap: "break-word" /* Breaks lines at appropriate points */
                                }}>
                                {data && data.length > 0 ? (
                                    data.map((datum: Data) => {
                                        if (datum && datum.websiteName) {
                                            if(datum._id == tempDatumId){
                                                return(
                                                    <div style={{
                                                        padding: "3px"
                                                    }}>
                                                        <TextField onChange={e=>setEditButtonWebsiteName(e.target.value)} variant = "outlined" sx={{
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
                                                                border: "1px solid #15a13a",
                                                                height: 25,
                                                            }}} 
                                                        label="" defaultValue={editButtonWebsiteName}/>
                                                    </div>
                                                )
                                            }
                                            else{
                                                return (
                                                    <div style={{
                                                        padding: "3px"
                                                    }}>
                                                        {datum.websiteName}
                                                    </div>
                                                );
                                            }
                                        }
                                        return (
                                            <div>
                                                none
                                                </div>
                                        ); // If `datum` or `url` is undefined, don't render anything
                                    })
                                ) : (
                                        <Typography>No data available</Typography> // Fallback in case data is empty or undefined
                                    )}
                            </div>
                        </div>
                        <div style={{
                            width: "19vw",
                            textAlign:"center",
                            }}>
                            <div>
                                <Typography style={{
                                    color: "white",
                                    textAlign:"center"
                                }}>Username</Typography>
                            </div>
                            <div style={{
                                backgroundColor:"#cdfad6",
                                textAlign:"center",
                                overflowWrap: "break-word" /* Breaks lines at appropriate points */
                                }}>
                                {data && data.length > 0 ? (
                                    data.map((datum: Data) => {
                                        if (datum && datum.url) {
                                            if(datum._id == tempDatumId){
                                                return(
                                                    <div style={{
                                                        padding: "3px"
                                                    }}>
                                                        <TextField onChange={e=>setEditButtonUsername(e.target.value)} variant = "outlined" sx={{
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
                                                                border: "1px solid #15a13a",
                                                                height: 25,
                                                            }}} 
                                                        label="" defaultValue={editButtonUsername}/>
                                                    </div>
                                                )
                                            }
                                            else{
                                                return (
                                                    <div style={{
                                                        padding: "3px"
                                                    }}>
                                                        {datum.username}
                                                    </div>
                                                );
                                            }   
                                        }
                                        return (
                                            <div>
                                                none
                                                </div>
                                        );                                    
                                    })
                                ) : (
                                        <Typography>No data available</Typography> // Fallback in case data is empty or undefined
                                    )}
                            </div>
                        </div>

                        <div style={{
                            width: "19vw",
                            textAlign:"center"

                          }}>
                            <div>
                                <Typography style={{
                                    color: "white",
                                    textAlign:"center"
                                }}>Password</Typography>
                            </div>
                            <div style={{
                                backgroundColor:"#cdfad6",
                                textAlign:"center",
                                overflowWrap: "break-word" /* Breaks lines at appropriate points */
                                }}>
                                {data && data.length > 0 ? (
                                    data.map((datum: Data) => {
                                        if (datum && datum.password) {
                                            if(datum._id == tempDatumId){
                                                return(
                                                    <div style={{
                                                        padding: "3px"
                                                    }}>
                                                        <TextField onChange={e=>setEditButtonPassword(e.target.value)} variant = "outlined" sx={{
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
                                                                border: "1px solid #15a13a",
                                                                height: 25,
                                                            }}} 
                                                        label="" defaultValue={editButtonPassword}/>
                                                    </div>
                                                )
                                            }
                                            else{
                                                return (
                                                    <div style={{
                                                        padding: "3px"
                                                    }}>
                                                        {datum.password}
                                                    </div>
                                                );
                                            }
                                        }
                                        return (
                                            <div>
                                                none
                                                </div>
                                        );
                                    })
                                ) : (
                                        <Typography>No data available</Typography> // Fallback in case data is empty or undefined
                                    )}
                            </div>
                        </div>

                        <div style={{
                            width: "39vw",
                            textAlign:"center"
                            }}>
                            <div>
                                <Typography style={{
                                    color: "white",
                                    textAlign:"center"
                                }}>URL</Typography>
                            </div>
                            <div style={{
                                backgroundColor:"#cdfad6",
                                        
                                }}>
                                {data && data.length > 0 ? (
                                    data.map((datum: Data) => {
                                        if (datum && datum.url) {
                                            if(datum._id == tempDatumId){
                                                return(
                                                    <div style={{
                                                        padding: "3px",
                                                        textAlign:"center",
                                                        flexDirection: "row",
                                                        overflowWrap: "break-word", // Breaks lines at appropriate points 
                                                        display: "flex", 
                                                        justifyContent: "space-between", // Optional: adjust spacing between elements
                                                        alignItems: "center"           // Aligns elements vertically in the center
                                                    }}>
                                                        <div></div>
                                                            <div style={{
                                                                display: "flex"
                                                            }}>
                                                                <TextField onChange={e=>setEditButtonUrl(e.target.value)} variant = "outlined" sx={{
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
                                                                        border: "1px solid #15a13a",
                                                                        height: 25,
                                                                    }}} 
                                                                label="" defaultValue={editButtonUrl}/>
                                                                <DeleteButton id = {datum._id} state = {state} setState = {setState}/>     
                                                                <EditButton state = {state} setState = {setState} datumId = {datum._id} tempId = {tempDatumId} setTempId ={setTempDatumId} websiteName = {editButtonWebsiteName} setWebsiteName = {setEditButtonWebsiteName}
                                                                 username = {editButtonUsername} setUsername = {setEditButtonUsername} password = {editButtonPassword} setPassword = {setEditButtonPassword} url = {editButtonUrl} setUrl = {setEditButtonUrl}/>
                                                                </div>
                                                    </div>
                                                )
                                            }
                                            else{
                                                return (
                                                    <div style={{
                                                        textAlign:"center",
                                                        flexDirection: "row",
                                                        overflowWrap: "break-word", // Breaks lines at appropriate points 
                                                        display: "flex", 
                                                        justifyContent: "space-between", // Optional: adjust spacing between elements
                                                        alignItems: "center",           // Aligns elements vertically in the center
                                                        padding: "3px"
                                                        }}>
                                                            <div></div>
                                                            {datum.url}
                                                            <div style={{
                                                                display: "flex"
                                                            }}>
                                                            <DeleteButton id = {datum._id} state = {state} setState = {setState}/>     
                                                            <EditButton state = {state} setState = {setState} datumId = {datum._id} tempId = {tempDatumId} setTempId ={setTempDatumId} websiteName = {editButtonWebsiteName} setWebsiteName = {setEditButtonWebsiteName}
                                                                 username = {editButtonUsername} setUsername = {setEditButtonUsername} password = {editButtonPassword} setPassword = {setEditButtonPassword} url = {editButtonUrl} setUrl = {setEditButtonUrl}/>
                                                            </div>                     
                                                    </div>
                                                
                                                );
                                            }
                                        }
                                        return (
                                            <div>
                                                none
                                                </div>
                                        ); // If `datum` or `websiteName` is undefined, don't render anything
                                    })
                                ) : (
                                        <Typography>No data available</Typography> // Fallback in case data is empty or undefined
                                    )}
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default NonEditState;