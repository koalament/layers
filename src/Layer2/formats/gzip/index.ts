import { IFormatter } from "../../../../types/formats";
import { gzip, unzip } from "../../../libs/gzip";
export class GzipFormatter implements IFormatter {
  public encode(input: string, callback: (err: Error, encoded?: string) => void): void {
    gzip(Buffer.from(input, "utf-8"))
      .then((compressed: Buffer) => {
        callback(undefined, compressed.toString("base64"));
      }).catch(callback);
  }
  public decode(input: string, callback: (err: Error, decoded?: string) => void): void {
    unzip(Buffer.from(input, "base64")).then((decompressed: Buffer) => {
      callback(undefined, decompressed.toString("utf8"));
    }).catch(callback);
  }
}
