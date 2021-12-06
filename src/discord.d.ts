export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  createdAt: Date | string;
  refreshToken: string;
  isMember: boolean;
  isHumanguildMember: boolean;
  verified: boolean;
  acceptedRules: boolean;
  solvedCaptcha: boolean;
  discordsComVote: boolean;
  topGgVote: boolean;
}
