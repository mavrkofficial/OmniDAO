import { useReadContract } from 'wagmi';
import { 
  OMNIBOND_FACTORY_ABI, 
  OMNILP_BOND_FACTORY_ABI, 
  OMNISTAKING_ABI, 
  REVENUE_SHARE_POOL_ABI, 
  OMNIDAO_POOL_ABI, 
  OMNILP_LOCKER_ABI 
} from '../contracts/abis';

// Contract addresses
const CONTRACTS = {
  OMNIBOND_FACTORY: '0x65ED3e98679151883b8f7133B92914479a6195Bd',
  OMNILP_BOND_FACTORY: '0x095E8B66AE25cC36C1e7E83FE623Dd4Dd45ab48B',
  OMNISTAKING: '0x59F6186B2075977bfDf1a84806374D7aCFAcf314',
  REVENUE_SHARE_POOL: '0x1A73Fa2F57c992cF86EF1621C95f940504F970e7',
  OMNIDAO_POOL: '0xc7016B8535a343C0BCd9EaD3e3afCed122de8B2F',
  OMNILP_LOCKER: '0xE9Ec161362aB807b2D57Aa528C2cCD4da0af4aF8'
} as const;

export const useOmniData = () => {
  // Bond counters
  const { data: bondCounter, isLoading: bondLoading } = useReadContract({
    address: CONTRACTS.OMNIBOND_FACTORY as `0x${string}`,
    abi: OMNIBOND_FACTORY_ABI,
    functionName: 'bondCounter',
  });

  const { data: lpBondCounter, isLoading: lpBondLoading } = useReadContract({
    address: CONTRACTS.OMNILP_BOND_FACTORY as `0x${string}`,
    abi: OMNILP_BOND_FACTORY_ABI,
    functionName: 'bondCounter',
  });

  // Staking data
  const { data: totalStaked, isLoading: stakingLoading } = useReadContract({
    address: CONTRACTS.OMNISTAKING as `0x${string}`,
    abi: OMNISTAKING_ABI,
    functionName: 'getTotalStaked',
  });

  // Revenue pool
  const { data: revenuePoolBalance, isLoading: revenueLoading } = useReadContract({
    address: CONTRACTS.REVENUE_SHARE_POOL as `0x${string}`,
    abi: REVENUE_SHARE_POOL_ABI,
    functionName: 'getContractBalance',
  });

  // DAO proposals
  const { data: proposalCounter, isLoading: proposalLoading } = useReadContract({
    address: CONTRACTS.OMNIDAO_POOL as `0x${string}`,
    abi: OMNIDAO_POOL_ABI,
    functionName: 'proposalCounter',
  });

  // LP Locker (placeholder for now)
  const { isLoading: lpLockerLoading } = useReadContract({
    address: CONTRACTS.OMNILP_LOCKER as `0x${string}`,
    abi: OMNILP_LOCKER_ABI,
    functionName: 'totalSupply',
  });

  // Calculate total bonds
  const totalBonds = (bondCounter || 0n) + (lpBondCounter || 0n);

  // Format data
  const formatNumber = (value: bigint | undefined) => {
    if (!value) return '0';
    return value.toString();
  };

  const formatCurrency = (value: bigint | undefined) => {
    if (!value) return '$0';
    // Convert from wei to ETH (assuming 18 decimals)
    const ethValue = Number(value) / Math.pow(10, 18);
    return `$${ethValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const isLoading = bondLoading || lpBondLoading || stakingLoading || revenueLoading || proposalLoading || lpLockerLoading;

  return {
    // Row 1
    totalValueLocked: '$1,250,000', // Placeholder - will need complex LP calculation
    omniTokenPrice: '$0.0005', // Placeholder - will use DexScreener API
    bondsCreated: formatNumber(totalBonds),
    
    // Row 2
    totalStaked: formatNumber(totalStaked),
    stakingRevenuePool: formatCurrency(revenuePoolBalance),
    daoProposals: formatNumber(proposalCounter),
    
    isLoading
  };
}; 