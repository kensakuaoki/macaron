# macaron

推しグッズ交換マッチングアプリのMVPサーバーです。Node.js と Express を用いた簡易実装で、X(旧Twitter) または Instagram の OAuth 認証によるログイン、グッズ情報の登録 API を備えています。

## セットアップ

```
npm install
```

環境変数で各種 API キーを設定してからサーバーを起動します。

```
TWITTER_CONSUMER_KEY=xxxx TWITTER_CONSUMER_SECRET=xxxx \
INSTAGRAM_CLIENT_ID=xxxx INSTAGRAM_CLIENT_SECRET=xxxx \
SESSION_SECRET=secret npm start
```

`/api/items` でグッズ情報の登録と取得が可能です。

## ライセンス
このプロジェクトのソースコードは [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) ライセンスの下で公開されています。商用利用はできません。
