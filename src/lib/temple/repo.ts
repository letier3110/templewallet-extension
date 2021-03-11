import Dexie from "dexie";

export enum Table {
  AccountTokens = "accountTokens",
  Tokens = "tokens",
}

export const db = new Dexie("TempleMain");
db.version(1).stores({
  [Table.AccountTokens]: indexes(
    "chainId",
    "accountPkh",
    "contractAddress",
    "[contractAddress+tokenId]",
    "collectible",
    "status",
    "[chainId+accountPkh+collectible+status]",
    "latestBalance"
  ),
  [Table.Tokens]: indexes("[contractAddress+tokenId]", "standard"),
});

export const accountTokens = db.table<IAccountToken, number>(
  Table.AccountTokens
);
export const tokens = db.table<IToken, number>(Table.Tokens);

export interface IAccountToken {
  chainId: string;
  accountPkh: string;
  contractAddress: string;
  tokenId: number;
  collectible: boolean;
  status: ITokenStatus;
  latestBalance: number;
}

export interface IToken {
  contractAddress: string;
  tokenId: number;
  standard: ITokenStandard;
  metadata: ITokenMetadata;
}

export enum ITokenStandard {
  FA1_2 = "FA1.2",
  FA2 = "FA2",
}

export enum ITokenStatus {
  Main = "MAIN",
  Hidden = "HIDDEN",
  Removed = "REMOVED",
}

export type ITokenMetadata = Record<string, any> & {
  decimals: number;
  symbol?: string;
  name?: string;
};

export function getFungibleMetadata(metadata: ITokenMetadata) {
  return {
    decimals: metadata.decimals,
    symbol: metadata.symbol || "???",
    name: metadata.name || "Unknown token",
    thumbnailUri: metadata.thumbnailUri || "DEFAULT_TOKEN_LOGO",
  };
}

export function isTokenCollectible(metadata: ITokenMetadata) {
  return metadata.decimals === 0 && Boolean(metadata.artifactUri);
}

function indexes(...items: string[]) {
  return items.join(",");
}

// const kek = {
//   name: "Chaotic structures no. 1",
//   description: "",
//   tags: ["chaosstructureprocedural"],
//   symbol: "OBJKT",
//   artifactUri: "ipfs://QmVEKUn3MwPdWAhKcQKvTTG4WFUVLa3MxBwKyif9VpSKz2",
//   creators: ["tz1du4E9rp73CNNcjh3tbXNX8GLRoTFR1WjP"],
//   formats: [
//     {
//       uri: "ipfs://QmVEKUn3MwPdWAhKcQKvTTG4WFUVLa3MxBwKyif9VpSKz2",
//       mimeType: "image/png",
//     },
//   ],
//   thumbnailUri: "ipfs://QmNrhZHUaEqxhyLfqoq1mtHSipkWHeT31LNHb1QEbDHgnc",
//   decimals: 0,
//   isBooleanAmount: false,
//   shouldPreferSymbol: false,
// };
