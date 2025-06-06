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

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IoMdClose } from "react-icons/io";

import ComingSoon from "@/components/ComingSoon";

const formSchema = z.object({
  fName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(50, {
      message: "Name must not exceed 50 characters",
    }),
  lName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(50, {
      message: "Name must not exceed 50 characters",
    }),
  personnelNo: z.string().length(3, {
    message: "Incorrect personnel number",
  }),
  phoneNo: z.string().length(11, {
    message: "Invalid phone number",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default function Personnel() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fName: "",
      lName: "",
      personnelNo: "",
      phoneNo: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    // <div className="space-y-4">
    //   <div>
    //     <h1 className="text-[1.6rem] font-semibold">Personnel Database</h1>
    //   </div>
    //   <div className="flex justify-end">
    //     <AlertDialog>
    //       <AlertDialogTrigger asChild>
    //         <Button className="bg-main-green text-white font-semibold rounded-sm">
    //           Add Personnel
    //         </Button>
    //       </AlertDialogTrigger>
    //       <AlertDialogContent>
    //         <AlertDialogHeader>
    //           <div className="flex justify-between">
    //             <AlertDialogTitle>Add New Personnel</AlertDialogTitle>
    //             <AlertDialogCancel className="border-none bg-white text-gray-500 hover:text-gray-800">
    //               <IoMdClose />
    //             </AlertDialogCancel>
    //           </div>

    //           <AlertDialogDescription>
    //             Fill in the details of the new personnel to add them to the
    //             database.
    //           </AlertDialogDescription>
    //         </AlertDialogHeader>
    //         <div>
    //           <Form {...form}>
    //             <form
    //               onSubmit={form.handleSubmit(onSubmit)}
    //               className="space-y-8"
    //             >
    //               <div className="grid grid-cols-2 gap-4 space-y-3">
    //                 <div>
    //                   <FormField
    //                     control={form.control}
    //                     name="fName"
    //                     render={({ field }) => (
    //                       <FormItem>
    //                         <FormLabel>First Name</FormLabel>
    //                         <FormControl>
    //                           <Input
    //                             placeholder="Enter first name"
    //                             {...field}
    //                           />
    //                         </FormControl>

    //                         <FormMessage />
    //                       </FormItem>
    //                     )}
    //                   />
    //                 </div>

    //                 <div>
    //                   <FormField
    //                     control={form.control}
    //                     name="lName"
    //                     render={({ field }) => (
    //                       <FormItem>
    //                         <FormLabel>Last Name</FormLabel>
    //                         <FormControl>
    //                           <Input placeholder="Enter last name" {...field} />
    //                         </FormControl>

    //                         <FormMessage />
    //                       </FormItem>
    //                     )}
    //                   />
    //                 </div>
                
    //                 <div>
    //                   <FormField
    //                     control={form.control}
    //                     name="phoneNo"
    //                     render={({ field }) => (
    //                       <FormItem>
    //                         <FormLabel>Phone Number</FormLabel>
    //                         <FormControl>
    //                           <Input
    //                             placeholder="Enter first name"
    //                             {...field}
    //                           />
    //                         </FormControl>

    //                         <FormMessage />
    //                       </FormItem>
    //                     )}
    //                   />
    //                 </div>

    //                 <div>
    //                   <FormField
    //                     control={form.control}
    //                     name="email"
    //                     render={({ field }) => (
    //                       <FormItem>
    //                         <FormLabel>Email Address</FormLabel>
    //                         <FormControl>
    //                           <Input placeholder="Enter last name" {...field} />
    //                         </FormControl>

    //                         <FormMessage />
    //                       </FormItem>
    //                     )}
    //                   />
    //                 </div>
    //                 <div>
    //                   <FormField
    //                     control={form.control}
    //                     name="personnelNo"
    //                     render={({ field }) => (
    //                       <FormItem>
    //                         <FormLabel>Personnel Number</FormLabel>
    //                         <FormControl>
    //                           <Input placeholder="Enter unique 3 digit number" {...field} />
    //                         </FormControl>

    //                         <FormMessage />
    //                       </FormItem>
    //                     )}
    //                   />
    //                 </div>
    //                 <div>
    //                   <FormField
    //                     control={form.control}
    //                     name="password"
    //                     render={({ field }) => (
    //                       <FormItem>
    //                         <FormLabel>Create password</FormLabel>
    //                         <FormControl>
    //                           <Input type="password" placeholder="Enter last name" {...field} />
    //                         </FormControl>

    //                         <FormMessage />
    //                       </FormItem>
    //                     )}
    //                   />
    //                 </div>
    //               </div>

    //               <Button type="submit" className="w-[100%]">Submit</Button>
    //             </form>
    //           </Form>
    //         </div>
    //       </AlertDialogContent>
    //     </AlertDialog>
    //   </div>
    //   <div className="bg-white p-3 rounded-md">
    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="w-[120px]">Personnel ID</TableHead>
    //           <TableHead>Name</TableHead>
    //           <TableHead>Phone No</TableHead>
    //           <TableHead>Email</TableHead>
    //           <TableHead className="text-right">Actions</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         <TableRow>
    //           <TableCell className="font-medium">PERSON505</TableCell>
    //           <TableCell>Yusuf Judith</TableCell>
    //           <TableCell>+2349012345678</TableCell>
    //           <TableCell>judith@gmail.com</TableCell>
    //           <TableCell className="text-right">
    //             <div className="flex space-x-3 justify-end">
    //               <h2 className="text-blue-900 underline hover:text-gray-500 cursor-pointer">
    //                 Edit
    //               </h2>
    //               <h2 className="text-red-700 underline hover:text-gray-500 cursor-pointer">
    //                 Delete
    //               </h2>
    //             </div>
    //           </TableCell>
    //         </TableRow>
    //       </TableBody>
    //     </Table>
    //   </div>
    // </div>
    <>
      <ComingSoon />
    </>
  );
}
