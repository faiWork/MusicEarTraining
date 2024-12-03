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

export function getMidiNote (noteIndex, accidentalsType) {
  const octave = Math.floor(noteIndex / noteData.englishSharpName.length);
  const noteNameIndex = noteIndex % noteData.englishSharpName.length;
  let noteName = noteData.englishSharpName[noteNameIndex];

  // Adjust the note name based on the accidentalsType
  if (accidentalsType === "sharps") {
    // No changes needed for sharps
  } else if (accidentalsType === "flats") {
    if (noteName.includes("#")) {
      noteName = noteData.englishSharpName[noteNameIndex - 1] + "b";
    }
  }

  // Calculate the MIDI note value
  const midiNote = octave * 12 + noteData.englishSharpName.indexOf(noteName);
  return midiNote;
};

export function updateSelectedKeys(selectedKeys, keyName, middleC_Index, setSelectedKeys) {
    const updatedKeys = [...selectedKeys]; // Create a copy of the selectedKeys array
    updatedKeys[0].selectedKey = keyName; // Update the updatedKeys[].selectedKey with the new value
    updatedKeys[0].index = noteData.keyName.indexOf(updatedKeys[0].selectedKey); // Update the updatedKeys.index with the new value
    updatedKeys[0].keyRootNoteIndex = (middleC_Index + updatedKeys[0].index);
    setSelectedKeys(updatedKeys);
}