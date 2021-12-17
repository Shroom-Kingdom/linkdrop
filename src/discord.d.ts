export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  createdAt: Date | string;
  refreshToken: string;
  isMember: boolean;
  verified: boolean;
  acceptedRules: boolean;
  solvedCaptcha: boolean;
  discordsComVote: boolean;
  topGgVote: boolean;
}
