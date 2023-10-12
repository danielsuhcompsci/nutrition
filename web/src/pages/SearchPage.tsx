import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { BiBarcodeReader } from "react-icons/bi";
import { IconContext } from "react-icons";

function SearchPage() {
  return (
    <div className="flex justify-center text-white w-screen h-screen pt-10">
      <div
        className="flex space-x-1 items-center h-10 w-2/3
      "
      >
        <SearchBar />
        <Link className="text-white hover:text-white" to={"/scanner"}>
          <IconContext.Provider value={{ size: "30" }}>
            <BiBarcodeReader />
          </IconContext.Provider>
        </Link>
      </div>
    </div>
  );
}

export default SearchPage;
