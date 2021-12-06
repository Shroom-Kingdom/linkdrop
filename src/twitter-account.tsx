import React, { Dispatch, FC, SetStateAction, useEffect } from "react";

import TwitterSigninButton from "./twitter-signin-button";
import { removeQueryParams } from "./helper";
import { TwitterUser } from "./twitter";

const TwitterAccount: FC<{
  account: TwitterUser | null;
  setAccount: Dispatch<SetStateAction<TwitterUser | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
}> = ({ account, setAccount, setError }) => {
  useEffect(() => {
    const run = async () => {
      if (process.browser) {
        // const oauthToken = window.localStorage.getItem("TWITTER_OAUTH_TOKEN");
        const oauthToken = window.localStorage.getItem("TWITTER_OAUTH_TOKEN");
        const oauthTokenSecret = window.localStorage.getItem(
          "TWITTER_OAUTH_TOKEN_SECRET"
        );
        if (window.location.search.startsWith("?")) {
          const queryParams = new URLSearchParams(
            window.location.search.substr(1)
          );
          const oauthToken = queryParams.get("oauth_token");
          const oauthVerifier = queryParams.get("oauth_verifier");
          if (oauthToken && oauthVerifier) {
            const res = await fetch(
              `https://linkdrop.shrm.workers.dev/twitter/access-token`,
              {
                method: "POST",
                body: JSON.stringify({ oauthToken, oauthVerifier }),
              }
            );
            removeQueryParams();
            if (!res.ok) {
              signOut();
              console.error(await res.text());
              return;
            }
            const user: TwitterUser & {
              oauthToken?: string;
              oauthTokenSecret?: string;
            } = await res.json();
            const { oauthToken: token, oauthTokenSecret: secret } = user;
            delete user.oauthToken;
            delete user.oauthTokenSecret;
            setAccount(user);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            window.localStorage.setItem("TWITTER_OAUTH_TOKEN", token!);
            window.localStorage.setItem(
              "TWITTER_OAUTH_TOKEN_SECRET",
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              secret!
            );
            return;
          }
        }
        if (oauthToken && oauthTokenSecret) {
          const res = await fetch(
            `https://linkdrop.shrm.workers.dev/twitter/verify`,
            {
              method: "POST",
              body: JSON.stringify({ oauthToken, oauthTokenSecret }),
            }
          );
          removeQueryParams();
          if (!res.ok) {
            signOut();
            if (res.status === 429) {
              setError(
                "You just got rate limited by Twitter API. Please wait a few minutes and then try again (refresh this page)."
              );
            }
            console.error(await res.text());
            return;
          }
          const user: TwitterUser = await res.json();
          setAccount(user);
        }
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const signOut = () => {
    window.localStorage.removeItem("TWITTER_OAUTH_TOKEN");
    window.localStorage.removeItem("TWITTER_OAUTH_TOKEN_SECRET");
    setAccount(null);
  };
  return (
    <>
      {account && (
        <div>
          {account.name} (@{account.screenName})
        </div>
      )}
      <TwitterSigninButton account={account} signOut={signOut} />
    </>
  );
};
export default TwitterAccount;
