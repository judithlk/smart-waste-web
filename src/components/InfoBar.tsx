import { MdOutlineDoneAll } from "react-icons/md";
import { BiBroadcast } from "react-icons/bi";
import { FaExclamation } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

export default function InfoBar() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-5 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Active Bins</h2>
          <BiBroadcast className="size-8 text-[#4CBB17]" />
        </div>
        <h3 className="text-2xl text-gray-700">300</h3>
      </div>
      <div className="p-5 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Pending Disposals</h2>
          <FaExclamation className="size-7 text-[#FF0000]" />
        </div>
        <h3 className="text-2xl text-gray-700">120</h3>
      </div>
      <div className="p-5 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Personnel Count</h2>
          <FaPerson className="size-8 text-[#00B9E8]" />
        </div>
        <h3 className="text-2xl text-gray-700">10</h3>
      </div>
      <div className="p-5 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Completed Trips</h2>
          <MdOutlineDoneAll className="size-8 text-main-green" />
        </div>
        <h3 className="text-2xl text-gray-700">5,000</h3>
      </div>
    </div>
  );
}
