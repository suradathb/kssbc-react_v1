const KSSBonusToken = artifacts.require("KSSBonusToken");

contract('KSSBonusToken', () => {
    it('should read newly written values', async () => {
        const KSSBonusTokenInstance = await KSSBonusToken.deployed();
        var value = (await KSSBonusTokenInstance.TotalSupply.call()).toNumber();

        assert.equal(value, 0, "0 wasn't the initial value");

        await KSSBonusTokenInstance.write(1);
        value = (await KSSBonusTokenInstance.decimals.call()).toNumber();
        assert.equal(value, 1, "1 was not written");

        await KSSBonusTokenInstance.write(2);
        value = (await KSSBonusTokenInstance.name.call()).toNumber();
        assert.equal(value, 2, "2 was not written");

        await KSSBonusTokenInstance.write(3);
        value = (await KSSBonusTokenInstance.symbol.call()).toNumber();
        assert.equal(value, 3, "3 was not written");
    });
});