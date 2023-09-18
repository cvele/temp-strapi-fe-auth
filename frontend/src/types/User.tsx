export interface User {
    id: string;
    username: string;
    confirmed: boolean;
    avatar_url?: string;
    about?: string;
    twitter_username?: string;
    linkedin_username?: string;
    github_username?: string;
    website_url?: string;
    email?: string;
}
