import React, { FC } from "react";

import Button from "./button";
import { TwitterUser } from "./twitter";

const TwitterSigninButton: FC<{
  account: TwitterUser | null;
  signOut: () => void;
}> = ({ account, signOut }) => {
  const handleClick = async () => {
    if (account) {
      signOut();
    } else {
      const res = await fetch(
        "https://linkdrop.shrm.workers.dev/twitter/request-token"
      );
      const location = await res.text();
      if (!location) {
        console.error("not a redirect");
        return;
      }
      window.location.assign(location);
    }
  };
  return (
    <Button onClick={handleClick}>
      {account ? "Sign out" : "Sign in with Twitter"}
    </Button>
  );
};
export default TwitterSigninButton;
