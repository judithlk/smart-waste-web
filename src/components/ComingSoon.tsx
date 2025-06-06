import { MdOutlineConstruction } from "react-icons/md";

export default function ComingSoon() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex space-x-3 items-center">
        <h1 className="text-3xl text-gray-700">Work in progress; coming soon.</h1>
        <MdOutlineConstruction className="size-10 text-gray-700 animate-pulse"  />
      </div>
    </div>
  );
}