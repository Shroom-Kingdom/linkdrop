import React, { FC, useState } from "react";
import { ConnectedWalletAccount } from "near-api-js";

import Check from "../public/check.svg";
import Error from "../public/error.svg";

import DiscordAccount from "./discord-account";
import NearAccount from "./near-account";
import { DiscordUser } from "./discord";

const Airdrop: FC = () => {
  const [nearAccount, setNearAccount] = useState<ConnectedWalletAccount | null>(
    null
  );
  const [discordAccount, setDiscordAccount] = useState<DiscordUser | null>(
    null
  );

  const dateThreshold = new Date("2021-09-21");

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
          width: 36px;
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
        <h1 className="card-header">Connect with NEAR</h1>
        <div className="card-row">
          <div className="card-image">
            {nearAccount ? <Check /> : <Error />}
          </div>
          <div className="card-content">
            <NearAccount account={nearAccount} setAccount={setNearAccount} />
          </div>
        </div>
      </div>

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
                Discord server
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
            <h4>Accepted rules of Discord server</h4>
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
    </div>
  );
};
export default Airdrop;
