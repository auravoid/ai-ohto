import { Command } from './Command';
import { Coinflip } from '@/interactions/Fun/Coinflip';
import { Ping } from '@/interactions/General/Ping';
import { About } from '@/interactions/General/About';
import { Chat } from '@/interactions/Fun/Chat';
import { HTTPCat } from '@/interactions/Fun/HTTPCat';
import { Interact } from '@/interactions/Fun/Interact';
import { UwU } from '@interactions/Fun/UwU';
import { Domain } from '@interactions/Lookup/Domain';
import { Horoscope } from '@interactions/Lookup/Horoscope';
import { Invite } from '@interactions/Utility/Invite';
import { Snowflake } from '@interactions/Utility/Snowflake';

export const Commands: Command[] = [
    Coinflip,
    Ping,
    About,
    Chat,
    HTTPCat,
    Interact,
    UwU,
    Domain,
    Horoscope,
    Invite,
    Snowflake,
];
