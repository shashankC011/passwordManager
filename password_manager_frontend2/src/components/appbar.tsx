import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props{
    appbarRefresh: number,
    setAppbarRefresh: React.Dispatch<React.SetStateAction<number>>;
}
function Appbar(props: Props){
    let appbarRefresh = props.appbarRefresh;
    const setAppbarRefresh = props.setAppbarRefresh;
    const navigate = useNavigate();
    const[user,setUser]= useState(null); //user contains only username
    useEffect(()=>{
        const token = localStorage.getItem('Authorization');
        if(!token){
            setUser(null);
            return;
        }
            const fetchData = async()=>{
                const res = await fetch("http://localhost:5005/me",{
                    method:"GET",
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem(`Authorization`)}`
                    }
                })
                if(!res.ok){
                    const data = await res.json();
                    setUser(null);
                    return;
                }
                const data = await res.json();
                setUser(data.username);
            }
            fetchData();
    },[appbarRefresh])
    if(!user){
        return(
            <div style={{
                backgroundColor: "#202c3c",
                minHeight: "6vh",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Button onClick = {()=>{
                    localStorage.removeItem("Authorization")
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
                        navigate('/signup');
                        setAppbarRefresh(e=>e+1);
                    }}><Typography color={"#44bc74"} variant = "caption" >Sign up</Typography></Button>
    
                </div>
            </div>
        )
    }
    else{
        return(
            <div style={{
                backgroundColor: "#202c3c",
                minHeight: "6vh",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Button onClick = {()=>{
                    localStorage.removeItem("Authorization");
                    setAppbarRefresh(e=>e+1);
                    navigate('/signin');
                }}><Typography color={"white"} variant = "h5">PassOp</Typography></Button>
                <div style={{
                    display:"flex",
                   justifyContent: "space-evenly"
                }}>
                    {user}

                </div>
            </div>
        )
    }
}
export default Appbar;
