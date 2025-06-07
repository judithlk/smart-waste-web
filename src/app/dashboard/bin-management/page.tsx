"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClipLoader } from "react-spinners";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  getAllBins,
} from "@/lib/api/bins";

import { BinType } from "@/types/bin";

import { IoMdClose } from "react-icons/io";

const formSchema = z.object({
  binNo: z
    .string()
    .length(3, {
      message: "Invalid bin number",
    })
    .max(50, {
      message: "Name must not exceed 50 characters",
    }),
  location: z.string().min(10, {
    message: "Invalid location",
  }),
  date: z.date().max(new Date(), { message: "Date cannot be in the future" }),
});

export default function BinManagement() {
  const [bins, setBins] = useState<BinType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const data = await getAllBins();
        setBins(data);
      } finally {
        setLoading(false);
      }
    };
    fetchBins();
  }, []);

  // console.log(bins);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      binNo: "",
      location: "",
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[1.6rem] font-semibold">Wastebin Management</h1>
      </div>
      <div className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {/* <Button className="bg-main-green text-white font-semibold rounded-sm">
              Add New Bin
            </Button> */}
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
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bin Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Descriptive address or landmark"
                              {...field}
                            />
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
                        name="binNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unique Bin Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Eg. BIN001" {...field} />
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
                            <FormLabel>Placement Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                max={new Date().toISOString().split("T")[0]}
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
        {loading ? <div className="p-4 text-sm"><ClipLoader size={25} color="#96D127" /></div> : null}
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
            {bins.map((bin) => (
              <TableRow key={bin._id}>
                <TableCell className="font-medium">{bin.binId}</TableCell>
                <TableCell>{bin.location?.address}</TableCell>
                <TableCell>
                  {new Date(bin.placementDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {bin.lastEmptiedAt
                    ? new Date(bin.lastEmptiedAt).toLocaleString()
                    : "Never"}
                </TableCell>
                <TableCell>{bin.fillLevel}</TableCell>
                <TableCell>{bin.status}</TableCell>
                <TableCell className="text-right">
                  <div className="flex space-x-3 justify-end">
                    <h2
                      className="text-blue-900 underline hover:text-gray-500 cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/bin-management/${bin._id}`)
                      }
                    >
                      View
                    </h2>
                    <h2
                      className="text-green-700 underline hover:text-gray-500 cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/schedule-management`)
                      }
                    >
                      Schedule Empty
                    </h2>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
