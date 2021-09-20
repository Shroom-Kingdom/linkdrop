import React, { FC } from "react";
import { ConnectedWalletAccount, WalletConnection } from "near-api-js";

const NearLoginButton: FC<{
  wallet: WalletConnection;
  account: ConnectedWalletAccount | null;
  signOut: () => void;
}> = ({ wallet, account, signOut }) => {
  const handleClick = async () => {
    if (account) {
      wallet.signOut();
      signOut();
    } else {
      wallet.requestSignIn("token.shrm.testnet", "Shroom Kingdom Airdrop");
    }
  };
  return (
    <>
      <button onClick={handleClick}>
        {wallet.isSignedIn() ? "Signout from NEAR" : "Login with NEAR"}
      </button>
    </>
  );
};
export default NearLoginButton;
