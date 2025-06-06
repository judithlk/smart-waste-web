import InfoBar from "@/components/InfoBar";
import ComingSoon from "@/components/ComingSoon";

export default function Dashboard() {
  return (
    <div className="space-y-4 h-full">
      <div>
        <h1 className="text-[1.6rem] font-semibold">Dashboard</h1>
      </div>
    <InfoBar />

    <div className="h-[50%]">
      <ComingSoon />
    </div>
    </div>
  );
}
