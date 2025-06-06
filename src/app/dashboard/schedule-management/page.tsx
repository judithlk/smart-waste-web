"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAdmin } from "@/hooks/useAdmin";

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
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getAllSchedules, createSchedule } from "@/lib/api/schedules";
import { getAllBins } from "@/lib/api/bins";
import { getAllPersonnel } from "@/lib/api/personnel";
import { ScheduleType } from "@/types/schedule";
import { BinType } from "@/types/bin";
import { PersonnelType } from "@/types/personnel";

import { IoMdClose } from "react-icons/io";

const formSchema = z.object({
  bins: z.array(z.string()).min(2, {
    message: "Select at least two bins",
  }),
  personnelNo: z.string(),
  date: z.date().min(new Date(), { message: "Date must be in the future" }),
});

export default function Schedules() {
  const admin = useAdmin();
  const [open, setOpen] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [bins, setBins] = useState<BinType[]>([]);
  const [personnel, setPersonnel] = useState<PersonnelType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadSchedules = async () => {
    const data = await getAllSchedules();
    setSchedules(data);
  };

  useEffect(() => {
    loadSchedules();
  }, []);

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

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const data = await getAllPersonnel();
        setPersonnel(data);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonnel();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bins: [],
      personnelNo: "",
      date: new Date(),
    },
  });

  const { reset, handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    if (!admin?.username) {
      toast.error("Admin not logged in");
      return;
    }
    try {
      const payload = {
        binIds: values.bins, // map bins -> binIds
        personnelId: values.personnelNo, // map personnelNo -> personnelId
        scheduledDate: values.date.toISOString(), // Date as ISO string
        createdBy: admin?.username,
      };

      console.log(payload);

      const newSchedule = await createSchedule(payload);
      toast.success("Schedule created successfully!");
      form.reset();
      setLoading(false);
      setOpen(false);
      await loadSchedules();
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to create schedule.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[1.6rem] font-semibold">Schedule Waste Disposal</h1>
      </div>
      <div className="flex justify-end">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-main-green text-white font-semibold rounded-sm"
              onClick={() => setOpen(true)}
            >
              Create Schedule
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex justify-between">
                <AlertDialogTitle>Create a New Schedule</AlertDialogTitle>
                <AlertDialogCancel
                  className="border-none bg-white text-gray-500 hover:text-gray-800"
                  onClick={() => setOpen(false)}
                >
                  <IoMdClose />
                </AlertDialogCancel>
              </div>

              <AlertDialogDescription>
                Fill in the details of the new schedule below.
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
                            <div className="flex space-x-3 flex-wrap border p-2 rounded-md max-h-[200px] overflow-y-auto">
                              {bins.map((bin) => (
                                <label
                                  key={bin._id}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    value={bin.binId}
                                    checked={
                                      Array.isArray(field.value) &&
                                      field.value.includes(bin.binId)
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
                                  <span>
                                    {bin.binId + " (" + bin.fillLevel + ")"}
                                  </span>
                                </label>
                              ))}
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
                                  <SelectValue placeholder="Personnel ID and Name" />
                                </SelectTrigger>
                                <SelectContent>
                                  {personnel.map((person) => (
                                    <SelectItem
                                      key={person._id}
                                      value={person.personnelId}
                                    >
                                      {person.personnelId + " " + person.name}
                                    </SelectItem>
                                  ))}
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

                  {loading ? (
                    <Button type="submit" className="w-[100%]" disabled>
                      <ClipLoader size={20} color="#96D127" />
                    </Button>
                  ) : (
                    <Button type="submit" className="w-[100%]">
                      Create
                    </Button>
                  )}
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
              <TableHead className="w-[100px]">Schedule No</TableHead>
              <TableHead className="">Creation Date</TableHead>
              <TableHead className="">Scheduled By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Personnel ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule._id}>
                <TableCell className="font-medium">
                  {schedule.scheduleNo}
                </TableCell>
                <TableCell>{new Date(schedule.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{schedule.createdBy}</TableCell>
                <TableCell>{new Date(schedule.scheduledDate).toLocaleDateString()}</TableCell>
                <TableCell>{schedule.personnelId}</TableCell>
                <TableCell>{schedule.status}</TableCell>
                <TableCell className="text-right">
                  <div className="flex space-x-3 justify-end">
                    <h2
                      className="text-green-900 underline hover:text-gray-500 cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/dashboard/schedule-management/${schedule._id}`
                        )
                      }
                    >
                      View
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
