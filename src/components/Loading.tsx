import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ClipLoader
        size={70}
        color="#96D127"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
