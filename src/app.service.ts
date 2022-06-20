import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosError } from "axios";
import { BigNumber } from "ethers";
import { formatEther, getAddress } from "ethers/lib/utils";

type EtherscanResponse = {
  status: number,
  message: string,
  result: string,
};

type PriceResponse = {
  ethereum: {
    usd: number;
  };
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getAddressValue(address: string): Promise<object> {
    try {
      const formatedAddress = getAddress(address);
      const ethReponse = await axios.get<EtherscanResponse>(`https://api.etherscan.io/api?module=account&action=balance&address=${formatedAddress}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`);
      const { result } = ethReponse.data;
      const priceResponse = await axios.get<PriceResponse>('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const price = priceResponse.data.ethereum.usd;
      const priceInWei = BigNumber.from(result).div(1000).mul(price * 1000);
      const priceInUSD = formatEther(priceInWei);
      return { usd: parseFloat(priceInUSD).toFixed(2) };
    }
    catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          throw new BadRequestException('invalid address');
        }
        else {
          throw new BadRequestException('something went wrong');
        }
      }
      else {
        throw new BadRequestException(err.reason);
      }
    }
  }
}
