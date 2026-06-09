import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

const page = () => {
  return (
    <div>
      <header>
        Landing Page
        <LoginLink>
          <Button>Sign In</Button>
        </LoginLink>
      </header>
    </div>
  );
};

export default page;
