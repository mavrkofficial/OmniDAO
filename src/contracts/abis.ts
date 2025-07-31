// Contract ABIs for Omni DAO
export const OMNIBOND_FACTORY_ABI = [
  {
    "inputs": [],
    "name": "bondCounter",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const OMNILP_BOND_FACTORY_ABI = [
  {
    "inputs": [],
    "name": "bondCounter",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const OMNISTAKING_ABI = [
  {
    "inputs": [],
    "name": "getTotalStaked",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const REVENUE_SHARE_POOL_ABI = [
  {
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const OMNIDAO_POOL_ABI = [
  {
    "inputs": [],
    "name": "proposalCounter",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const OMNILP_LOCKER_ABI = [
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const; 