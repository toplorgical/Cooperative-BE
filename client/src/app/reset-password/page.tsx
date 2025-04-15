import ResetPasswordModule from "@/modules/auth/reset-password";

import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <ResetPasswordModule />
    </Suspense>
  );
};

export default Page;
