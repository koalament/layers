import { IFormatter } from "../../../../types/formats";
export declare class PlainFormatter implements IFormatter {
    encode(input: string, callback: (err: Error, encoded?: string) => void): void;
    decode(input: string, callback: (err: Error, decoded?: string) => void): void;
}
