const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { log, deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId;

  const box = await deploy("BoxV2", {
    from: deployer,
    log: true,
    args: [],
  });
  log(`Contract deployed at ${box.address}`);

  if (chainId != 31337) {
    await verify(box.address, []);
    log("verified........");
  }
  log("------------------------------------");
};

module.exports.tags = ["all", "boxV2"];
