import { Typography } from "@mui/material";
import DeleteButton from "./deleteButton";
import EditButton from "./EditButton";
interface Data{
    url :String,
    username :String,
    password: String,
    websiteName ?: String,
    _id: String
}
interface Props{
    data: Data[],
    state:number,
    setState: React.Dispatch<React.SetStateAction<number>>,
    renderEdit:boolean,
    setRenderEdit: React.Dispatch<React.SetStateAction<boolean>>
}
function NonEditState(props:Props){
    const data = props.data;
    const setState = props.setState;
    const setRenderEdit = props.setRenderEdit;
    const state = props.state;
    const renderEdit = props.renderEdit
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
                                            return (
                                                <div style={{
                                                    padding: "3px"
                                                }}>
                                                    {datum.websiteName}
                                                </div>
                                            );
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
                                            return (
                                                <div style={{
                                                    padding: "3px"
                                                }}>
                                                    {datum.username}
                                                </div>
                                            );
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
                                            return (
                                                <div style={{
                                                    padding: "3px"
                                                }}>
                                                    {datum.password}
                                                </div>
                                            );
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
                                                        <EditButton renderEdit={renderEdit} setRenderEdit={setRenderEdit}/>
                                                        </div>                     
                                                </div>
                                            
                                            );
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