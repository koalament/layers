export enum TEXT_FORMAT { PLAIN = "plain", GZIP = "gzip" }

export interface IFormatter {
  encode(input: string, callback: (err: Error, encoded?: string) => void): void;
  decode(input: string, callback: (err: Error, decoded?: string) => void): void;
}