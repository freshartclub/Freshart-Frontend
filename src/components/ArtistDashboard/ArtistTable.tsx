// import profile_img1 from "./assets/img.png";
// import profile_img2 from "./assets/Img_Avatar.2.png";
// import profile_img3 from "./assets/Img_Avatar.4.png";
// import profile_img4 from "./assets/img1.png";
// import profile_img5 from "./assets/img2.png";

// const table_data = [
//   {
//     profile_image: profile_img1,
//     name: "Jayvion Simon",
//     category: "Painting",
//     price: "$10",
//   },
//   {
//     profile_image: profile_img2,
//     name: "Jayvion Simon",
//     category: "Painting",
//     price: "$10",
//   },
//   {
//     profile_image: profile_img3,
//     name: "Jayvion Simon",
//     category: "Painting",
//     price: "$10",
//   },
//   {
//     profile_image: profile_img4,
//     name: "Jayvion Simon",
//     category: "Painting",
//     price: "$10",
//   },
//   {
//     profile_image: profile_img5,
//     name: "Jayvion Simon",
//     category: "Painting",
//     price: "$10",
//   },
//   {
//     profile_image: profile_img1,
//     name: "Jayvion Simon",
//     category: "Painting",
//     price: "$10",
//   },
//   {
//     profile_image: profile_img2,
//     name: "Jayvion Simon",
//     category: "Painting",
//     price: "$10",
//   },
// ];

// const table_head = [
//   {
//     head: "Profile",
//   },
//   {
//     head: "Artwork Name",
//   },
//   {
//     head: "Category",
//   },
//   {
//     head: "Profile",
//   },
// ];

// const ArtistTable = () => {
//   return (
//     <div className="container mx-auto sm:px-6 px-3">
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 {table_head.map((item, index) => (
//                   <th scope="col" className="px-6 py-3" key={index}>
//                     {item.head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {table_data.map((tableData, index) => (
//                 <tr className="text-xs text-gray-700 uppercase " key={index}>
//                   <div className="flex items-center">
//                     <th
//                       scope="row"
//                       className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
//                     >
//                       <img
//                         className="w-10 h-10 rounded-full"
//                         src={tableData.profile_image}
//                         alt="Jese image"
//                       />
//                     </th>
//                     <div className="ps-3">
//                       <div className="text-base font-semibold">
//                         {tableData.name}
//                       </div>
//                     </div>
//                     <div className="font-normal text-gray-500">
//                       {tableData.category}
//                     </div>
//                   </div>
//                   <td className="px-6 py-4">{tableData.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div
//             id="editUserModal"
//             tabIndex="-1"
//             aria-hidden="true"
//             className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
//           >
//             <div className="relative w-full max-w-2xl max-h-full">
//               <form className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//                 <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                     Edit user
//                   </h3>
//                   <button
//                     type="button"
//                     className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                     data-modal-hide="editUserModal"
//                   >
//                     <svg
//                       className="w-3 h-3"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 14 14"
//                     >
//                       <path
//                         stroke="currentColor"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                       />
//                     </svg>
//                     <span className="sr-only">Close modal</span>
//                   </button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   <div className="grid grid-cols-6 gap-6">
//                     <div className="col-span-6 sm:col-span-3">
//                       <label
//                         htmlFor="first-name"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         First Name
//                       </label>
//                       <input
//                         type="text"
//                         name="first-name"
//                         id="first-name"
//                         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Bonnie"
//                         required
//                       />
//                     </div>
//                     <div className="col-span-6 sm:col-span-3">
//                       <label
//                         htmlFor="last-name"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Last Name
//                       </label>
//                       <input
//                         type="text"
//                         name="last-name"
//                         id="last-name"
//                         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Green"
//                         required
//                       />
//                     </div>
//                     <div className="col-span-6 sm:col-span-3">
//                       <label
//                         htmlFor="email"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         id="email"
//                         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="example@company.com"
//                         required
//                       />
//                     </div>
//                     <div className="col-span-6 sm:col-span-3">
//                       <label
//                         htmlFor="phone-number"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Phone Number
//                       </label>
//                       <input
//                         type="number"
//                         name="phone-number"
//                         id="phone-number"
//                         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="e.g. +(12)3456 789"
//                         required
//                       />
//                     </div>
//                     <div className="col-span-6 sm:col-span-3">
//                       <label
//                         htmlFor="department"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Department
//                       </label>
//                       <input
//                         type="text"
//                         name="department"
//                         id="department"
//                         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Development"
//                         required
//                       />
//                     </div>
//                     <div className="col-span-6 sm:col-span-3">
//                       <label
//                         htmlFor="company"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Company
//                       </label>
//                       <input
//                         type="number"
//                         name="company"
//                         id="company"
//                         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="123456"
//                         required
//                       />
//                     </div>
//                     <div className="col-span-6 sm:col-span-3">
//                       <label
//                         htmlFor="current-password"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Current Password
//                       </label>
//                       <input
//                         type="password"
//                         name="current-password"
//                         id="current-password"
//                         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="••••••••"
//                         required
//                       />
//                     </div>
//                     <div className="col-span-6 sm:col-span-3">
//                       <label
//                         htmlFor="new-password"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         New Password
//                       </label>
//                       <input
//                         type="password"
//                         name="new-password"
//                         id="new-password"
//                         className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="••••••••"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
//                   <button
//                     type="submit"
//                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   >
//                     Save all
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtistTable;

import profile_img1 from "./assets/img.png";
import profile_img2 from "./assets/Img_Avatar.2.png";
import profile_img3 from "./assets/Img_Avatar.4.png";
import profile_img4 from "./assets/img1.png";
import profile_img5 from "./assets/img2.png";

const table_data = [
  {
    profile_image: profile_img1,
    name: "Jayvion Simon",
    category: "Painting",
    price: "$10",
  },
  {
    profile_image: profile_img2,
    name: "Jayvion Simon",
    category: "Painting",
    price: "$10",
  },
  {
    profile_image: profile_img3,
    name: "Jayvion Simon",
    category: "Painting",
    price: "$10",
  },
  {
    profile_image: profile_img4,
    name: "Jayvion Simon",
    category: "Painting",
    price: "$10",
  },
  {
    profile_image: profile_img5,
    name: "Jayvion Simon",
    category: "Painting",
    price: "$10",
  },
  {
    profile_image: profile_img1,
    name: "Jayvion Simon",
    category: "Painting",
    price: "$10",
  },
  {
    profile_image: profile_img2,
    name: "Jayvion Simon",
    category: "Painting",
    price: "$10",
  },
];

const table_head = [
  { head: "Profile" },
  { head: "Artwork Name" },
  { head: "Category" },
  { head: "Price" },
];

const ArtistTable = () => {
  return (
    <div className="container mx-auto sm:px-6 px-3">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {table_head.map((item, index) => (
                <th scope="col" className="px-6 py-3" key={index}>
                  {item.head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table_data.map((tableData, index) => (
              <tr className="bg-white dark:bg-gray-800" key={index}>
                <td className="px-6 py-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={tableData.profile_image}
                    alt="Profile"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {tableData.name}
                </td>
                <td className="px-6 py-4">{tableData.category}</td>
                <td className="px-6 py-4">{tableData.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtistTable;
