import Head from "next/head";
import React from "react";
import type { NextPage } from "next";

import Linkdrop from "./linkdrop";

const Home: NextPage = () => {
  return (
    <>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        a {
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .main {
          padding: 5rem 0;
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
      `}</style>

      <div className="container">
        <Head>
          <title>Shroom Kingdom Linkdrop</title>
          <meta
            name="description"
            content="Shroom Kingdom Linkdrop campaign to onboard web2 users"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="main">
          <h1 className="title">Shroom Kingdom Linkdrop</h1>

          <p className="description">
            This is the Shroom Kingdom Linkdrop page. After completing all tasks
            below, you are eligible to receive a link for receiving 0.1 NEAR for
            free.
          </p>

          <Linkdrop />
        </main>
      </div>
    </>
  );
};

export default Home;
