//FIX DYNAMIC DELETION.(STATE management of state variable(maybe global varibales(atoms)))
import {Button } from "@mui/material"
import {Trash} from "lucide-react"
interface Props{
    id: String,
    state:number,
    setState: React.Dispatch<React.SetStateAction<number>>;
}
const DeleteButton: React.FC<Props> = (props: Props): JSX.Element => {
    const id = props.id;
    let state = props.state;
    const setState = props.setState;
        return (
            <div>
                <Button style={{
                    height: "16px",
                    color: "black"
                }}
                onClick={async()=>{
                    const res = await fetch(`http://localhost:5005/${id}`,{
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${localStorage.getItem(`Authorization`)}`
                        }
                    })
                    if(!res.ok){
                        throw new Error("Error deleting")
                    }
                    const data = await res.json();
                    setState(s=>s+1); //IMPORTANT. learnings from this written below as comments
                }}><Trash size ={16}/></Button>               
            </div>
        )
      
}

export default DeleteButton;


//1. NEVER update a state variable directly as react uses the prev value of a state varible and compares it with the new value and makes the dom rerender accordingly, however if u mutate the state variable
//  directly this fails, if not in all cases it will in cases where multiple state updates happen quickly. SO BEST practice is to use function(annonymous function for shorter syntax) inside setState as 
//  they ALWAYS update latest value no matter how many state variable changes are happening simuntaneously(this happens because setstate function's first parameter is always the current state of the varibale )
//  so never do setState(++state) or simply ++state, as u mutate the state variable directly which goes against react's immutateability principle
//  according to which state variables should never be changed directly

//also this: setState(s=>s+1); is same as 
// setState(function increase(s){
//     return s +1;
// })
//only difference being first case uses anonymous function 


//2. setState functions BY DEFAULT in react put the first argument as the current state of the variable. hence setState(s=>s+1) correctly by default passes the current value of the varible in s by default

//3. in js(unlike java) a method call can have multiple parameters which are not even defined in the method initialization, they would just be set as undefined or vice versa(js way of method overloading)
//for ex:
// function print(a,b){
//     console.log(a);
//     console.log(b);
// }
// print(2);
//output: 2 undefined(a is 2 and b is undefined as it is not passed)
//precaution: runs for js but not for ts

//even this works:
// function print(a,b){
//     console.log(a);
//     console.log(b);
// }
// print(2,3,4);
//output: 2 3 
//the third input is discarded
//precaution: also only works for js

//chatgpt logs for this archived, on date 26 OCT 2024

