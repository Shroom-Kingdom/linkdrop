import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

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
  setClaimCheck: Dispatch<SetStateAction<ClaimCheck | null>>;
  discordOwnerId?: string;
  twitterOwnerId?: string;
}> = ({ setClaimCheck, discordOwnerId, twitterOwnerId }) => {
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
        <div>
          {info.claimed} links have already been claimed. {info.unclaimed}{" "}
          remaining
        </div>
      )}
    </>
  );
};
export default Claim;
