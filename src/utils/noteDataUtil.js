import { solfegeSharpName, solfegeFlatName, accidentalsType } from './noteData';

/**
 * Returns the sharp solfege name for the given scale degree.
 * @param {number} degree - The scale degree (0-11).
 * @returns {string} The sharp solfege name.
 */
export function getSharpSolfegeName(degree) {
    return solfegeSharpName[degree % 12];
}

/**
 * Returns the flat solfege name for the given scale degree.
 * @param {number} degree - The scale degree (0-11).
 * @returns {string} The flat solfege name.
 */
export function getFlatSolfegeName(degree) {
    return solfegeFlatName[degree % 12];
}

export function getAccidentalsType(type) {
    return type === "sharp" ? "Sharp" : "Flat";
}