const SOUNDS = Object.freeze([
    require("@/assets/sfx/atumalaca.mp3"),
    require("@/assets/sfx/fah.mp3"),
    require("@/assets/sfx/fart.mp3"),
    require("@/assets/sfx/sus.mp3"),
    require("@/assets/sfx/vineboom.mp3"),
]);

export function getRandomSound()
{
    return SOUNDS[Math.round(Math.random() * (SOUNDS.length-1))];
}
