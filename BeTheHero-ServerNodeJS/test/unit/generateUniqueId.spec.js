const generateUniqueId = require('../../src/util/generateUniqueId');

describe('Generate unique id', () => {
    it('should generate an unique id', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8)
    })
})