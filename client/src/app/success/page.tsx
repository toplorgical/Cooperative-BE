
import pathnames from "@/constants/pathnames";
import Link from "next/link";
import React from "react";

const Page = () => {
  //const handleOnchange=()=>{
  //  window.location.href=pathnames.USER_DASHBOARD
  // }

   
  return <div >
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-2xl font-bold text-green-500 mb-4">Success!</h1>
        <p className="text-gray-700 mb-6">Your Payment was completed successfully.</p>
        <Link href={"/user/dashboard"} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition" >
          Go to Dashboard
        </Link>
      </div>
    </div>
       
   
   
         </div>;
};

export default Page;
