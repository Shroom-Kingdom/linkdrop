import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  ConnectedWalletAccount,
  WalletConnection,
  connect,
  keyStores,
} from "near-api-js";
import { BrowserLocalStorageKeyStore } from "near-api-js/lib/key_stores";

import NearLoginButton from "./near-login-button";

const NearAccount: FC<{
  account: ConnectedWalletAccount | null;
  setAccount: Dispatch<SetStateAction<ConnectedWalletAccount | null>>;
}> = ({ account, setAccount }) => {
  const [keyStore, setKeyStore] = useState<BrowserLocalStorageKeyStore | null>(
    null
  );
  const [wallet, setWallet] = useState<WalletConnection | null>(null);

  useEffect(() => {
    const run = async () => {
      if (process.browser) {
        try {
          const keyStore = new keyStores.BrowserLocalStorageKeyStore();
          setKeyStore(keyStore);
          const config = {
            networkId: "testnet",
            keyStore,
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
          };
          const near = await connect(config);
          const wallet = new WalletConnection(near, "shrm.testnet");
          setWallet(wallet);
          const account = wallet.isSignedIn() ? wallet.account() : null;
          setAccount(account);
        } catch (err) {
          console.error(err);
        }
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const signOut = () => {
    if (keyStore) {
      keyStore.clear();
      setAccount(null);
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.toString());
    }
  };
  return (
    <>
      {account && <div>{account.accountId}</div>}
      {wallet && (
        <NearLoginButton wallet={wallet} account={account} signOut={signOut} />
      )}
    </>
  );
};
export default NearAccount;
