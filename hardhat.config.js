/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    rinkeby: {
      url: "",
      accounts: [""],
    },
  },
};

// stack - 0x59841E54b680B6844BcCac30eaB05a39Fb9219Ad
// token - 0x7d5Bdd082eDb9cbea402fDE1c53b1a708Fbb236D
