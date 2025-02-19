# Quick start

このプロジェクトの動作について、実例を交えながら説明していく。
何ができるのか、感触をつかむには手っ取り早い方法である。

## Structure

本プロジェクトは以下のような構造を持つ架空のサイトを念頭に設計されている。

- 日本旅行記 (`https://travelers.example.jp`)
    - 北海道周遊旅 (`/articles/387`)
        - 概要文
        - 夏の富良野 (`#section-2938`)
            - 概要文
            - ラベンダーの写真 (ゼロ枚以上)
        - 夜の小樽 (`#section-2939`)
            - 概要文
            - 街並みの写真 (ゼロ枚以上)
        - 駅の風景 (`section-2941`)
            - はまなす編成の動画 (ゼロまたは一本)
    - 大阪裏路地時短旅 (`/articles/415`)
        - 概要文
        - 新大阪駅周辺 (`#section-3028`)
            - 概要文
            - 動画 (ゼロまたは一本)
        - 天王寺公園 (`#section-3029`)
            - 写真 (ゼロ枚以上)

...内容はともかく、以下のような構造を持っていることが分かる。

- ひとつのブログは多数の **記事** で構成される
- ひとつの記事は表題や概要文と複数の **セクション** で構成される
- ひとつのセクションは表題や概要文と画像・動画で構成される
    - 画像はゼロ枚以上
    - 動画はゼロまたは一本

なお、記事とそこに含まれるセクションには固有の ID が割り当てられている。
そして、それらの ID は単純な整数として表現できるものでもある。

## Planning

本プロジェクトでは記事データをいくつかの期間に区切って収集することにした。
この方式の主な利点を次に挙げる。

- [収集結果ファイル](./Aggregate.md)を扱いやすい大きさに分割
- [ブラウザ内部領域][localStorage]の容量制限回避(ドメインごと)
- [クッキー消費期限](./Capture.md#cookie)問題回避

[localStorage]: https://developer.mozilla.org/docs/Web/API/Window/localStorage

最初の提案方式はブログの[記事一覧](./Crawl.md)ページを使う方法である。
この方式では複数の記事を一回の操作で回収できるため便利である。

二番目の方式は年・四半期・月といった単位で分割していくものである。
上記「賞味期限問題」もあるため、ある程度小さめの単位がよいかもしれない。
特に「お試し版」で感触をつかむなら数件の記事からはじめてみるとよい。
もちろん、以下のように不均一な分割も可能だ。

- 2023年上期: 6か月分
- 2023年7月...9月: 3か月分
- 2023年10月...12月: 同上
- 2024年(通期): 12か月分

分割範囲を **記事番号で特定** したら、各始点・終点をどこかに書き留めておく。

> [!IMPORTANT]
> 記事の並べ替え順は **記事番号や作成日時の降順** に設定しておく。
> そうしなかった場合(たとえば更新日時順)どうなるか?
> 誰かが記事にコメントを付けただけで全体の順番が変わってしまうのだ!
> この結果、必要な記事が抜け落ちたり同じ記事を二回辿る羽目になる...

## DevTools

本プロジェクトは各ブラウザに付属する開発者(JavaScript)コンソールを利用する。
_Chromium_ 系ブラウザでは DevTools(Developer Tools) としてお馴染みだろう。
ということで、本節ではコンソールの開き方を覚えておこう。

本文書では以下に挙げる二種のブラウザについて取り上げる
(コンソールは開発者向けであり、モバイル機器は残念ながら対象外である)
ただし、動作確認を行なっているのは前者のみである。
また、以降の説明も前者を対象に記述している
(個人情報保護の観点ではやはり Safari が優位だろう)

- Safari 15.5 (Mac)
- Microsoft Edge (Windows)

Microsoft Edge で [DevTools][] を開くのは簡単である。
とりあえず `F12` キーを押す &mdash; たったこれだけである。

[DevTools]: https://learn.microsoft.com/microsoft-edge/devtools-guide-chromium/landing/

一方 Safari ではちょっとした事前設定が必要になる。

1. メニューバーから [Safari] > [環境設定...] を選ぶ
2. [詳細] タブで「メニューバーに"開発"メニューを表示」をオンにする
3. メニューバーから [開発] > [JavaScript コンソールを表示] を選ぶ:  
   または `Command+Option+C` を押す。

無事、開発者コンソールが開いたらひと通り設定を見回してみよう
(もちろん既定値のままでも構わない)

- ドッキング位置: 下部配置が便利  
  記事のモバイルレイアウト化を避け、コードの不自然な折返しもない。
- 一般 > 行の折り返し: 「エディタの幅にあわせて行を折り返す」をオンに  
  コードが長くなってもうっとおしい横スクロールが不要。

> [!WARNING]
> 開発者コンソールで実行するプログラムは相応のアクセス権限を持つ。
> これは、ログインユーザーの個人情報にもアクセスできるようなものである。
> 要するに、出所不明なコードを **促されるまま** 入力してはいけないのだ
> (還付金詐欺同様の手口)
> そのコードが何を意味しているのか、ざっくりとでも理解しておこう
> (それが分かれば苦労しないよ)

## Flow

本節ではデータ回収作業の大まかな流れを説明する。

1. 記事(ページ)ごとのデータを内部領域に[回収](./Walk.md)  
   あるいは複数ページのデータを[区間回収](./Crawl.md)
3. 単一期間の蓄積データを[集約](./Aggregate.md)、ファイルへ保存
4. 単一期間の蓄積データから[画像](./Capture.md)を一括ダウンロード
5. 単一期間の蓄積データを[消去](./Sweep.md)、次の期間の回収作業を開始
6. 複数期間の回収データから[動画](./Downloads.md)ファイルをダウンロード
7. すべての作業が終わったら[次節](#clean-up)へ

## Clean up

開発者コンソールが当面不要なら[事前設定](#devtools)を元に戻しておく。
また[一括ダウンロード](./Downloads.md)が生成した `cabbage.tsv` も削除する。
