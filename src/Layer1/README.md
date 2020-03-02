# Layer 1

#### Structure

`hex(koalament [layer=1] [format] [base64(format([method] [param])])`

| name   | Type   | Description                                                   |
| ------ | ------ | ------------------------------------------------------------- |
| layer  | Number | Layer version                                                 |
| format | String | Specifies in what format the data is stored on the blockchain |
| method | Number | Method number                                                 |
| param  | String | Stringified method needed json params                         |

### Available formats

To lower the size of the data, you can push data in different formats, but you need to specify the format number as well. Currently, available formats are plain and gzip

| Format | Description                                   |
| ------ | --------------------------------------------- |
| plain  | Return the output text same as the input text |
| gzip   | https://en.wikipedia.org/wiki/Gzip            |

### Available methods

All available methods on the layer 1

| method  | Code | Description      |
| ------- | ---- | ---------------- |
| comment | 0    | create a comment |

#### comment params

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| key       | String | yes      | URL address to commented on |
| text      | String | yes      | The comment                 |

#### Examples

---

- comment "Hi!" on http://www.koalament.io page in plain format

`hex(koalament 1 plain base64('0 {"key":"http://www.koalament.io", "text":"Hi!"}'))`

6b6f616c616d656e74203120706c61696e204d434237496d746c65534936496d6830644841364c7939336433637561323968624746745a5735304c6d6c7649697767496e526c654851694f694a496153456966513d3d

- comment "Hi!" on http://www.koalament.io page in Gzip format

`hex('koalament 1 gzip' base64(gzip('0 {"key":"http://www.koalament.io", "text":"Hi!"}')))`

6b6f616c616d656e74203120677a697020483473494141414141414141417a4e517146624b54713155736c4c4b4b436b70734e4c584c7938763138764f5438784a7a45334e4b39484c7a466653555641715361306f416172777946525571675541326f4e55555445414141413d

#### Note that it is better to use gzip format for long comments ( It doesn't make sense for short comments)
