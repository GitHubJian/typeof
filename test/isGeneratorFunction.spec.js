const {isGeneratorFunction} = require('@/isGeneratorFunction');

describe('isGeneratorFunction', function () {
    it('truthy', function () {
        function* gen() {}

        const res = isGeneratorFunction(gen);

        expect(res).toBeTruthy();
    });
});
