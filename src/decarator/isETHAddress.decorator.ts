import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { getAddress } from "ethers/lib/utils";

export function isETHAddress(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isETHAddress',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    try {
                        getAddress(value);
                        return true;
                    } catch (error) {
                        return false;
                    }
                },
            },
        });
    };
}