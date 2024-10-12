import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Appbar(){
    const navigate = useNavigate();
    return(
        <div style={{
            backgroundColor: "#202c3c",
            minHeight: "6vh",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <Button onClick = {()=>{
                navigate('/');
            }}><Typography color={"white"} variant = "h5">PassOp</Typography></Button>
            <div style={{
                display:"flex",
               justifyContent: "space-evenly"
            }}>
                <Button onClick={()=>{
                    navigate('/home')
                }}><Typography color={"#44bc74"} variant = "caption" >Home</Typography></Button>
                <Button onClick={()=>{
                    navigate('/signin')
                }}><Typography color={"#44bc74"} variant = "caption">Sign In</Typography></Button>
                <Button onClick={()=>{
                    navigate('/signup')
                }}><Typography color={"#44bc74"} variant = "caption" >Sign up</Typography></Button>

            </div>
        </div>
    )
}
export default Appbar;
