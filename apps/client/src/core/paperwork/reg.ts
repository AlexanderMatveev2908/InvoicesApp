import { OrNone } from '../../common/types/general';
import { LibShape } from '../lib/data_structures/shape';

export class Reg {
  public static readonly TXT: RegExp =
    /^[\p{L}\p{N}\s'.?!;,"\-\p{Emoji}\p{Extended_Pictographic}\p{Emoji}]*$/u;

  public static readonly EMOJI: RegExp =
    /^\s*(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji})/u;
  public static readonly INT: RegExp = /^\d+$/;

  public static check(arg: OrNone<string>, reg: RegExp): boolean {
    return LibShape.hasText(arg) && reg.test(arg as string);
  }

  public static isInt(arg: OrNone<string>): boolean {
    return this.check(arg, this.INT);
  }
}
