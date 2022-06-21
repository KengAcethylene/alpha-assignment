import { BadRequestException, HttpException, Injectable, UnprocessableEntityException } from '@nestjs/common';
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
      const [ethReponse, priceResponse] = await Promise.all([axios.get<EtherscanResponse>(`https://api.etherscan.io/api`, {
        params: {
          module: 'account',
          action: 'balance',
          address: formatedAddress,
          tag: 'latest',
          apikey: process.env.ETHERSCAN_API_KEY
        }
      }), axios.get<PriceResponse>('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'ethereum',
          vs_currencies: 'usd'
        }
      })]);

      const { result } = ethReponse.data;
      const price = priceResponse.data.ethereum.usd;
      const priceInWei = BigNumber.from(result).div(1000).mul(price * 1000);
      const priceInUSD = formatEther(priceInWei);
      return { usd: parseFloat(priceInUSD).toFixed(2) };
    } catch (error) {
      throw new HttpException('Something went wrong.', error.reponse.status || 400);
    }
  }
}
