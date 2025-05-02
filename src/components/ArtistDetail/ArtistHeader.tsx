import { Link } from "react-router-dom";

import { imageUrl } from "../utils/baseUrls";
import { useAppSelector } from "../../store/typedReduxHooks";

const ArtistHeader = ({ data, dark }) => {
  const name = (val) => {
    let fullName = val?.artistName || "";
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;
    return fullName.trim();
  };

  return (
    <div className="lg:w-[90%] w-full mx-auto">
      <nav className="flex items-center p-2 mt-4 mb-6">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className={`inline-flex items-center text-sm font-medium ${
                dark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                to="/all_artist"
                className={`ml-1 text-sm font-medium ${dark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"} md:ml-2`}
              >
                Artists
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>

              <span
                className={`ml-1 overflow-x-auto whitespace-nowrap w-[80%] scrollbar text-sm font-medium ${
                  dark ? "text-gray-400" : "text-gray-500"
                } md:ml-2`}
              >
                {name(data)}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="relative w-full py-6 max-w-3xl mx-auto">
        {data?.profile?.mainVideo ? (
          <video src={`${imageUrl}/videos/${data?.profile?.mainVideo}`} className="w-full h-[60vh] rounded-lg shadow-lg" controls />
        ) : (
          <img src={`${imageUrl}/users/${data?.profile?.mainImage}`} alt="Main Media" className="w-full h-[60vh] object-cover rounded-lg shadow-lg" />
        )}
      </div>
    </div>
  );
};

export default ArtistHeader;