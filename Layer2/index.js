
const valid_methods = [0, 1, 2, 3];
const LAYER_NUMBER = 2;
const layer1 = require("../Layer1");
const last_layers = {
  "1": layer1
}
const method_codes = {
  comment: "0",
  reply: "1",
  clap: "2",
  report: "3"
}
const formats = {
  plain: require("./formats/plain"),
  gzip: require("./formats/gzip")
}
function encode(method, format, params, callback) {
  switch (method) {
    case "comment": {
      if (!params.key || !params.text) {
        callback(new Error("Mismatch params!"));

        return;
      }
    } break;
    case "reply": {
      if (!params.key || !params.text) {
        callback(new Error("Mismatch params!"));

        return;
      }
    } break;
    case "clap": {
      if (!params.key) {
        callback(new Error("Mismatch params!"));

        return;
      }
    } break;
    case "report": {
      if (!params.key || !params.text) {
        callback(new Error("Mismatch params!"));

        return;
      }
    } break;
    default: {
      callback(new Error("Mismatch method!"));

      return;
    }
  }
  let message = [method_codes[method], JSON.stringify(params)].join(" ");
  if (!formats[format]) {
    callback(new Error(`Format ${format} not supported.`));

    return;
  }
  formats[format].encode(message, (err, formattedMessage) => {
    if (err) {
      callback(err);

      return;
    }
    const op = new Buffer(`koalament 2 ${format} ${formattedMessage}`).toString("hex");
    callback(undefined, op);
  })
}

function decode(input, callback) {
  if (!input) {
    callback(new Error(`Unknown input ${input}`));

    return;
  }
  if (input === "") {
    callback(new Error(`Empty input ${input}`));

    return;
  }
  if (input.trim() === "") {
    callback(new Error(`Empty input ${format}`));

    return;
  }
  let splitted = input.split(" ");
  const layer = splitted.shift();
  if (parseInt(layer) > parseInt(LAYER_NUMBER)) {
    callback(new Error(`Layer is not supported.`));

    return;
  } if (parseInt(layer) < parseInt(LAYER_NUMBER)) {
    last_layers[layer].decode(input, callback);

    return;
  }
  const format = splitted.shift();
  if (["plain", "gzip"].indexOf(format) === -1) {
    callback(new Error(`Unknown format ${format}`));

    return;
  }

  formats[format].decode(splitted.pop(), (err, data) => {
    if (err) {
      console.log(err);
      callback(err);

      return;
    }
    splitted = data.split(" ");
    const method = parseInt(splitted.shift());
    if (valid_methods.indexOf(method) === -1) {
      console.log(`Unknown method ${method}`);
      callback(new Error(`Unknown method ${method}`));

      return;
    }
    const json = JSON.parse(splitted.join(" "));
    switch (method) {
      case 0: {
        if (json.key && json.text) {
          callback(undefined, { ...{ _method: method, _layer: parseInt(layer) }, ...json });

          return;
        }
        callback(new Error(`No pass required data! ${JSON.stringify(json)}`))
      }; break;
      case 1: {
        if (json.key && json.text) {
          callback(undefined, { ...{ _method: method, _layer: parseInt(layer) }, ...json });

          return;
        }
        callback(new Error(`No pass required data! ${JSON.stringify(json)}`))
      }; break;
      case 2: {
        if (json.key) {
          callback(undefined, { ...{ _method: method, _layer: parseInt(layer) }, ...json });

          return;
        }
        callback(new Error(`No pass required data! ${JSON.stringify(json)}`))
      }; break;
      case 3: {
        if (json.key) {
          callback(undefined, { ...{ _method: method, _layer: parseInt(layer) }, ...json });

          return;
        }
        callback(new Error(`No pass required data! ${JSON.stringify(json)}`))
      }; break;
      default: {
        callback(new Error(`Unknown method ${method}`))
      }
    }
  });
}

function toLayer(data, layer) {
  if (layer > LAYER_NUMBER) {
    return undefined;
  }
  //Layer 1 does not support other methods else 0 [ comment ]
  if (layer === 1 && data._method > 0) {
    return undefined;
  }
  if (layer === 1 && data._method === 0) {
    const newData = { ...data };
    newData._layer = 1;

    return newData;
  }
  return data;
}
module.exports = {
  encode: encode,
  decode: decode,
  toLayer: toLayer
}