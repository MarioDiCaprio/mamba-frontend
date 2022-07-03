export default function base64ToBlob(base64?: string | null): Blob | null {
    if (base64 === null || base64 === undefined) {
        return null;
    }
    const sliceSize = 512;
    const byteCharacters = Buffer.from(base64, 'base64');
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.at(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays);
    return blob;
}
