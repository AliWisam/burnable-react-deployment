/** @format */
import React from "react";
import contractObject from "./artifacts/contracts/KickStarterBurnable.sol/KickStarterBurnable.json";
const ethers = require("ethers");

const DeployBurn = () => {
  //   request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
  async function deployBurnable() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // The factory we use for deploying contracts
        const factory = new ethers.ContractFactory(
          contractObject.abi,
          contractObject.bytecode,
          signer
        );
        const creationPrice = ethers.utils.parseUnits("0.001", "ether");
        console.log(creationPrice);
        // Deploy an instance of the contract
        const contract = await factory.deploy(
          "KickStarter",
          "KickStarter",
          100000,
          "0x4fb57fc72969234afd3049a7d6db20c21ec71dfd",
          { value: creationPrice }
        );
        // await contract.deployed();
        console.log(contract.address);
        const trx = await contract.deployTransaction;
        await trx.wait();
        await contract.value();
        console.log(await contract.value());
        console.log(
          `Deployment successful! Contract Address: ${contract.address}`
        );
      } catch (err) {
        if (typeof err.error.data !== "undefined") {
          console.log("Error", err.error.message);
        }
        console.log(err);
      }
    }
  }
  return (
    <div>
      <div>
        <button type="submit" onClick={deployBurnable}>
          Deploy
        </button>
      </div>
    </div>
  );
};

export default DeployBurn;
