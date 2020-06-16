import { TEXT_FORMAT } from "../formats";

export interface ILayer<ILayerParams, ILayerLastParams> {
  encode(method: string, format: TEXT_FORMAT, params: { [key: string]: any }, callback: (err: Error, encoded?: string) => void): void;
  decode(input: string, callback: (err: Error, decoded?: { [key: string]: any }) => void): void;
  downgrade(data: ILayerParams, layer: number): ILayerLastParams;
}
