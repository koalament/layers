# Layer 2

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

All available methods on layer 1

| method  | Code | Description            |
| ------- | ---- | ---------------------- |
| comment | 0    | create a comment       |
| reply   | 1    | reply a comment        |
| clap    | 2    | clapping for a comment |
| report  | 3    | reporting a comment    |

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

#### reply params

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| key       | String | yes      | transaction id of parent comment |
| text      | String | yes      | The reply to the comment         |

#### Examples

---

- reply "Just now!" on c5e8ec531021f49087c5624ecc4b10a5ca56eb5034a644df7615db039a7c0e87 comment in Gzip format

`hex('koalament 2 gzip' base64(gzip('1 {"key":"c5e8ec531021f49087c5624ecc4b10a5ca56eb5034a644df7615db039a7c0e87", "text":"Just now!"}')))`

6b6f616c616d656e74203220677a6970204834734941414141414141414177334d797732414d41674130465755737765773049394475414f6c4e4446656539415964396333774b507067644e76324d4445733573457770553646387a4a4a4b37735a6c774a5655776c6568554d724a47353952524a577356514e426c365472444138477638303336597a2f422b6c6c647a5a6c73414141413d

#### clapping params

| Parameter | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| key       | String | yes      | transaction id of clapped comment |

#### Examples

---

- clap for the c5e8ec531021f49087c5624ecc4b10a5ca56eb5034a644df7615db039a7c0e87 comment in Gzip format

`hex('koalament 2 gzip' base64(gzip('2 {"key":"98aa1bc29ed38626fbcec22436350e1b8e865752f41f3832c37f4349061a4843"}')))`

6b6f616c616d656e74203220677a69702048347349414141414141414141775842305132414d4167467746554d4578516570645274576f51664a7a44473362325434365537487a70702b6c713851325a6563424f7248526b69436b4e7679647654725938757056787753474355516d637a58756f4b2b6e36776b416d395441414141413d3d

#### boo params

| Parameter | Type   | Required | Description                   |
| --------- | ------ | -------- | ----------------------------- |
| key       | String | yes      | transaction id of boo comment |

#### Examples

---

- boo for the c5e8ec531021f49087c5624ecc4b10a5ca56eb5034a644df7615db039a7c0e87 comment in Gzip format

`hex('koalament 2 gzip' base64(gzip('3 {"key":"98aa1bc29ed38626fbcec22436350e1b8e865752f41f3832c37f4349061a4843"}')))`

6b6f616c616d656e74203220677a69702048347349414141414141414141775842305132414d4167467746554d4578516570645274576f51664a7a44473362325434365537487a70702b6c713851325a6563424f7248526b69436b4e7679647654725938757056787753474355516d637a58756f4b2b6e36776b416d395441414141413d3d

#### report params

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| key       | String | yes      | transaction id of reported comment |
| text      | String | yes      | The reported text                  |

#### Examples

---

- report the c5e8ec531021f49087c5624ecc4b10a5ca56eb5034a644df7615db039a7c0e87 comment in Gzip format

`hex('koalament 2 gzip' base64(gzip('4 {"key":"bac382e9fb50f54eb06e10bce78d05e1836fe05859f576977e189155501871c7", text:"Your comment has been reported."}')))`

6b6f616c616d656e74203220677a6970204834734941414141414141414177334d515172434d424146304b75455759744d6a4a4f5a65424f58546671444947306b526c434b64322b33622f4743322b694a4839306f5479585942616c6d345370585a4937776e4176555a685a344337474378535256305a685544307065524e69622b714a306f6f48764f4b5a372b33525832724a67486534787656304756746678616e316750744e2f42314758544d353141414141

#### Note that it is better to use gzip format for long comments ( It doesn't make sense for short comments)
