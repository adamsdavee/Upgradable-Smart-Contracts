// This is the Manual way. Hardhat has an automatic way

const { getNamedAccounts, deployments, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const boxProx = await deployments.get("BoxProxyAdmin", deployer); // This is the proxy contract
  const boxProxyAdmin = await ethers.getContractAt(
    "BoxProxyAdmin",
    boxProx.address
  );
  const transpProx = await deployments.get("Box", deployer); // This is the implementation contract
  const transparentProxy = await ethers.getContractAt(
    "Box",
    transpProx.address
  );

  const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.target);
  const versionV1 = await proxyBoxV1.version();
  console.log(versionV1);

  const box2 = await deployments.get("BoxV2", deployer);
  const boxV2 = await ethers.getContractAt("BoxV2", box2.address);

  const upgradeTx = await boxProxyAdmin.upgrade(
    transparentProxy.target,
    boxV2.target
  );
  await upgradeTx.wait(1);

  const proxyBoxV2 = await ethers.getContractAt(
    "BoxV2",
    transparentProxy.target
  );
  const versionV2 = await proxyBoxV2.version();
  console.log(versionV2);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
