import React, { FC } from "react";
import * as uuid from "uuid";

import Button from "./button";
import { DiscordUser } from "./discord";

const DiscordSigninButton: FC<{
  account: DiscordUser | null;
  signOut: () => void;
}> = ({ account, signOut }) => {
  const handleClick = async () => {
    if (account) {
      signOut();
    } else {
      const state = uuid.v4();
      window.localStorage.setItem("DISCORD_STATE", state);
      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=877802081170391070&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=guilds%20identify%20email&state=${state}`;
    }
  };
  return (
    <Button onClick={handleClick}>
      {account ? "Sign out" : "Sign in with Discord"}
    </Button>
  );
};
export default DiscordSigninButton;
