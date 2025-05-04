export default function InfoBar() {
    return (
        <div className="grid grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-md">
            <h2 className="font-semibold">Active Bins</h2>
            <h3 className="text-2xl text-gray-700">300</h3>
        </div>
        <div className="p-5 bg-white rounded-md">
            <h2 className="font-semibold">Pending Disposal</h2>
            <h3 className="text-2xl text-gray-700">120</h3>
        </div>
        <div className="p-5 bg-white rounded-md">
            <h2 className="font-semibold">Registered Drivers</h2>
            <h3 className="text-2xl text-gray-700">10</h3>
        </div>
        <div className="p-5 bg-white rounded-md">
            <h2 className="font-semibold">Total Trips Made</h2>
            <h3 className="text-2xl text-gray-700">5,000</h3>
        </div>
      </div>
    )
}