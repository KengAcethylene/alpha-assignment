import { IsString } from "class-validator";
import { isETHAddress } from "src/decarator/isETHAddress.decorator";

export class GetAddressValueDTO {
    @IsString()
    @isETHAddress({ message: 'invalid address' })
    address: string;
}