import React, { FC, useState } from "react";

import Check from "../public/check.svg";
import Error from "../public/error.svg";

import DiscordAccount from "./discord-account";
import TwitterAccount from "./twitter-account";
import { DiscordUser } from "./discord";
import { TwitterUser } from "./twitter";

const Linkdrop: FC = () => {
  const [discordAccount, setDiscordAccount] = useState<DiscordUser | null>(
    null
  );
  const [twitterAccount, setTwitterAccount] = useState<TwitterUser | null>(
    null
  );
  const [twitterError, setTwitterError] = useState<string | null>(null);

  const dateThreshold = new Date("2021-12-01");

  return (
    <div className="grid">
      <style jsx>{`
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
          width: 100%;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }

        .card {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin: 1rem;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 2px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          background: rgba(0, 0, 0, 0.05);
          width: 100%;
        }

        .card-image {
          min-width: 36px;
          max-width: 36px;
          height: 36px;
          margin-right: 1rem;
        }

        .card-image > * {
          width: 100%;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .card-row {
          width: 100%;
          display: flex;
          margin: 0.4rem 0;
          align-items: center;
        }

        .card-header {
          margin-top: 0;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h2 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
      `}</style>

      <div className="card">
        <h1 className="card-header">Connect with Discord</h1>
        <div className="card-row">
          <div className="card-image">
            {discordAccount ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <DiscordAccount
              account={discordAccount}
              setAccount={setDiscordAccount}
            />
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {discordAccount?.createdAt.valueOf() ||
            0 > dateThreshold.valueOf() ? (
              <Check />
            ) : (
              <Error />
            )}
          </div>
          <div className="card-content">
            <h4>Account created before {dateThreshold.toLocaleString()}?</h4>
            {discordAccount && discordAccount?.createdAt.toLocaleString()}
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {discordAccount?.isMember ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>
              Has joined{" "}
              <a
                href="https://discord.gg/DYpNr4cHxE"
                target="_blank"
                rel="noreferrer"
              >
                Shroom Kingdom Discord server
              </a>
            </h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {discordAccount?.isHumanguildMember ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>
              Has joined{" "}
              <a
                href="https://discord.gg/UtjCHNmaf9"
                target="_blank"
                rel="noreferrer"
              >
                Humanguild Discord server
              </a>
            </h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {discordAccount?.verified ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>Has a verified Email</h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {discordAccount?.acceptedRules ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>Accepted rules of Shroom Kingdom Discord server</h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {discordAccount?.solvedCaptcha ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>Solved captcha on Shroom Kingdom Discord server</h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {discordAccount?.discordsComVote ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>
              Voted for our Discord server on{" "}
              <a
                href="https://discords.com/servers/168893527357521920"
                target="_blank"
                rel="noreferrer"
              >
                discords.com
              </a>
            </h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {discordAccount?.topGgVote ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>
              Voted for our Discord server on{" "}
              <a
                href="https://top.gg/servers/168893527357521920"
                target="_blank"
                rel="noreferrer"
              >
                top.gg
              </a>
            </h4>
          </div>
        </div>
      </div>

      <div className="card">
        <h1 className="card-header">Connect with Twitter</h1>
        <div className="card-row">
          <div className="card-image">
            {twitterAccount ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            {twitterError ? (
              twitterError
            ) : (
              <TwitterAccount
                account={twitterAccount}
                setAccount={setTwitterAccount}
                setError={setTwitterError}
              />
            )}
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {twitterAccount?.isFollowing ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>
              Is following{" "}
              <a
                href="https://twitter.com/shrm_kingdom"
                target="_blank"
                rel="noreferrer"
              >
                Shroom Kingdom
              </a>
            </h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {twitterAccount?.isFollowingHumanguild ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>
              Is following{" "}
              <a
                href="https://twitter.com/humanguild"
                target="_blank"
                rel="noreferrer"
              >
                Humanguild
              </a>
            </h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {twitterAccount?.isFollowingNEARGames ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>
              Is following{" "}
              <a
                href="https://twitter.com/NearGamesGuild"
                target="_blank"
                rel="noreferrer"
              >
                Near Games
              </a>
            </h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {twitterAccount?.isFollowingNEARProtocol ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>
              Is following{" "}
              <a
                href="https://twitter.com/NEARProtocol"
                target="_blank"
                rel="noreferrer"
              >
                NEAR Protocol
              </a>
            </h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {twitterAccount?.verified ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>Has a verified Email</h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {twitterAccount?.retweeted ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>
              Retweeted{" "}
              <a
                href="https://twitter.com/shrm_kingdom/status/1416299778024083457"
                target="_blank"
                rel="noreferrer"
              >
                our Tweet
              </a>{" "}
              with hashtags #NFT #PlayToEarn #BlockchainGaming
            </h4>
          </div>
        </div>
        <div className="card-row">
          <div className="card-image">
            {twitterAccount?.liked ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <h4>
              Liked{" "}
              <a
                href="https://twitter.com/shrm_kingdom/status/1416299778024083457"
                target="_blank"
                rel="noreferrer"
              >
                our Tweet
              </a>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Linkdrop;
