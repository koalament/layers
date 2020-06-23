import { ILayer } from "../../types/layer";
import { TEXT_FORMAT } from "../../types/formats";
import { ILayer1Params } from "../Layer1";
export interface ILayer2Params {
    key: string;
    text: string;
    _method: number;
}
export declare class LAYER2 implements ILayer<ILayer2Params, ILayer1Params> {
    private readonly LAYER_NUMBER;
    private readonly VALID_METHODS;
    private readonly LastLayers;
    private readonly METHOD_CODES;
    private readonly formats;
    encode(method: string, format: TEXT_FORMAT, params: {
        [key: string]: any;
    }, callback: (err: Error, encoded?: string) => void): void;
    decode(input: string, callback: (err: Error, decoded?: {
        [key: string]: any;
    }) => void): void;
    downgrade(data: ILayer2Params, layer: number): ILayer1Params;
}
