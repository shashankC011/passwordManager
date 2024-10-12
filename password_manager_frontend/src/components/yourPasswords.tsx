import { Typography } from "@mui/material"
//WRITE LOGIC TO FILL THE SFDARAW SPACES AND MAKE THE APPBAR DYNAMIC AND COMPLETE SIGNIN PAGE 

function YourPasswords(){
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
                            width: "50vw",
                            display: "flex",
                            flexDirection:"column",
                            }}>
                            <div>
                                <Typography style={{
                                    color: "white",
                                    textAlign:"center"
                                }}>Site</Typography>
                            </div>
                            <div style={{
                                backgroundColor:"#cdfad6"
                            }}>
                                fdafad   
                            </div>
                        </div>

                        <div style={{
                            width: "22.5vw",
                            textAlign:"center",
                            }}>
                            <div>
                                <Typography style={{
                                    color: "white",
                                    textAlign:"center"
                                }}>Username</Typography>
                            </div>
                            <div style={{
                                backgroundColor:"#cdfad6"
                            }}>
                                sfadfa
                            </div>
                        </div>

                        <div style={{
                            width: "12.5vw",
                            textAlign:"center"

                          }}>
                            <div>
                                <Typography style={{
                                    color: "white",
                                    textAlign:"center"
                                }}>Password</Typography>
                            </div>
                            <div style={{
                                backgroundColor: "#cdfad6"
                            }}>
                                sdfad
                            </div>
                        </div>

                        <div style={{
                            width: "12.5vw",
                            textAlign:"center"
                            }}>
                            <div>
                                <Typography style={{
                                    color: "white",
                                    textAlign:"center"
                                }}>Actions</Typography>
                            </div>
                            <div style={{
                                backgroundColor: "#cdfad6"
                            }}>
                                fadsfadsf
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default YourPasswords