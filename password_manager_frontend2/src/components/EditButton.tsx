import {Pencil} from "lucide-react"
import {Button } from "@mui/material"
import { render } from "@testing-library/react";
import { ReactEventHandler, useCallback, useEffect, useState } from "react";
//FIX EDIT BUTTON
interface Props{
    datumId: string,
    websiteName: string,
    state : number,
    setState: React.Dispatch<React.SetStateAction<number>>;
    setWebsiteName: React.Dispatch<React.SetStateAction<string>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    username: string,
    password: string,
    url: string,
    tempId:string,
    setTempId: React.Dispatch<React.SetStateAction<string>>;
}
function EditButton(props:Props){
    const id = props.datumId;
    const websiteName = props.websiteName;
    const setWebsiteName = props.setWebsiteName;
    const setUsername = props.setUsername;
    const setPassword = props.setPassword;
    const setUrl = props.setUrl;
    const username = props.username;
    const password = props.password;
    const url = props.url;
    const tempId = props.tempId;
    const setTempId = props.setTempId;
    const state = props.state;
    const setState = props.setState;
    const [user,setUser] = useState(null);

    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await fetch(`http://localhost:5005/me`,{
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem(`Authorization`)}`
                }
            })
            if(!res.ok){
                throw new Error("Error connecting to localhost in EditBUtton.tsx")
            }
            const resJson = await res.json();
            setUser(resJson.user);
        } 
        fetchUser();
    },[])

    const handleEnterPress = useCallback(async(e:KeyboardEvent)=>{
        if(e.key === "Enter" && tempId === id){
            const res = await fetch(`http://localhost:5005/data/${id}`,{
                method: "PUT", 
                headers:{
                   'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem(`Authorization`)}`
                },
                body:JSON.stringify({
                    websiteName: websiteName,
                    username: username,
                    password: password, 
                    url: url,
                    user: user
                })
            })
            if(!res.ok){
                throw new Error("Error putting to localhost");
            }
            setState(e=>e+1);
            setTempId("");
    }},[tempId,websiteName,username,password,url])
    
    useEffect(()=>{ 
        document.addEventListener("keydown",handleEnterPress)
        return ()=>{
            document.removeEventListener("keydown",handleEnterPress)
        }
    },[handleEnterPress])

        return(
            <div>
                <Button style={{
                    color: "black",
                    height:"16px"
                }}
                onClick = {async()=>{
                    if(tempId == ""){
                        const res = await fetch(`http://localhost:5005/data/${id}`,{
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `${localStorage.getItem(`Authorization`)}`
                            }
                        })
                        if(!res.ok){
                            throw new Error("Error getting from localhost");
                        }
                        const data = await res.json();    
                        setUsername(data.data.username);
                        setPassword(data.data.password);
                        setUrl(data.data.url);
                        setWebsiteName(data.data.websiteName);
                        setTempId(id);
                    }else{
                        const res = await fetch(`http://localhost:5005/data/${id}`,{
                            method: "PUT", 
                            headers:{
                               'Content-Type': 'application/json',
                                'Authorization': `${localStorage.getItem(`Authorization`)}`
                            },
                            body:JSON.stringify({
                                websiteName: websiteName,
                                username: username,
                                password: password, 
                                url: url
                            })
                        })
                        if(!res.ok){
                            throw new Error("Error putting to localhost");
                        }
                        setState(e=>e+1);
                        setTempId("");
                    }
                }}>
                    <Pencil size={16} /></Button>
            </div>
        )
    }

export default EditButton;