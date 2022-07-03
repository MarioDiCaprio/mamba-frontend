import base64ToBlob from "./base64ToBlob";


describe('base64ToBlob', () => {

    it('should convert base64 to byte array', () => {
        const base64 = "TWFu";
        const bytes = [77, 97, 110];

        // test function
        const result = base64ToBlob(base64);
        expect(result).not.equal(null);
        result?.arrayBuffer().then(buffer => {
            const view = new Uint8Array(buffer);
            const len = view.length;
            for (let i = 0; i < len; i++) {
                expect(bytes[i]).equal(view[i]);
            }
        });
    });

});
