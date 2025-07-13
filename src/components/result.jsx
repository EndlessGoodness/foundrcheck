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
    // Define the order of the pages
    const levels = ["market", "competitors", "trends", "technology", "swot"];
    const currentIndex = levels.indexOf(level);

    // Determine back and next links
    let backLink = "/";
    let nextLink = "/";
    if (currentIndex === -1) {
        // If no level, assume start page, next is first level
        nextLink = `/result/market`;
    } else {
        backLink = currentIndex === 0 ? "/" : `/result/${levels[currentIndex - 1]}`;
        nextLink = currentIndex === levels.length - 1 ? "/" : `/result/${levels[currentIndex + 1]}`;
    }

    return (
        <>
            <Headerpart />
            {level === "market" || level=== "/" ? (
                <Market />
            ) : level === "technology" ? (
                <Technology />
            ) : level === "competitors" ? (
                <Competitors />
            ) : level === "swot" ? (
                <Swot />
            ) : level === "trends" ? (
                <Trends />
            ) : <> <p> Got Your Results</p> <br></br>
                    <p>Click Next</p>
                </>}
            <Link to={backLink}><button>{backmess}</button></Link>
            {level === "swot" ? (
                <Link to="/">
                    <button>Home</button>
                </Link>
            ) : (
                <Link to={nextLink}><button>{nextmess}</button></Link>
            )}
        </>
    );
}

export default Result;