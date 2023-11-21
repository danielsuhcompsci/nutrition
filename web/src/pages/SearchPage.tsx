import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { BiBarcodeReader } from "react-icons/bi";
import { IconContext } from "react-icons";

function SearchPage() {
  return (
    <div className="flex justify-center text-white w-screen h-screen pt-10">
      <div className="flex items-center h-10 w:3/4 md:w-2/3 md:space-x-1">
        <SearchBar />
        <Link className="text-white hover:text-white" to={"/scanner"}>
          <IconContext.Provider value={{ size: "30" }}>
            <BiBarcodeReader />
          </IconContext.Provider>
        </Link>
        <div className="grid grid-cols-3">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
