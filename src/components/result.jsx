import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Headerpart from "./header";
import Market from "../analysis/market";
import Competitors from "../analysis/competitors";
import Swot from "../analysis/swot";
import Technology from "../analysis/technology";
import Trends from "../analysis/trends";

function Result() {
    const backmess = "<-Back";
    const nextmess = "Next->";
    const { level } = useParams();
    return (
        <>
            <Headerpart />
            {level === "market" ? (
                <Market />
            ) : level === "technology" ? (
                <Technology />
            ) : level === "competitors" ? (
                <Competitors />
            ) : level === "swot" ? (
                <Swot />
            ) : level === undefined || level === "" ? (
                <Trends />
            ) : null}
            <Link to="#"><button>{backmess}</button></Link>
            <Link to="#"><button>{nextmess}</button></Link>
        </>
    );
}

export default Result;