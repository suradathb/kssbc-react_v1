const MyToken = artifacts.require("MyToken");

contract("MyToken", async accounts => {
    let myTokenInstance;

    beforeEach(async () => {
        myTokenInstance = await MyToken.new(1000, "My Token", "MTK");
    });

    it("should transfer tokens correctly", async () => {
        const recipient = accounts[1];
        const amount = 100;

        await myTokenInstance.transfer(recipient, amount, { from: accounts[0] });

        const recipientBalance = await myTokenInstance.balanceOf(recipient);
        assert.equal(recipientBalance.toNumber(), amount, "The recipient's balance is incorrect");
    });
});
