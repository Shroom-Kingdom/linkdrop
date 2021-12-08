import React, { FC, MouseEventHandler } from "react";

const Button: FC<{ onClick?: MouseEventHandler<HTMLButtonElement> }> = ({
  onClick,
  children,
}) => {
  return (
    <>
      <style jsx>{`
        .button {
          align-self: flex-start;
          color: #fff;
          text-shadow: none;
          box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
          cursor: pointer;
          display: inline-block;
          min-height: 1em;
          outline: 0;
          border: none;
          vertical-align: baseline;
          font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
          margin: 0 0.25em 0 0;
          padding: 0.8rem 1.3rem;
          text-transform: none;
          text-shadow: none;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1em;
          font-style: normal;
          text-align: center;
          text-decoration: none;
          border-radius: 0.3rem;
          transition: opacity 0.1s ease, background-color 0.1s ease,
            color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease,
            -webkit-box-shadow 0.1s ease;
        }
        .button:not(:hover) {
          background-color: #1678c2;
        }
        .button:hover {
          background-color: #2185d0;
        }
      `}</style>

      <button className="button" onClick={onClick}>
        {children}
      </button>
    </>
  );
};
export default Button;
