import { UserFlags } from "discord.js";

export const UserData = {
    flags: {
        "ActiveDeveloper": {
            "name": "Active Developer"
        },
        "BotHTTPInteractions": {
            "name": "Bot HTTP Interactions",
            "description": "Bot uses only HTTP interactions and is shown in the online member list"
        },
        "BugHunterLevel1": {
            "name": "Level 1 Bug Hunter"
        },
        "BugHunterLevel2": {
            "name": "Level 2 Bug Hunter"
        },
        "CertifiedModerator": {
            "name": "Discord Certified Moderator"
        },
        "HypeSquadOnlineHouse1": {
            "name": "House Bravery Member"
        },
        "HypeSquadOnlineHouse2": {
            "name": "House Brilliance Member"
        },
        "HypeSquadOnlineHouse3": {
            "name": "House Balance Member"
        },
        "Hypesquad": {
            "name": "HypeSquad Events Member"
        },
        "Partner": {
            "name": "Partnered Server Owner"
        },
        "PremiumEarlySupporter": {
            "name": "Early Nitro Supporter"
        },
        "Quarantined": {
            "name": "Quarantined",
            "description": "User’s account has been quarantined based on recent activity"
        },
        "Spammer": {
            "name": "Spammer",
            "description": "User has been identified as spammer"
        },
        "Staff": {
            "name": "Discord Employee"
        },
        "TeamPseudoUser": {
            "name": "Discord Team"
        },
        "VerifiedBot": {
            "name": "Verified Bot"
        },
        "VerifiedDeveloper": {
            "name": "Early Verified Bot Developer"
        },
    } satisfies {
            [key in keyof typeof UserFlags]: {
                name: string;
                description?: string;
            }
        }
};
