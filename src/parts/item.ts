
import { MyDisplay } from "../core/myDisplay";
import { Color } from "three/src/math/Color";
import { Util } from "../libs/util";
import { Conf } from "../core/conf";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _id:number;
  private _p:HTMLElement;
  private _nowPClass:string;
  private _isPositive:boolean = false;

  constructor(opt:{el:HTMLElement; id:number}) {
    super(opt)

    this._id = opt.id;

    let txt;
    if(~~(this._id / 9) % 2 == 0) {
      txt = 'POSITIVE,'.split('')[this._id % 9];
      this._isPositive = true;
    } else {
      txt = 'NEGATIVE,'.split('')[this._id % 9];
    }

    // 選択したとき用のスタイルの追加
    const colA = new Color(0xff0000);
    const colB = new Color(0xffff00);
    const rad = Util.instance.radian(Util.instance.map(this._id, 0, 360 * 2, 0, Conf.instance.NUM - 1));
    let col = colA.lerp(colB, Util.instance.map(Math.sin(rad), 0, 1, -1, 1));
    let styleCol:String = col.getStyle();

    col = new Color(1 - col.r, 1 - col.g, 1 - col.b);
    let styleCol2:String = col.getStyle();
    const sheets = document.styleSheets
    const sheet = sheets[sheets.length - 1];
    sheet.insertRule(
      '.item-' + this._id + '::selection { color: ' + styleCol + '; background: ' + styleCol2 + ' }',
      sheet.cssRules.length
    );

    this._nowPClass = 'item-' + this._id
    this._p = this.qs('p')

    // const txt = Util.instance.randomArr('ABCDEFGHIKLMNOPRSTUVWXYZ0123456789'.split(''));

    this._p.innerHTML = txt;
    if(this._isPositive) this._p.classList.add(this._nowPClass);

    this.css(this._p, {
      color: '#222',
      fontSize: '36px',
    })
  }


  protected _update(): void {
    super._update();

    if(this._isPositive) {
      this._p.classList.remove(this._nowPClass);
      this._nowPClass = 'item-' + ((this._id + this._c * 3) % Conf.instance.NUM);
      this._p.classList.add(this._nowPClass);
    }

  }
}