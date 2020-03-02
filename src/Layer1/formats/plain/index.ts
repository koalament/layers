import { IFormatter } from "../../../../types/formats";
export class PlainFormatter implements IFormatter {
  public encode(input: string, callback: (err: Error, encoded?: string) => void): void {
    callback(undefined, input);
  }
  public decode(input: string, callback: (err: Error, decoded?: string) => void): void {
    callback(undefined, input);
  }
}
