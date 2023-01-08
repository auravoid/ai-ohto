import { UserFlags } from 'discord.js';

export class GuildData {
    public static verificationLevel: string[] = [
        'None - unrestricted access to the server',
        'Low - must have a verified email on their Discord account',
        'Medium - must be registered on Discord for longer than 5 minutes',
        'High - Must be a member of the server for longer than 10 minutes',
        'Highest - Must have a verified phone on their Discord account',
    ];
    public static explicitContentFilter: string[] = [
        'Disabled - do not scan any messages',
        'Members without roles - scan messages sent by members without a role',
        'All members - scan all messages sent by all members',
    ];
    public static defaultMessageNotifications: string[] = [
        'All messages - receive notifications for all messages',
        'Only @mentions - only receive notifications when you are @mentioned',
    ];
    public static mfaLevel: string[] = [
        'None - 2FA not required',
        'Elevated - 2FA required for moderation actions',
    ];
    public static premiumTier: string[] = [
        'None - not enough boosts',
        'Tier 1 - server boosts level 1',
        'Tier 2 - server boosts level 2',
        'Tier 3 - server boosts level 3',
    ];
    public static systemChannelFlags: string[] = [
        'Suppress member join notifications',
        'Suppress server boost notifications',
        'Suppress server setup tips',
    ];
    public static nsfwLevel: string[] = [
        'Default - display an age gate for NSFW channels',
        'Explicit - do not display an age gate for NSFW channels',
    ];
}

export const UserData = {
    flags: {
        ActiveDeveloper: {
            name: 'Active Developer',
        },
        BotHTTPInteractions: {
            name: 'Bot HTTP Interactions',
            description:
                'Bot uses only HTTP interactions and is shown in the online member list',
        },
        BugHunterLevel1: {
            name: 'Level 1 Bug Hunter',
        },
        BugHunterLevel2: {
            name: 'Level 2 Bug Hunter',
        },
        CertifiedModerator: {
            name: 'Discord Certified Moderator',
        },
        HypeSquadOnlineHouse1: {
            name: 'House Bravery Member',
        },
        HypeSquadOnlineHouse2: {
            name: 'House Brilliance Member',
        },
        HypeSquadOnlineHouse3: {
            name: 'House Balance Member',
        },
        Hypesquad: {
            name: 'HypeSquad Events Member',
        },
        Partner: {
            name: 'Partnered Server Owner',
        },
        PremiumEarlySupporter: {
            name: 'Early Nitro Supporter',
        },
        Quarantined: {
            name: 'Quarantined',
            description:
                'User’s account has been quarantined based on recent activity',
        },
        Spammer: {
            name: 'Spammer',
            description: 'User has been identified as spammer',
        },
        Staff: {
            name: 'Discord Employee',
        },
        TeamPseudoUser: {
            name: 'Discord Team',
        },
        VerifiedBot: {
            name: 'Verified Bot',
        },
        VerifiedDeveloper: {
            name: 'Early Verified Bot Developer',
        },
    } satisfies {
        [key in keyof typeof UserFlags]: {
            name: string;
            description?: string;
        };
    },
    premiumTypes: [
        'None - not a Nitro user',
        'Nitro Classic - Nitro Classic user',
        'Nitro - Nitro user',
    ],
};
