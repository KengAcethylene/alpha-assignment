import { IsString } from "class-validator";

export class GetAddressValueDTO {
    @IsString()
    address: string;
}