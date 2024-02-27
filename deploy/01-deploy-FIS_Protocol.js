const { ethers, network } = require("hardhat");
require("dotenv").config();
// const { verify } = require("../utils/verify");

module.exports = async ({ deployments, getNamedAccounts }) => {
    
  const { deploy, log } = deployments;

  const FISCOIN = await deployments.get("FISCOIN");
  const FISCOINCONTRACT = await ethers.getContractAt(
    "FISCOIN",
    FISCOIN.address
  );
  const tokenAddress = FISCOIN.address;
  console.log(`token address: ${tokenAddress}`);

  log("Deploying contract........");
  const FISContract = await deploy("FISContract", {
    from: deployer,
    args: [tokenAddress],
    log: true,
  });
  log(`Contract deployed at ${FISContract.address}`);

  const FISCONTRACT = await ethers.getContractAt(
    "FISContract",
    FISContract.address
  );

  await FISCOINCONTRACT.grantRole(
    "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6",
    FISContract.address
  );
  const hasRole = await FISCOINCONTRACT.hasRole(
    "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6",
    FISContract.address
  );
  console.log(hasRole);
  if (hasRole) {
    log("Role has been given........");
  }

  await FISCONTRACT.createInvestment(
    "Chicken Farms in Nothern Nigeria",
    "In this farm we rear chickens and over time as they grow and are sold guaranteed profits are generated",
    ethers.parseEther("0.01"),
    30,
    13
  );
  await FISCONTRACT.createInvestment(
    "Micro Loan services",
    "We give out micro loans",
    ethers.parseEther("0.025"),
    40,
    15
  );

  const allInvestments = await FISCONTRACT.getAllInvestments();
  console.log(allInvestments);
};

module.exports.tags = ["all", "FIS"];
