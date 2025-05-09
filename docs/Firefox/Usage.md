# Usage

準備ができたところで、記事の収集に取り掛かっていこう。
以下、説明は長いものの基本的に難しい操作はない。

## Sidebar

本拡張機能を有効にするとブラウザにサイドバーが表示される。
サイドバーは以下の要素から構成されている。

- **残数スライダー:** 連続収集可能な記事の残数を表示・設定
- **開始・一時停止ボタン:** 自動収集の開始と一時停止(トグル動作)
- **ステータス領域:** 自動収集の動作状況や注意事項を表示
- **収集履歴:** 収集した記事の表題や発生したエラーを一覧表示(降順)

ということで、自動収集の操作方法についてみていくことにする。

> [!TIP]
> サイドバーは &times; ボタンで閉じることができる。
> もう一度サイドバーを開くには、ツールバー上の本拡張機能アイコンをクリックする。

## Step 0

コンテンツを収集する前に **専用の** ダウンロードフォルダを作成しておこう。
これは、通常利用と自動取集でダウンロードフォルダを切り替えていく作戦である。

本拡張機能はブラウザ指定のダウンロードフォルダに収集物を保存していく。
つまり、何もしないと他のサイトの物件と今回の収集物がごちゃ混ぜになってしまう。
これは望むべき姿ではないだろう。

1. メニューバーより **Firefox** > **設定** を選ぶ
2. _ファイルとプログラム_ > _ダウンロード_ セクションまでスクロールする
3. **選択...** ボタンを押す
4. ファイルダイアログの **New Folder** ボタンにて適当なフォルダを作成する  
   (例: `Downloads/blog.example.jp`)
5. 前項で作成したフォルダを選択し **Open** ボタンを押す

_macOS_ では今回作成したフォルダを _Dock_ に登録しておくとよい。
記事本文の保存時、このフォルダからファイルがジャンプする様子がみられる。

## Step 1

記事収集の第一歩は収集範囲の最初の記事へ移動することである。
通常通り、ブラウザのロケーションバーに入力したりリンクをたどっていけばよい。

## Step 2

残数スライダーの値を確認し、必要に応じて変更する。
本拡張機能がこの設定値を超えて記事をたどり続けることはない。
要するに、この残数設定は一種の安全装置として機能するものである。

- 現在のところ一回の操作で収集可能な記事の上限は 20 である
- ユーザーは自動取集中にこの値を変更することができる  
  (タイミング的な問題があるため推奨するものではない)

## Step 3

収集の準備が整ったら **Start** ボタンを押す。

- ボタンの表示が **Pause** へと変化する  
  このボタンを押すか残数をゼロにすると収集の停止を **予約** する。
  そして次の記事へ移動したときこれらの値が「停止」なら収集を打ち切る。
- 前半フェーズでは記事本文とそのメタ情報を収集する  
  この工程はユーザーのページ操作をシミュレートしている。
  例えばアルバム情報の収集時、適当なタイミングで「次の写真」ボタンを押している。
- 後半フェーズは前半の情報からアルバム写真や動画をダウンロードする  
  このとき、進捗状況が記事左上とステータス領域に表示される。
- ひとつの記事の収集が終わると自動的に次の記事へ移動する  
  これにより残数カウンタがひとつだけ減算される。
  また、[収集履歴](#sidebar)に今回の記事の表題が挿入される。
- ページ遷移後、4 秒間待機する  
  コンテンツを読み込み終えるまで、おおよその時間を設定している。

> [!WARNING]
> 自動収集の動作中、ブラウザの手動操作は禁物である。
> もちろん、表示中のページの操作もだめである。
>
> なぜなのか?
> 例えば、自動収集中に新規タブを開いたとしよう。
> この場合、本拡張機能は新しいタブに対して操作を行ってしまうことになる。
>
> もちろん、このような制限なんてあまりカッコいいものではない。
> 将来的には解消すべきものだが...
> 要望があればというところだろう。

## Step 4

残数がゼロになるか最新の記事に到達すると自動収集を停止する。

- サイドバーのボタン表示が **Start** に戻る
- 残数が 20 へとリセットされる
- 通知センターへ停止または完了メッセージが送信される

## Step 5

次の 20 件の収集を再開する。

1. ウェブページ内の「次の記事」リンクをたどる  
   (現在表示中の記事の重複収集を避けるため)
2. [Step 2](#step-2) 以降の操作を繰り返す

現状では「次の記事」をたどる操作が手動である。
これもそのうちなんとかしたい...

[次章](./Downloaded.md)では[専用フォルダ](#step-0)の構成についてみていく。
