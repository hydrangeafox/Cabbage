# Preferences

本拡張機能は特定のウェブサイトに対して設計・実装したものである。
しかしながら、設定を変更することで似たようなサイトでも動作できる可能性がある。
また、サイト側のちょっとした改修や収集項目の追加にも対応できることだろう。

このような目的のため、本拡張機能ではシンプルな[設定画面][Options]を用意した。
とはいうものの、これを操作するにはウェブ開発の知識が必要となる。
裏を返せば、一般ユーザーによる更新は推奨していない。
そのため、ここでは概要を述べるだけとした。

[Options]: https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/user_interface/Options_pages

設定画面を開くには以下の操作を行う。

1. Firefox ツールバーに表示される本拡張機能のアイコンを右クリックする
2. コンテキストメニューから **拡張機能を管理** を選ぶ
3. 表示されたページで **設定** タブを選ぶ

> [!NOTE]
> ここで設定した内容は Firefox のプロファイルを通して[同期][Sync]される...
> はずである。
> とはいっても、本拡張機能は未審査なので実際の動作は不明である。
> そもそも私自身、モバイル版 Firefox や同期機能を使っていないし...

[Sync]: https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/storage/sync
