import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import Button from "./button";

interface Info {
  claimed: number;
  unclaimed: number;
}

export interface ClaimCheck {
  discord: boolean;
  twitter: boolean;
  link?: string;
}

const Claim: FC<{
  claimCheck: ClaimCheck | null;
  setClaimCheck: Dispatch<SetStateAction<ClaimCheck | null>>;
  discordOwnerId?: string;
  twitterOwnerId?: string;
}> = ({ claimCheck, setClaimCheck, discordOwnerId, twitterOwnerId }) => {
  const [info, setInfo] = useState<Info | null>(null);

  const fetchCheck = useCallback(async () => {
    const res = await fetch(
      "https://linkdrop.shrm.workers.dev/linkdrop/check",
      {
        method: "POST",
        body: JSON.stringify({
          discordOwnerId,
          twitterOwnerId,
        }),
      }
    );
    if (!res.ok) {
      console.error(res.status, await res.text());
      return;
    }
    setClaimCheck(await res.json());
  }, [setClaimCheck, discordOwnerId, twitterOwnerId]);

  const fetchInfo = useCallback(async () => {
    const res = await fetch("https://linkdrop.shrm.workers.dev/linkdrop/info");
    if (!res.ok) {
      console.error(res.status, await res.text());
      return;
    }
    setInfo(await res.json());
  }, []);

  useEffect(() => {
    fetchInfo();
    fetchCheck();
  }, [fetchInfo, fetchCheck]);

  return (
    <>
      {info && (
        <span>
          {info.claimed} links have already been claimed. {info.unclaimed}{" "}
          remaining
        </span>
      )}

      <style jsx>{`
        .wrapper {
          display: flex:
          width: 100%;
          justify-content: center;
          margin-top: 1rem;
        }
      `}</style>
      <div className="wrapper">
        {claimCheck &&
          claimCheck.discord &&
          claimCheck.twitter &&
          (claimCheck.link ? claimCheck.link : <Button>Claim now</Button>)}
      </div>
    </>
  );
};
export default Claim;
