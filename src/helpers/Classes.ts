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
            emoji: '<:activedev:1062945954468208681>',
        },
        BotHTTPInteractions: {
            name: 'Bot HTTP Interactions',
            description:
                'Bot uses only HTTP interactions and is shown in the online member list',
            emoji: '<:botTag:230105988211015680>',
        },
        BugHunterLevel1: {
            name: 'Level 1 Bug Hunter',
            emoji: '<:bughunter:585765206769139723>',
        },
        BugHunterLevel2: {
            name: 'Level 2 Bug Hunter',
            emoji: '<:goldbughunter:853274684337946648>',
        },
        CertifiedModerator: {
            name: 'Discord Certified Moderator',
            emoji: '<:certifiedmod:853274382339670046>',
        },
        HypeSquadOnlineHouse1: {
            name: 'House Bravery Member',
            emoji: '<:bravery:585763004218343426>',
        },
        HypeSquadOnlineHouse2: {
            name: 'House Brilliance Member',
            emoji: '<:brilliance:585763004495298575>',
        },
        HypeSquadOnlineHouse3: {
            name: 'House Balance Member',
            emoji: '<:balance:585763004574859273>',
        },
        Hypesquad: {
            name: 'HypeSquad Events Member',
            emoji: '<:hypesquad_events:585765895939424258>',
        },
        Partner: {
            name: 'Partnered Server Owner',
            emoji: '<:partnernew:754032603081998336>',
        },
        PremiumEarlySupporter: {
            name: 'Early Nitro Supporter',
            emoji: '<:supporter:585763690868113455>',
        },
        Quarantined: {
            name: 'Quarantined',
            emoji: '<:blank:1062948700915253288>',
            description:
                'User’s account has been quarantined based on recent activity',
        },
        Spammer: {
            name: 'Spammer',
            emoji: '<:blank:1062948700915253288>',
            description: 'User has been identified as spammer',
        },
        Staff: {
            name: 'Discord Employee',
            emoji: '<:stafftools:314348604095594498>',
        },
        TeamPseudoUser: {
            name: 'Discord Team',
            emoji: '<:blank:1062948700915253288>',
        },
        VerifiedBot: {
            name: 'Verified Bot',
            emoji: '<:blank:1062948700915253288>',
        },
        VerifiedDeveloper: {
            name: 'Early Verified Bot Developer',
            emoji: '<:verifiedbotdev:853277205264859156>',
        },
    } satisfies {
        [key in keyof typeof UserFlags]: {
            name: string;
            description?: string;
            emoji: string;
        };
    },
    premiumTypes: [
        'None - not a Nitro user',
        'Nitro Classic - Nitro Classic user',
        'Nitro - Nitro user',
    ],
};
