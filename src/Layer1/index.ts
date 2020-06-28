import { ILayer } from "../../types/layer";
import { IFormatter } from "../../types/formats";
import { PlainFormatter } from "./formats/plain";
import { GzipFormatter } from "./formats/gzip";
import { Buffer } from "buffer";
export interface ILayer1Params {
  key: string;
  text: string;
  _method: number;
}
export class LAYER1 implements ILayer<ILayer1Params, any> {
  private readonly LAYER_NUMBER: number = 1;
  private readonly VALID_METHODS: number[] = [0];
  private readonly formats: { [key: string]: IFormatter } = { plain: new PlainFormatter(), gzip: new GzipFormatter() };

  public encode(method: string, format: "plain" | "gzip", params: { [key: string]: any }, callback: (err: Error, encoded?: string) => void): void {
    switch (method) {
      case "comment": {
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
    const message: string = ["0", JSON.stringify(params)].join(" ");
    if (!this.formats[format]) {
      callback(new Error(`Format ${format} not supported.`));

      return;
    }
    this.formats[format].encode(message, (err: Error, formattedMessage: string) => {
      if (err) {
        callback(err);

        return;
      }
      const op: string = Buffer.from(`koalament 1 ${format} ${formattedMessage}`).toString("hex");
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
    const layer: string = splitted.shift();
    if (parseInt(layer, 10) > this.LAYER_NUMBER) {
      callback(new Error("Layer is not supported."));

      return;
    }
    if (parseInt(layer, 10) < this.LAYER_NUMBER) {
      callback(new Error("Ooooooops!"));

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
      const json: ILayer1Params = JSON.parse(splitted.join(" ")) as ILayer1Params;
      switch (method) {
        case 0: {
          if (json.key && json.text) {
            callback(undefined, { ...{ _method: method, _layer: parseInt(layer, 10) }, ...json });

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

  public downgrade(data: ILayer1Params, layer: number): any {
    throw new Error("Not implemented.");
  }
}
