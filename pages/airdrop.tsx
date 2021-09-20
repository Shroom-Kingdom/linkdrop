import React, { FC, useState } from "react";
import { ConnectedWalletAccount } from "near-api-js";

import Check from "../public/check.svg";
import Error from "../public/error.svg";

import NearLoginButton from "./near-account";

const Airdrop: FC = () => {
  const [account, setAccount] = useState<ConnectedWalletAccount | null>(null);

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
        <div className="card-image">{account ? <Check /> : <Error />}</div>
        <div className="card-content">
          <NearLoginButton account={account} setAccount={setAccount} />
        </div>
      </div>
    </div>
  );
};
export default Airdrop;
