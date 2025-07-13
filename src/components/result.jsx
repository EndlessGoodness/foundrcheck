import { Link } from "react-router-dom";

function Result(){
    const backmess="<-Back";
    const nextmess="Next->";
    return (
        <>
            <Link><button>{backmess}</button></Link>
            <Link><button>{nextmess}</button></Link>
        </>
    )
}
export default Result;