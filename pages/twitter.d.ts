export interface TwitterUser {
  createdAt: string | Date;
  name: string;
  screenName: string;
  verified: boolean;
  isFollowing: boolean;
  retweeted: boolean;
  liked: boolean;
}
