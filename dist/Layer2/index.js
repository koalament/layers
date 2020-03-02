"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var plain_1 = require("./formats/plain");
var gzip_1 = require("./formats/gzip");
var Layer1_1 = require("../Layer1");
var LAYER2 = (function () {
    function LAYER2() {
        this.LAYER_NUMBER = 2;
        this.VALID_METHODS = [0, 1, 2, 3];
        this.LastLayers = { 1: new Layer1_1.LAYER1() };
        this.METHOD_CODES = {
            comment: "0",
            reply: "1",
            clap: "2",
            report: "3"
        };
        this.formats = { plain: new plain_1.PlainFormatter(), gzip: new gzip_1.GzipFormatter() };
    }
    LAYER2.prototype.encode = function (method, format, params, callback) {
        switch (method) {
            case "comment":
                {
                    if (!params.key || !params.text) {
                        callback(new Error("Mismatch params!"));
                        return;
                    }
                }
                break;
            case "reply":
                {
                    if (!params.key || !params.text) {
                        callback(new Error("Mismatch params!"));
                        return;
                    }
                }
                break;
            case "clap":
                {
                    if (!params.key) {
                        callback(new Error("Mismatch params!"));
                        return;
                    }
                }
                break;
            case "report":
                {
                    if (!params.key || !params.text) {
                        callback(new Error("Mismatch params!"));
                        return;
                    }
                }
                break;
            default: {
                callback(new Error("Mismatch method!"));
                return;
            }
        }
        var message = [this.METHOD_CODES[method], JSON.stringify(params)].join(" ");
        if (!this.formats[format]) {
            callback(new Error("Format " + format + " not supported."));
            return;
        }
        this.formats[format].encode(message, function (err, formattedMessage) {
            if (err) {
                callback(err);
                return;
            }
            var op = Buffer.from("koalament 2 " + format + " " + formattedMessage).toString("hex");
            callback(undefined, op);
        });
    };
    LAYER2.prototype.decode = function (input, callback) {
        var _this = this;
        if (!input) {
            callback(new Error("Unknown input " + input));
            return;
        }
        if (input === "") {
            callback(new Error("Empty input " + input));
            return;
        }
        var splitted = input.split(" ");
        var layer = parseInt(splitted.shift(), 10);
        if (layer > this.LAYER_NUMBER) {
            callback(new Error("Layer is not supported."));
            return;
        }
        if (layer < this.LAYER_NUMBER) {
            this.LastLayers[layer].decode(input, callback);
            return;
        }
        var format = splitted.shift();
        if (["plain", "gzip"].indexOf(format) === -1) {
            callback(new Error("Unknown format " + format));
            return;
        }
        this.formats[format].decode(splitted.pop(), function (err, data) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            splitted = data.split(" ");
            var method = parseInt(splitted.shift(), 10);
            if (_this.VALID_METHODS.indexOf(method) === -1) {
                console.log("Unknown method " + method);
                callback(new Error("Unknown method " + method));
                return;
            }
            var json = JSON.parse(splitted.join(" "));
            switch (method) {
                case 0:
                    {
                        if (json.key && json.text) {
                            callback(undefined, __assign({ _method: method, _layer: layer }, json));
                            return;
                        }
                        callback(new Error("No pass required data! " + JSON.stringify(json)));
                    }
                    break;
                case 1:
                    {
                        if (json.key && json.text) {
                            callback(undefined, __assign({ _method: method, _layer: layer }, json));
                            return;
                        }
                        callback(new Error("No pass required data! " + JSON.stringify(json)));
                    }
                    break;
                case 2:
                    {
                        if (json.key) {
                            callback(undefined, __assign({ _method: method, _layer: layer }, json));
                            return;
                        }
                        callback(new Error("No pass required data! " + JSON.stringify(json)));
                    }
                    break;
                case 3:
                    {
                        if (json.key) {
                            callback(undefined, __assign({ _method: method, _layer: layer }, json));
                            return;
                        }
                        callback(new Error("No pass required data! " + JSON.stringify(json)));
                    }
                    break;
                default: {
                    callback(new Error("Unknown method " + method));
                }
            }
        });
    };
    LAYER2.prototype.downgrade = function (data, layer) {
        if (layer > this.LAYER_NUMBER) {
            return undefined;
        }
        if (layer === 1) {
            if (data._method > 0) {
                return undefined;
            }
            if (data._method === 0) {
                var newData_1 = __assign(__assign({}, data), { _layer: 1 });
                return newData_1;
            }
            return undefined;
        }
        var newData = __assign(__assign({}, data), { _layer: 2 });
        return newData;
    };
    return LAYER2;
}());
exports.LAYER2 = LAYER2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTGF5ZXIyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQSx5Q0FBaUQ7QUFDakQsdUNBQStDO0FBQy9DLG9DQUFrRDtBQU9sRDtJQUFBO1FBQ21CLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGtCQUFhLEdBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxlQUFVLEdBQWtELEVBQUUsQ0FBQyxFQUFFLElBQUksZUFBTSxFQUFFLEVBQUUsQ0FBQztRQUNoRixpQkFBWSxHQUE4QjtZQUN6RCxPQUFPLEVBQUUsR0FBRztZQUNaLEtBQUssRUFBRSxHQUFHO1lBQ1YsSUFBSSxFQUFFLEdBQUc7WUFDVCxNQUFNLEVBQUUsR0FBRztTQUNaLENBQUM7UUFDZSxZQUFPLEdBQWtDLEVBQUUsS0FBSyxFQUFFLElBQUksc0JBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLG9CQUFhLEVBQUUsRUFBRSxDQUFDO0lBa0t2SCxDQUFDO0lBaEtRLHVCQUFNLEdBQWIsVUFBYyxNQUFjLEVBQUUsTUFBbUIsRUFBRSxNQUE4QixFQUFFLFFBQWdEO1FBQ2pJLFFBQVEsTUFBTSxFQUFFO1lBQ2QsS0FBSyxTQUFTO2dCQUFFO29CQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTt3QkFDL0IsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzt3QkFFeEMsT0FBTztxQkFDUjtpQkFDRjtnQkFBQyxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUFFO29CQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTt3QkFDL0IsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLGtC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O29CQUNQLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxvQkFBa0IsTUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDakQ7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDBCQUFTLEdBQWhCLFVBQWlCLElBQW1CLEVBQUUsS0FBYTtRQUNqRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzdCLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRTtnQkFDcEIsT0FBTyxTQUFTLENBQUM7YUFDbEI7WUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO2dCQUN0QixJQUFNLFNBQU8seUJBQXVCLElBQUksR0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBRSxDQUFDO2dCQUU3RCxPQUFPLFNBQU8sQ0FBQzthQUNoQjtZQUVELE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBQ0QsSUFBTSxPQUFPLHlCQUF1QixJQUFJLEdBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQztRQUU3RCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUE1S0QsSUE0S0M7QUE1S1ksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF5ZXIgfSBmcm9tIFwiLi4vLi4vdHlwZXMvbGF5ZXJcIjtcbmltcG9ydCB7IFRFWFRfRk9STUFULCBJRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2Zvcm1hdHNcIjtcbmltcG9ydCB7IFBsYWluRm9ybWF0dGVyIH0gZnJvbSBcIi4vZm9ybWF0cy9wbGFpblwiO1xuaW1wb3J0IHsgR3ppcEZvcm1hdHRlciB9IGZyb20gXCIuL2Zvcm1hdHMvZ3ppcFwiO1xuaW1wb3J0IHsgTEFZRVIxLCBJTGF5ZXIxUGFyYW1zIH0gZnJvbSBcIi4uL0xheWVyMVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElMYXllcjJQYXJhbXMge1xuICBrZXk6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICBfbWV0aG9kOiBudW1iZXI7XG59XG5leHBvcnQgY2xhc3MgTEFZRVIyIGltcGxlbWVudHMgSUxheWVyPElMYXllcjJQYXJhbXMsIElMYXllcjFQYXJhbXM+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBMQVlFUl9OVU1CRVI6IG51bWJlciA9IDI7XG4gIHByaXZhdGUgcmVhZG9ubHkgVkFMSURfTUVUSE9EUzogbnVtYmVyW10gPSBbMCwgMSwgMiwgM107XG4gIHByaXZhdGUgcmVhZG9ubHkgTGFzdExheWVyczogeyBba2V5OiBudW1iZXJdOiBJTGF5ZXI8SUxheWVyMVBhcmFtcywgYW55PiB9ID0geyAxOiBuZXcgTEFZRVIxKCkgfTtcbiAgcHJpdmF0ZSByZWFkb25seSBNRVRIT0RfQ09ERVM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgY29tbWVudDogXCIwXCIsXG4gICAgcmVwbHk6IFwiMVwiLFxuICAgIGNsYXA6IFwiMlwiLFxuICAgIHJlcG9ydDogXCIzXCJcbiAgfTtcbiAgcHJpdmF0ZSByZWFkb25seSBmb3JtYXRzOiB7IFtrZXk6IHN0cmluZ106IElGb3JtYXR0ZXIgfSA9IHsgcGxhaW46IG5ldyBQbGFpbkZvcm1hdHRlcigpLCBnemlwOiBuZXcgR3ppcEZvcm1hdHRlcigpIH07XG5cbiAgcHVibGljIGVuY29kZShtZXRob2Q6IHN0cmluZywgZm9ybWF0OiBURVhUX0ZPUk1BVCwgcGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBjYWxsYmFjazogKGVycjogRXJyb3IsIGVuY29kZWQ/OiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgY2FzZSBcImNvbW1lbnRcIjoge1xuICAgICAgICBpZiAoIXBhcmFtcy5rZXkgfHwgIXBhcmFtcy50ZXh0KSB7XG4gICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKFwiTWlzbWF0Y2ggcGFyYW1zIVwiKSk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gYnJlYWs7XG4gICAgICBjYXNlIFwicmVwbHlcIjoge1xuICAgICAgICBpZiAoIXBhcmFtcy5rZXkgfHwgIXBhcmFtcy50ZXh0KSB7XG4gICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKFwiTWlzbWF0Y2ggcGFyYW1zIVwiKSk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gYnJlYWs7XG4gICAgICBjYXNlIFwiY2xhcFwiOiB7XG4gICAgICAgIGlmICghcGFyYW1zLmtleSkge1xuICAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcihcIk1pc21hdGNoIHBhcmFtcyFcIikpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGJyZWFrO1xuICAgICAgY2FzZSBcInJlcG9ydFwiOiB7XG4gICAgICAgIGlmICghcGFyYW1zLmtleSB8fCAhcGFyYW1zLnRleHQpIHtcbiAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoXCJNaXNtYXRjaCBwYXJhbXMhXCIpKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBicmVhaztcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKFwiTWlzbWF0Y2ggbWV0aG9kIVwiKSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlOiBzdHJpbmcgPSBbdGhpcy5NRVRIT0RfQ09ERVNbbWV0aG9kXSwgSlNPTi5zdHJpbmdpZnkocGFyYW1zKV0uam9pbihcIiBcIik7XG4gICAgaWYgKCF0aGlzLmZvcm1hdHNbZm9ybWF0XSkge1xuICAgICAgY2FsbGJhY2sobmV3IEVycm9yKGBGb3JtYXQgJHtmb3JtYXR9IG5vdCBzdXBwb3J0ZWQuYCkpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZm9ybWF0c1tmb3JtYXRdLmVuY29kZShtZXNzYWdlLCAoZXJyOiBFcnJvciwgZm9ybWF0dGVkTWVzc2FnZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycik7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3A6IHN0cmluZyA9IEJ1ZmZlci5mcm9tKGBrb2FsYW1lbnQgMiAke2Zvcm1hdH0gJHtmb3JtYXR0ZWRNZXNzYWdlfWApLnRvU3RyaW5nKFwiaGV4XCIpO1xuICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCBvcCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGVjb2RlKGlucHV0OiBzdHJpbmcsIGNhbGxiYWNrOiAoZXJyOiBFcnJvciwgZGVjb2RlZD86IHsgW2tleTogc3RyaW5nXTogYW55IH0pID0+IHZvaWQpOiB2b2lkIHtcbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICBjYWxsYmFjayhuZXcgRXJyb3IoYFVua25vd24gaW5wdXQgJHtpbnB1dH1gKSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlucHV0ID09PSBcIlwiKSB7XG4gICAgICBjYWxsYmFjayhuZXcgRXJyb3IoYEVtcHR5IGlucHV0ICR7aW5wdXR9YCkpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBzcGxpdHRlZDogc3RyaW5nW10gPSBpbnB1dC5zcGxpdChcIiBcIik7XG4gICAgY29uc3QgbGF5ZXI6IG51bWJlciA9IHBhcnNlSW50KHNwbGl0dGVkLnNoaWZ0KCksIDEwKTtcbiAgICBpZiAobGF5ZXIgPiB0aGlzLkxBWUVSX05VTUJFUikge1xuICAgICAgY2FsbGJhY2sobmV3IEVycm9yKFwiTGF5ZXIgaXMgbm90IHN1cHBvcnRlZC5cIikpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChsYXllciA8IHRoaXMuTEFZRVJfTlVNQkVSKSB7XG4gICAgICB0aGlzLkxhc3RMYXllcnNbbGF5ZXJdLmRlY29kZShpbnB1dCwgY2FsbGJhY2spO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZvcm1hdDogc3RyaW5nID0gc3BsaXR0ZWQuc2hpZnQoKTtcbiAgICBpZiAoW1wicGxhaW5cIiwgXCJnemlwXCJdLmluZGV4T2YoZm9ybWF0KSA9PT0gLTEpIHtcbiAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcihgVW5rbm93biBmb3JtYXQgJHtmb3JtYXR9YCkpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5mb3JtYXRzW2Zvcm1hdF0uZGVjb2RlKHNwbGl0dGVkLnBvcCgpLCAoZXJyOiBFcnJvciwgZGF0YTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIGNhbGxiYWNrKGVycik7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc3BsaXR0ZWQgPSBkYXRhLnNwbGl0KFwiIFwiKTtcbiAgICAgIGNvbnN0IG1ldGhvZDogbnVtYmVyID0gcGFyc2VJbnQoc3BsaXR0ZWQuc2hpZnQoKSwgMTApO1xuICAgICAgaWYgKHRoaXMuVkFMSURfTUVUSE9EUy5pbmRleE9mKG1ldGhvZCkgPT09IC0xKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVbmtub3duIG1ldGhvZCAke21ldGhvZH1gKTtcbiAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKGBVbmtub3duIG1ldGhvZCAke21ldGhvZH1gKSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QganNvbjogSUxheWVyMlBhcmFtcyA9IEpTT04ucGFyc2Uoc3BsaXR0ZWQuam9pbihcIiBcIikpIGFzIElMYXllcjJQYXJhbXM7XG4gICAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICBjYXNlIDA6IHtcbiAgICAgICAgICBpZiAoanNvbi5rZXkgJiYganNvbi50ZXh0KSB7XG4gICAgICAgICAgICBjYWxsYmFjayh1bmRlZmluZWQsIHsgLi4ueyBfbWV0aG9kOiBtZXRob2QsIF9sYXllcjogbGF5ZXIgfSwgLi4uanNvbiB9KTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoYE5vIHBhc3MgcmVxdWlyZWQgZGF0YSEgJHtKU09OLnN0cmluZ2lmeShqc29uKX1gKSk7XG4gICAgICAgIH0gYnJlYWs7XG4gICAgICAgIGNhc2UgMToge1xuICAgICAgICAgIGlmIChqc29uLmtleSAmJiBqc29uLnRleHQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCwgeyAuLi57IF9tZXRob2Q6IG1ldGhvZCwgX2xheWVyOiBsYXllciB9LCAuLi5qc29uIH0pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcihgTm8gcGFzcyByZXF1aXJlZCBkYXRhISAke0pTT04uc3RyaW5naWZ5KGpzb24pfWApKTtcbiAgICAgICAgfSBicmVhaztcbiAgICAgICAgY2FzZSAyOiB7XG4gICAgICAgICAgaWYgKGpzb24ua2V5KSB7XG4gICAgICAgICAgICBjYWxsYmFjayh1bmRlZmluZWQsIHsgLi4ueyBfbWV0aG9kOiBtZXRob2QsIF9sYXllcjogbGF5ZXIgfSwgLi4uanNvbiB9KTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoYE5vIHBhc3MgcmVxdWlyZWQgZGF0YSEgJHtKU09OLnN0cmluZ2lmeShqc29uKX1gKSk7XG4gICAgICAgIH0gYnJlYWs7XG4gICAgICAgIGNhc2UgMzoge1xuICAgICAgICAgIGlmIChqc29uLmtleSkge1xuICAgICAgICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCB7IC4uLnsgX21ldGhvZDogbWV0aG9kLCBfbGF5ZXI6IGxheWVyIH0sIC4uLmpzb24gfSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKGBObyBwYXNzIHJlcXVpcmVkIGRhdGEhICR7SlNPTi5zdHJpbmdpZnkoanNvbil9YCkpO1xuICAgICAgICB9IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKGBVbmtub3duIG1ldGhvZCAke21ldGhvZH1gKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBkb3duZ3JhZGUoZGF0YTogSUxheWVyMlBhcmFtcywgbGF5ZXI6IG51bWJlcik6IElMYXllcjFQYXJhbXMge1xuICAgIGlmIChsYXllciA+IHRoaXMuTEFZRVJfTlVNQkVSKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvL0xheWVyIDEgZG9lcyBub3Qgc3VwcG9ydCBvdGhlciBtZXRob2RzIGVsc2UgMCBbIGNvbW1lbnQgXVxuICAgIGlmIChsYXllciA9PT0gMSkge1xuICAgICAgaWYgKGRhdGEuX21ldGhvZCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChkYXRhLl9tZXRob2QgPT09IDApIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YTogSUxheWVyMVBhcmFtcyA9IHsgLi4uZGF0YSwgLi4ueyBfbGF5ZXI6IDEgfSB9O1xuXG4gICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBuZXdEYXRhOiBJTGF5ZXIyUGFyYW1zID0geyAuLi5kYXRhLCAuLi57IF9sYXllcjogMiB9IH07XG5cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfVxufVxuIl19