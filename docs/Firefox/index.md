# Firefox extension

これまでの説明は開発者コンソールの利用を前提に話を進めてきた。
この方式は単純であるものの、一般ユーザーにとって取り扱いが難しいものでもある。
そこで、より親しみやすい[ブラウザ拡張機能][Browser extensions]を試してみた。

[Browser extensions]: https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions

拡張機能は強力であり、使い方を誤ればセキュリティやプライバシー上の問題が発生する。
そのため、拡張機能を配布するにはブラウザベンダーの審査に合格する必要がある。
本拡張機能は現在未審査であり、いくつかの不具合を含んでいる。
致命的なものではないものの「無保証」ということにあらかじめ留意されたい。

## Which browser

ブラウザ拡張機能には一応の標準 [API][JavaScript APIs] が存在している。
しかし、これに完全な互換性を求めることは現実的でない。
そこで、まずは対象となる製品を限定することにした。

[JavaScript APIs]: https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API

- _Safari:_ macOS やその開発環境である Xcode と緊密に結びついていそう...
  そしてアップルの審査も厳しそう...
- _Microsoft Edge:_ 業務で使用、個人的に高評価
- _Google Chrome:_ なんか以前よりダサくなった?
  プライバシー保護は最低ランクらしい...
- _Mozilla Firefox:_ Quantum 以降安定していそうだけど、人気はイマイチ?

これらのなかでプライバシー重視といえば Safari と Firefox だろう。
よって今回は Firefox を選んでみることにした。
_macOS Catalina_ でも動作するし...

## Install Firefox

Firefox をすでにお使いの場合、この段落を読み飛ばしても構わない。
そうでない場合、まずは[最新版][Firefox]をダウンロードしてほしい。
なお App Store 版は提供されていないようだ。

初回起動時、例によって Firefox を既定のブラウザにするか尋ねてくる。
私は Safari を使い続けたいので「いいえ」を選択した。
いまいち既定のブラウザの取り戻し方がよくわからないし。

[Firefox]: https://www.mozilla.org/firefox/

次に必要なのは本拡張機能一式である。
[次章](./Preparation.md)でこれを有効にする方法を見ていこう。
