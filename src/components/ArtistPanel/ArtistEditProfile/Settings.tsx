import React from 'react'
import ArtistTabs from './ArtistTabs'
import Header from '../../ui/Header'
import dot from "./assets/dot.png";



const Settings = () => {
  return (
<div className="bg-white p-10 ">
      <Header
        variant={{ size: "2xl", theme: "dark", weight: "semiBold" }}
        className="mt-6"
      >
        Artist Setting
      </Header>

      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center mx-2 text-sm font-medium text-gray-700 "
            >
              Artist
            </a>
          </li>
          <img src={dot} alt="dot" />
          <li>
            <div className="flex items-center">
              <a href="#" className=" text-sm mx-2 font-medium text-[#919EAB]">
                Setting
              </a>
            </div>
          </li>
        </ol>
      </nav>

      <ArtistTabs/>
    </div>
  )
}

export default Settings