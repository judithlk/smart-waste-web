import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function BinManagement() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[1.6rem] font-semibold">Wastebin Management</h1>
      </div>
      <div className="flex justify-end">
        <Button className="bg-main-green text-white font-semibold rounded-sm">
          Add New Bin
        </Button>
      </div>
      <div className="bg-white p-3 rounded-md">
        <Table>
          
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Bin ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Placement Date</TableHead>
              <TableHead>Last Empty</TableHead>
              <TableHead>Recent Fill Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">BIN001</TableCell>
              <TableCell>TEAL Studio. -6.332, 0.8423</TableCell>
              <TableCell>06-10-2023</TableCell>
              <TableCell>06-05-2025</TableCell>
              <TableCell>75%</TableCell>
              <TableCell>Active</TableCell>
              <TableCell className="text-right">
                <div className="flex space-x-3 justify-end">
                  <h2 className="text-blue-900 underline hover:text-gray-500 cursor-pointer">View</h2>
                  <h2 className="text-green-700 underline hover:text-gray-500 cursor-pointer">Schedule Empty</h2>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BIN002</TableCell>
              <TableCell>LA's Office. -10.332, 5.8423</TableCell>
              <TableCell>06-10-2023</TableCell>
              <TableCell>06-05-2025</TableCell>
              <TableCell>75%</TableCell>
              <TableCell>Active</TableCell>
              <TableCell className="text-right">
                <div className="flex space-x-3 justify-end">
                  <h2 className="text-blue-900 underline hover:text-gray-500 cursor-pointer">View</h2>
                  <h2 className="text-green-700 underline hover:text-gray-500 cursor-pointer">Schedule Empty</h2>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
