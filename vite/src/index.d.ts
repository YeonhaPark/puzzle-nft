interface Window {
  ethereum: ethers.ContractRunner;
}

interface Metadata {
  name: string;
  image: string;
  description: string;
}

interface OceanNftMetadata extends Metadata {
  tokenId: number;
  amount: number;
}
