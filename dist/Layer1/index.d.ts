import { ILayer } from "../../types/layer";
import { TEXT_FORMAT } from "../../types/formats";
export interface ILayer1Params {
    key: string;
    text: string;
    _method: number;
}
export declare class LAYER1 implements ILayer<ILayer1Params, any> {
    private readonly LAYER_NUMBER;
    private readonly VALID_METHODS;
    private readonly formats;
    encode(method: string, format: TEXT_FORMAT, params: {
        [key: string]: any;
    }, callback: (err: Error, encoded?: string) => void): void;
    decode(input: string, callback: (err: Error, decoded?: {
        [key: string]: any;
    }) => void): void;
    downgrade(data: ILayer1Params, layer: number): any;
}
