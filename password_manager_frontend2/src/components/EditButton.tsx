import {Pencil} from "lucide-react"
import {Button } from "@mui/material"
import { render } from "@testing-library/react";
//GIVE EDIT BUTTON FUNCTIONALITY
interface Props{
    renderEdit:boolean,
    setRenderEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
function EditButton(props:Props){
    let renderEdit = props.renderEdit;
    const setRenderEdit = props.setRenderEdit;
        return(
            <div>
    
                <Button style={{
                    color: "black",
                    height:"16px"
                }}
                onClick={()=>{
                    setRenderEdit(true);
                }}><Pencil size={16} /></Button>
            </div>
        )
}

export default EditButton;