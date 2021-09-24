import React, { FC } from "react";

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
        "https://airdrop.shrm.workers.dev/twitter/request-token"
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
    <>
      <button onClick={handleClick}>
        {account ? "Sign out" : "Sign in with Twitter"}
      </button>
    </>
  );
};
export default TwitterSigninButton;
