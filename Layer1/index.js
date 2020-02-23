
const valid_methods = [0];
const formats = {
  plain: require("./formats/plain"),
  gzip: require("./formats/gzip")
}
const LAYER_NUMBER = "1";
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
  }
  if (parseInt(layer) < parseInt(LAYER_NUMBER)) {
    callback(new Error(`Ooooooops!`));

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
      default: {
        callback(new Error(`Unknown method ${method}`))
      }
    }
  });
}

function encode(method, format, params, callback) {
  switch (method) {
    case "comment": {
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
  let message = ["0", JSON.stringify(params)].join(" ");
  if (!formats[format]) {
    callback(new Error(`Format ${format} not supported.`));

    return;
  }
  formats[format].encode(message, (err, formattedMessage) => {
    if (err) {
      callback(err);

      return;
    }
    const op = new Buffer(`koalament 1 ${format} ${formattedMessage}`).toString("hex");
    callback(undefined, op);
  })
}

module.exports = {
  encode: encode,
  decode: decode
}