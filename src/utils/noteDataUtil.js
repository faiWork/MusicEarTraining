import * as noteData from './noteData';

Number.prototype.mod = function(b) {
    // Calculate
    return ((this % b) + b) % b;
}

/**
 * Returns the sharp solfege name for the given scale degree.
 * @param {number} degree - The scale degree (0-11).
 * @returns {string} The sharp solfege name.
 */
export function getSharpSolfegeName(degree) {
    return noteData.solfegeSharpName[degree.mod(12)]  ;
}

/**
 * Returns the flat solfege name for the given scale degree.
 * @param {number} degree - The scale degree (0-11).
 * @returns {string} The flat solfege name.
 */
export function getFlatSolfegeName(degree) {
    return noteData.solfegeFlatName[degree.mod(12)];
}

export function getAccidentalsType(type) {
    return type === "sharp" ? "Sharp" : "Flat";
}

export function getNoteName(degree, selectedNoteType, selectedAccidentalsType) {
    let noteName = "";
    if(selectedNoteType === noteData.noteType.solfege && selectedAccidentalsType === noteData.accidentalsType.sharp ) {
        noteName = noteName + getSharpSolfegeName(degree);
    } else if(selectedNoteType === noteData.noteType.solfege && selectedAccidentalsType === noteData.accidentalsType.flat) {
        noteName = noteName + getFlatSolfegeName(degree);
    }

    //For each upper octave, add ' at the end
    for (let i = 0; i < Math.floor(degree / 12); i++) {
        noteName = noteName + "'";
    }

    //For each lower octave, add ' at the beginning
    for (let i = 0; i > Math.floor(degree / 12); i--) {
        noteName =  "'" + noteName;
    }

    return noteName;
}