// const socialLinks = [
//   {
//     site: "Facebook",
//     icon: "https://cdn-icons-png.flaticon.com/128/4922/4922978.png",
//     url: "https://www.facebook.com/caitlyn.kerluke",
//   },
//   {
//     site: "Instagram",
//     icon: "https://cdn-icons-png.flaticon.com/128/174/174855.png",
//     url: "https://www.instagram.com/caitlyn.kerluke",
//   },
//   {
//     site: "LinkedIn",
//     icon: "https://cdn-icons-png.flaticon.com/128/4926/4926502.png",
//     url: "https://www.linkedin.com/caitlyn.kerluke",
//   },
//   {
//     site: "X",
//     icon: "https://cdn-icons-png.flaticon.com/128/5968/5968958.png",
//     url: "https://www.twitter.com/caitlyn.kerluke",
//   },
// ];

// const SocialLinks = () => {
//   return (
//     <div className="flex flex-col space-y-4 p-4 md:p-6 rounded-lg shadow-lg mx-auto">
//       {socialLinks.map((link, index) => (
//         <div
//           key={index}
//           className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200"
//         >
//           <img
//             src={link.icon}
//             alt={`${link.site} icon`}
//             className="w-8 h-8 md:w-6 md:h-6"
//           />
//           <a
//             href={link.url}
//             className="text-[#1C252E] font-semibold text-sm md:text-base"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             {link.url}
//           </a>
//         </div>
//       ))}
//       <div className="mt-3 flex justify-end">
//         <button className="bg-[#102030] text-white px-4 py-2 rounded font-semibold hover:bg-[#0d1a26] transition duration-300">
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SocialLinks;
