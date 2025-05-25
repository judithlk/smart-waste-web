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

export default function History() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[1.6rem] font-semibold">Disposal History</h1>
      </div>

      <div className="bg-white p-3 rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Bin ID</TableHead>
              <TableHead className="">Scheduler</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Personnel ID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">BIN001</TableCell>
              <TableCell>judith</TableCell>
              <TableCell>TEAL Studio. -6.332, 0.8423</TableCell>
              <TableCell>06-10-2023</TableCell>
              <TableCell>PERSON050</TableCell>
              <TableCell>Completed</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BIN003</TableCell>
              <TableCell>judith</TableCell>
              <TableCell>TEAL Studio. -6.332, 0.8423</TableCell>
              <TableCell>06-10-2023</TableCell>
              <TableCell>PERSON001</TableCell>
              <TableCell>Cancelled</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
