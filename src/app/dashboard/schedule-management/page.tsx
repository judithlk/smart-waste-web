"use client";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IoMdClose } from "react-icons/io";

const formSchema = z.object({
  bins: z.array(z.string()).min(2, {
    message: "Select at least two bins",
  }),
  personnelNo: z.string().length(3, {
    message: "Invalid personnel number",
  }),
  date: z.date().min(new Date(), { message: "Date must be in the future" }),
});

export default function Schedules() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bins: [],
      personnelNo: "",
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[1.6rem] font-semibold">Schedule Waste Disposal</h1>
      </div>
      <div className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-main-green text-white font-semibold rounded-sm">
              Create Schedule
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex justify-between">
                <AlertDialogTitle>Add New Wastebin Details</AlertDialogTitle>
                <AlertDialogCancel className="border-none bg-white text-gray-500 hover:text-gray-800">
                  <IoMdClose />
                </AlertDialogCancel>
              </div>

              <AlertDialogDescription>
                Fill in the details of the new personnel to add them to the
                database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div>
                    <FormField
                      control={form.control}
                      name="bins"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Bins</FormLabel>
                          <FormControl>
                            <div className="flex flex-col gap-2 border p-2 rounded-md max-h-[200px] overflow-y-auto">
                              {["BIN001", "BIN002", "BIN003", "BIN004"].map(
                                (binId) => (
                                  <label
                                    key={binId}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      value={binId}
                                      checked={
                                        Array.isArray(field.value) &&
                                        field.value.includes(binId)
                                      }
                                      onChange={(e) => {
                                        const checked = e.target.checked;
                                        const value = e.target.value;

                                        let currentValues = Array.isArray(
                                          field.value
                                        )
                                          ? field.value
                                          : [];

                                        if (checked) {
                                          field.onChange([
                                            ...currentValues,
                                            value,
                                          ]);
                                        } else {
                                          field.onChange(
                                            currentValues.filter(
                                              (v) => v !== value
                                            )
                                          );
                                        }
                                      }}
                                    />
                                    <span>{binId}</span>
                                  </label>
                                )
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormField
                        control={form.control}
                        name="personnelNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Assign Personnel</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-[200px]">
                                  <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="001">001</SelectItem>
                                  <SelectItem value="002">002</SelectItem>
                                  <SelectItem value="003">003</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Empty Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                value={
                                  field.value
                                    ? new Date(field.value)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                                onChange={(e) =>
                                  field.onChange(new Date(e.target.value))
                                }
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-[100%]">
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="bg-white p-3 rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Bin ID</TableHead>
              <TableHead className="">Creation Date</TableHead>
              <TableHead className="">Scheduler</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Personnel ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">BIN001</TableCell>
              <TableCell>06-10-2023</TableCell>
              <TableCell>judith</TableCell>
              <TableCell>TEAL Studio. -6.332, 0.8423</TableCell>
              <TableCell>06-10-2023</TableCell>
              <TableCell>PERSON050</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell className="text-right">
                <div className="flex space-x-3 justify-end">
                  <h2 className="text-green-900 underline hover:text-gray-500 cursor-pointer">
                    View
                  </h2>
                  <h2 className="text-blue-900 underline hover:text-gray-500 cursor-pointer">
                    Edit
                  </h2>
                  <h2 className="text-red-700 underline hover:text-gray-500 cursor-pointer">
                    Delete
                  </h2>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BIN002</TableCell>
              <TableCell>06-10-2023</TableCell>
              <TableCell>judith</TableCell>
              <TableCell>TEAL Studio. -6.332, 0.8423</TableCell>
              <TableCell>06-10-2023</TableCell>
              <TableCell>PERSON-050</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell className="text-right">
                <div className="flex space-x-3 justify-end">
                  <h2 className="text-green-900 underline hover:text-gray-500 cursor-pointer">
                    View
                  </h2>
                  <h2 className="text-blue-900 underline hover:text-gray-500 cursor-pointer">
                    Edit
                  </h2>
                  <h2 className="text-red-700 underline hover:text-gray-500 cursor-pointer">
                    Delete
                  </h2>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
