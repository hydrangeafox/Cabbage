# Preparation

本拡張機能は現時点で Mozilla の審査を通過していない。
また現状、審査を依頼する予定もない...
このため、今回も開発者向けの「抜け道」を利用することとする。

まずは、本プロジェクトの内容を端末にコピーしよう。
もちろん、[Git][] をお使いの方はいつも通りクローンすればよい。

[Git]: https://git-scm.com

1. (任意のブラウザで)本プロジェクトの[トップページ][Top]を開く
2. ページ上部にある緑の **Code** ボタンを押す
3. ポップオーバー最下部の **Download ZIP** を選択する
4. ダウンロードしたファイルを展開する

[Top]: https://github.com/hydrangeafox/Cabbage

次は Firefox にこの拡張機能を[読み込ませて][Temporal install]みよう。

[Temporal install]: https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/

1. 新規タブを開きロケーションバーに `about:debugging` と入力する
2. **この Firefox** と表示されたリンクをたどる
3. **一時的なアドオンを読み込む...** ボタンを押す
4. 先程展開したフォルダから `firefox/manifest.json` を選択する

> [!IMPORTANT]
> この「抜け道」は一時的に拡張機能を読み込むための手段である。
> つまり Firefox を再起動したらブラウザは本拡張機能のことなど忘れてしまう。
> この場合、本拡張機能を使いたければ上記操作も再実行する必要がある。

以上で Firefox に本拡張機能を読み込ませることができた。
[次章](./Usage.md)では本拡張機能の基本的な使い方を説明していこう。
