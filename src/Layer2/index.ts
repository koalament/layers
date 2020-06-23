import { ILayer } from "../../types/layer";
import { TEXT_FORMAT, IFormatter } from "../../types/formats";
import { PlainFormatter } from "./formats/plain";
import { GzipFormatter } from "./formats/gzip";
import { LAYER1, ILayer1Params } from "../Layer1";

export interface ILayer2Params {
  nick_name?: string;
  key: string;
  text: string;
  _method: number;
}
export class LAYER2 implements ILayer<ILayer2Params, ILayer1Params> {
  private readonly LAYER_NUMBER: number = 2;
  private readonly VALID_METHODS: number[] = [0, 1, 2, 3];
  private readonly LastLayers: { [key: number]: ILayer<ILayer1Params, any> } = { 1: new LAYER1() };
  private readonly METHOD_CODES: { [key: string]: string } = {
    comment: "0",
    reply: "1",
    clap: "2",
    boo: "3",
    report: "4"
  };
  private readonly formats: { [key: string]: IFormatter } = { plain: new PlainFormatter(), gzip: new GzipFormatter() };

  public encode(method: string, format: TEXT_FORMAT, params: { [key: string]: any }, callback: (err: Error, encoded?: string) => void): void {
    switch (method) {
      case "comment": {
        if (!params.key || !params.text) {
          callback(new Error("Mismatch params!"));

          return;
        }
      } break;
      case "reply": {
        if (!params.key || !params.text) {
          callback(new Error("Mismatch params!"));

          return;
        }
      } break;
      case "clap": {
        if (!params.key) {
          callback(new Error("Mismatch params!"));

          return;
        }
      } break;
      case "boo": {
        if (!params.key) {
          callback(new Error("Mismatch params!"));

          return;
        }
      } break;
      case "report": {
        if (!params.key || !params.text) {
          callback(new Error("Mismatch params!"));

          return;
        }
      } break;
      default: {
        callback(new Error("Mismatch method!"));

        return;
      }
    }
    const message: string = [this.METHOD_CODES[method], JSON.stringify(params)].join(" ");
    if (!this.formats[format]) {
      callback(new Error(`Format ${format} not supported.`));

      return;
    }
    this.formats[format].encode(message, (err: Error, formattedMessage: string) => {
      if (err) {
        callback(err);

        return;
      }
      const op: string = Buffer.from(`koalament 2 ${format} ${formattedMessage}`).toString("hex");
      callback(undefined, op);
    });
  }

  public decode(input: string, callback: (err: Error, decoded?: { [key: string]: any }) => void): void {
    if (!input) {
      callback(new Error(`Unknown input ${input}`));

      return;
    }
    if (input === "") {
      callback(new Error(`Empty input ${input}`));

      return;
    }
    let splitted: string[] = input.split(" ");
    const layer: number = parseInt(splitted.shift(), 10);
    if (layer > this.LAYER_NUMBER) {
      callback(new Error("Layer is not supported."));

      return;
    }
    if (layer < this.LAYER_NUMBER) {
      this.LastLayers[layer].decode(input, callback);

      return;
    }
    const format: string = splitted.shift();
    if (["plain", "gzip"].indexOf(format) === -1) {
      callback(new Error(`Unknown format ${format}`));

      return;
    }

    this.formats[format].decode(splitted.pop(), (err: Error, data: string) => {
      if (err) {
        console.log(err);
        callback(err);

        return;
      }
      splitted = data.split(" ");
      const method: number = parseInt(splitted.shift(), 10);
      if (this.VALID_METHODS.indexOf(method) === -1) {
        console.log(`Unknown method ${method}`);
        callback(new Error(`Unknown method ${method}`));

        return;
      }
      const json: ILayer2Params = JSON.parse(splitted.join(" ")) as ILayer2Params;
      switch (method) {
        case 0: {
          if (json.key && json.text) {
            callback(undefined, { ...{ _method: method, _layer: layer }, ...json });

            return;
          }
          callback(new Error(`No pass required data! ${JSON.stringify(json)}`));
        } break;
        case 1: {
          if (json.key && json.text) {
            callback(undefined, { ...{ _method: method, _layer: layer }, ...json });

            return;
          }
          callback(new Error(`No pass required data! ${JSON.stringify(json)}`));
        } break;
        case 2: {
          if (json.key) {
            callback(undefined, { ...{ _method: method, _layer: layer }, ...json });

            return;
          }
          callback(new Error(`No pass required data! ${JSON.stringify(json)}`));
        } break;
        case 3: {
          if (json.key) {
            callback(undefined, { ...{ _method: method, _layer: layer }, ...json });

            return;
          }
          callback(new Error(`No pass required data! ${JSON.stringify(json)}`));
        } break;
        default: {
          callback(new Error(`Unknown method ${method}`));
        }
      }
    });
  }

  public downgrade(data: ILayer2Params, layer: number): ILayer1Params {
    if (layer > this.LAYER_NUMBER) {
      return undefined;
    }
    //Layer 1 does not support other methods else 0 [ comment ]
    if (layer === 1) {
      if (data._method > 0) {
        return undefined;
      }
      if (data._method === 0) {
        const newData: ILayer1Params = { ...data, ...{ _layer: 1 } };

        return newData;
      }

      return undefined;
    }
    const newData: ILayer2Params = { ...data, ...{ _layer: 2 } };

    return newData;
  }
}
