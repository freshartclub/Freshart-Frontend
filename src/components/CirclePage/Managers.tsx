import { motion, AnimatePresence } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import Header from "../ui/Header";
import P from "../ui/P";
import { imageUrl } from "../utils/baseUrls";

interface ManagerProps {
  data?: {
    data?: {
      managers?: Array<{
        id: string;
        img?: string;
        artistName?: string;
        nickName?: string;
        artistSurname1?: string;
        artistSurname2?: string;
        address?: {
          country?: string;
        };
      }>;
    };
  };
  dark?: boolean;
}

const Managers = ({ data, dark = false }: ManagerProps) => {
  const name = (val: any) => {
    let fullName = val?.artistName || "";

    if (val?.nickName) fullName += ` "${val?.nickName}"`;
    if (val?.artistSurname1) fullName += " " + val?.artistSurname1;
    if (val?.artistSurname2) fullName += " " + val?.artistSurname2;

    return fullName.trim();
  };

  return (
    <section className={`mx-auto px-3 sm:px-6 my-8 ${dark ? "text-gray-100" : "text-gray-800"}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Header
          variant={{
            size: "2xl",
            theme: dark ? "light" : "dark",
            weight: "bold",
          }}
          className="mb-1"
        >
          Managers
        </Header>
        <P
          variant={{
            theme: dark ? "light" : "dark",
            weight: "normal",
          }}
          className="opacity-80"
        >
          {data?.data?.managers?.length || 0} team members
        </P>
      </motion.div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-6">
        <AnimatePresence>
          {data?.data?.managers?.length ? (
            data.data.managers.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`p-4 rounded-xl shadow transition-all duration-200 ${
                  dark ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-100"
                } border`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={`${imageUrl}/users/${item?.img}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                      alt="profile"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                        dark ? "border-gray-800 bg-green-500" : "border-white bg-green-500"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Header
                      variant={{
                        size: "lg",
                        theme: dark ? "light" : "dark",
                        weight: "semiBold",
                      }}
                      className="truncate"
                    >
                      {name(item)}
                    </Header>
                    <div className="flex items-center gap-2 mt-1">
                      <FaLocationDot size={14} className={dark ? "text-blue-400" : "text-blue-600"} />
                      <P
                        variant={{
                          theme: dark ? "light" : "dark",
                          weight: "normal",
                        }}
                        className="truncate opacity-80"
                      >
                        {item?.address?.country || "Unknown location"}
                      </P>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`col-span-full py-8 rounded-xl text-center ${dark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"} border`}
            >
              <P
                variant={{
                  size: "md",
                  theme: dark ? "light" : "dark",
                  weight: "medium",
                }}
                className="opacity-70"
              >
                No managers found
              </P>
              <P
                variant={{
                  theme: dark ? "light" : "dark",
                  weight: "normal",
                }}
                className="mt-1 opacity-50"
              >
                This circle currently has no managers
              </P>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Managers;
