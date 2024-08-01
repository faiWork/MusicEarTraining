const middleC_Index = 41;

const notesFolderLocation = `${process.env.PUBLIC_URL}/sound/piano-88-notes/`;

// Define the desired order of file names
const fileNamesOrder = [
    "0-a", "0-as", "0-b",
    "1-c", "1-cs", "1-d", "1-ds", "1-e", "1-f", "1-fs", "1-g", "1-gs", "1-a", "1-as", "1-b",
    "2-c", "2-cs", "2-d", "2-ds", "2-e", "2-f", "2-fs", "2-g", "2-gs", "2-a", "2-as", "2-b",
    "3-c", "3-cs", "3-d", "3-ds", "3-e", "3-f", "3-fs", "3-g", "3-gs", "3-a", "3-as", "3-b",
    "4-c", "4-cs", "4-d", "4-ds", "4-e", "4-f", "4-fs", "4-g", "4-gs", "4-a", "4-as", "4-b",
    "5-c", "5-cs", "5-d", "5-ds", "5-e", "5-f", "5-fs", "5-g", "5-gs", "5-a", "5-as", "5-b",
    "6-c", "6-cs", "6-d", "6-ds", "6-e", "6-f", "6-fs", "6-g", "6-gs", "6-a", "6-as", "6-b",
    "7-c", "7-cs", "7-d", "7-ds", "7-e", "7-f", "7-fs", "7-g", "7-gs", "7-a", "7-as", "7-b",
    "8-c"
];

function importAll(r) {
    return r.keys().map(r);
    // return r.keys();
}

// Function to fetch the audio files in the desired order
function fetchAudioFiles() {
    const audioFiles = {};

    const importAudioFilePaths = importAll(require.context(`${process.env.PUBLIC_URL}/sound/piano-88-notes/`, false, /\.(wav|mp3|flac|aac)$/))

    // console.log("debug importAudioFilePaths:" + importAudioFilePaths);

    // Function to extract the original file name from a modified path
    const extractOriginalFileName = (filePath) => {
        return filePath.split('/').slice(-1)[0].split('.')[0];
    };

    // Map the modified file names to their original names in fileNamesOrder
    const audioFileNamesMap = {};
    importAudioFilePaths.forEach((filePath) => {
        const originalFileName = extractOriginalFileName(filePath);
        audioFileNamesMap[originalFileName] = filePath;
    });

    // console.log("debug audioFileNamesMap: " + JSON.stringify(audioFileNamesMap));

    // Sort importAudioFilePaths based on the order defined in fileNamesOrder
    const sortedImportAudioFilePaths = fileNamesOrder.map((fileName) => audioFileNamesMap[fileName]);

    // console.log("debug sortedImportAudioFilePaths: " + sortedImportAudioFilePaths);

    return sortedImportAudioFilePaths;
}

// Initialize audio files in the custom order
const audioFiles = fetchAudioFiles();

// Verify the order of the audio files
console.log("debug audioFiles:" + JSON.stringify(audioFiles));

export { middleC_Index, audioFiles };