import {Address} from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "Sample",
    publicKey: signer.publicKey,
    initParams: {
      _nonce: locklift.utils.getRandomNonce(),
    },
    constructorParams: {
      _state: 0,
    },
    value: locklift.utils.toNano(1),
  });

  console.log(`Sample deployed at: ${sample.address.toString()}`);
}

async function testContract() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const contractAddress = "0:8791626090d87d63163fa8fcb64ada6dfa31417cbbc6c1c1d239ab01d4f1707b";

  // Load the deployed contract
  const sample = await locklift.factory.getDeployedContract(
      "Sample",
      new Address(contractAddress)
  );

  const state = await sample.methods.getDetails().call();
  console.log(`Current state: ${state._state}`);

  // const newState = 1; // Example new state
  // const tx = await sample.methods.setState({ _state: newState }).sendExternal({ publicKey: signer.publicKey });
  // console.log(`Transaction hash: ${tx.transaction.id}`);
  //
  // const updatedState = await sample.methods.getDetails().call();
  // console.log(`Updated state: ${updatedState._state}`);
}

testContract()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
