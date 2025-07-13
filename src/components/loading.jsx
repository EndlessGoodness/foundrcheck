import { Link } from "react-router-dom";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
function Loading(){
    const {message}=useContext(MessageContext);
    const backmess="<-Back";
    return (
        <>
            <div>
                <Link to={"/"}><button>{backmess}</button></Link>
                <h3>Analyzing your idea...</h3>
                <br></br>
                <p> We are evaluating your idea</p>
                <br></br>
                <p>{message}</p>
            </div>
        </>
    )
};
export default Loading;