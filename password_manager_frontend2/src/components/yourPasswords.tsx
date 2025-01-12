import { Typography,Button } from "@mui/material"
import { Number } from "mongoose";
import { useEffect,useState } from "react"
import {Trash} from "lucide-react"
import DeleteButton from "./deleteButton";
import EditButton from "./EditButton";
//import EditState from "./EditState";
import NonEditState from "./NonEditState";
//WRITE LOGIC TO FILL THE SFDARAW SPACES AND MAKE THE APPBAR DYNAMIC AND COMPLETE SIGNIN PAGE 
interface Data{
    url :String,
    username :String,
    password: String,
    websiteName ?: String,
    _id: String
}
interface Props{
    state:number,
    setState: React.Dispatch<React.SetStateAction<number>>;
}
interface User{
    _id: string,
    username: string,
    password: string
}
function YourPasswords(props:Props){
    const state = props.state;
    const setState = props.setState;
    const [data,setData] = useState([]);
    const [user,setUser] = useState(null);
    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await fetch("http://localhost:5005/me",{
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem(`Authorization`)}`
                }
            })
            if(!res.ok){
                throw new Error("Could not fetch in yourPasswords.tsx data")
            }
            const resJson = await res.json();
            setUser(resJson.user);
        }
        fetchUser();    
    },[])
    useEffect(()=>{ 
        if(user){
            const fetchData = async()=>{
                //@ts-ignore
                const res = await fetch(`http://localhost:5005/users/${user._id}`,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem(`Authorization`)}`
                    }
                })
                if(!res.ok){
                    throw new Error("Could not fetch yourPasswords.tsx data");
                }
                const resJson = await res.json();
                setData(resJson.data);
            }
            fetchData();
        }
    },[user,state])       
        return(
            <div>
                <NonEditState data ={data} state={state} setState={setState} />
            </div>
        )
    // if(!renderEdit){
    //     return(
    //         <div>
    //             <NonEditState data ={data} state={state} setState={setState} renderEdit= {renderEdit} setRenderEdit ={setRenderEdit}/>
    //         </div>
    //     )
    // }
    // else{
    //     return(
    //         <div>
    //             <EditState data ={data} state={state} setState={setState} renderEdit= {renderEdit} setRenderEdit ={setRenderEdit}/>
    //         </div>
    //     )
    // }
}
export default YourPasswords