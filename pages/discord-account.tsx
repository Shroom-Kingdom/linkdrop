import React, { Dispatch, FC, SetStateAction, useEffect } from "react";

import DiscordSigninButton from "./discord-signin-button";
import { DiscordUser } from "./discord";
import { removeQueryParams } from "./helper";

const DiscordAccount: FC<{
  account: DiscordUser | null;
  setAccount: Dispatch<SetStateAction<DiscordUser | null>>;
}> = ({ account, setAccount }) => {
  useEffect(() => {
    const run = async () => {
      if (process.browser) {
        const refreshToken = window.localStorage.getItem(
          "DISCORD_REFRESH_TOKEN"
        );
        if (window.location.search.startsWith("?")) {
          const queryParams = new URLSearchParams(
            window.location.search.substr(1)
          );
          const state = window.localStorage.getItem("DISCORD_STATE");
          const code = queryParams.get("code");
          if (code && state === queryParams.get("state")) {
            const res = await fetch(
              `https://airdrop.shrm.workers.dev/discord/token`,
              {
                method: "POST",
                body: JSON.stringify({ code }),
              }
            );
            removeQueryParams();
            if (!res.ok) {
              console.error(await res.text());
              return;
            }
            const user = await res.json();
            signIn(user);
            return;
          }
        }
        if (refreshToken) {
          const res = await fetch(
            `https://airdrop.shrm.workers.dev/discord/refresh`,
            {
              method: "POST",
              body: JSON.stringify({ refresh_token: refreshToken }),
            }
          );
          if (!res.ok) {
            window.localStorage.removeItem("DISCORD_REFRESH_TOKEN");
            console.error(await res.text());
            return;
          }
          const user = await res.json();
          signIn(user);
        }
      }
    };
    const signIn = (user: DiscordUser) => {
      window.localStorage.setItem("DISCORD_REFRESH_TOKEN", user.refreshToken);
      user.createdAt = new Date(user.createdAt);
      setAccount(user);
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const signOut = () => {
    window.localStorage.removeItem("DISCORD_REFRESH_TOKEN");
    setAccount(null);
  };
  return (
    <>
      {account && (
        <div>
          {account.username}#{account.discriminator}
        </div>
      )}
      <DiscordSigninButton account={account} signOut={signOut} />
    </>
  );
};
export default DiscordAccount;
