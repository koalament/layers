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
var LAYER1 = (function () {
    function LAYER1() {
        this.LAYER_NUMBER = 1;
        this.VALID_METHODS = [0];
        this.formats = { plain: new plain_1.PlainFormatter(), gzip: new gzip_1.GzipFormatter() };
    }
    LAYER1.prototype.encode = function (method, format, params, callback) {
        switch (method) {
            case "comment":
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
        var message = ["0", JSON.stringify(params)].join(" ");
        if (!this.formats[format]) {
            callback(new Error("Format " + format + " not supported."));
            return;
        }
        this.formats[format].encode(message, function (err, formattedMessage) {
            if (err) {
                callback(err);
                return;
            }
            var op = Buffer.from("koalament 1 " + format + " " + formattedMessage).toString("hex");
            callback(undefined, op);
        });
    };
    LAYER1.prototype.decode = function (input, callback) {
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
        var layer = splitted.shift();
        if (parseInt(layer, 10) > this.LAYER_NUMBER) {
            callback(new Error("Layer is not supported."));
            return;
        }
        if (parseInt(layer, 10) < this.LAYER_NUMBER) {
            callback(new Error("Ooooooops!"));
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
                            callback(undefined, __assign({ _method: method, _layer: parseInt(layer, 10) }, json));
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
    LAYER1.prototype.downgrade = function (data, layer) {
        throw new Error("Not implemented.");
    };
    return LAYER1;
}());
exports.LAYER1 = LAYER1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTGF5ZXIxL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQSx5Q0FBaUQ7QUFDakQsdUNBQStDO0FBTy9DO0lBQUE7UUFDbUIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsa0JBQWEsR0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLFlBQU8sR0FBa0MsRUFBRSxLQUFLLEVBQUUsSUFBSSxzQkFBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksb0JBQWEsRUFBRSxFQUFFLENBQUM7SUFtR3ZILENBQUM7SUFqR1EsdUJBQU0sR0FBYixVQUFjLE1BQWMsRUFBRSxNQUFtQixFQUFFLE1BQThCLEVBQUUsUUFBZ0Q7UUFDakksUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLFNBQVM7Z0JBQUU7b0JBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO3dCQUMvQixRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO3dCQUV4QyxPQUFPO3FCQUNSO2lCQUNGO2dCQUFDLE1BQU07WUFDUixPQUFPLENBQUMsQ0FBQztnQkFDUCxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dCQUV4QyxPQUFPO2FBQ1I7U0FDRjtRQUNELElBQU0sT0FBTyxHQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekIsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVUsTUFBTSxvQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFFdkQsT0FBTztTQUNS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QUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7NEJBQ3pCLFFBQVEsQ0FBQyxTQUFTLFdBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUssSUFBSSxFQUFHLENBQUM7NEJBRXRGLE9BQU87eUJBQ1I7d0JBQ0QsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLDRCQUEwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDdkU7b0JBQUMsTUFBTTtnQkFDUixPQUFPLENBQUMsQ0FBQztvQkFDUCxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsb0JBQWtCLE1BQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ2pEO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwwQkFBUyxHQUFoQixVQUFpQixJQUFtQixFQUFFLEtBQWE7UUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQyxBQXRHRCxJQXNHQztBQXRHWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXllciB9IGZyb20gXCIuLi8uLi90eXBlcy9sYXllclwiO1xuaW1wb3J0IHsgVEVYVF9GT1JNQVQsIElGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vdHlwZXMvZm9ybWF0c1wiO1xuaW1wb3J0IHsgUGxhaW5Gb3JtYXR0ZXIgfSBmcm9tIFwiLi9mb3JtYXRzL3BsYWluXCI7XG5pbXBvcnQgeyBHemlwRm9ybWF0dGVyIH0gZnJvbSBcIi4vZm9ybWF0cy9nemlwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxheWVyMVBhcmFtcyB7XG4gIGtleTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIF9tZXRob2Q6IG51bWJlcjtcbn1cbmV4cG9ydCBjbGFzcyBMQVlFUjEgaW1wbGVtZW50cyBJTGF5ZXI8SUxheWVyMVBhcmFtcywgYW55PiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgTEFZRVJfTlVNQkVSOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIHJlYWRvbmx5IFZBTElEX01FVEhPRFM6IG51bWJlcltdID0gWzBdO1xuICBwcml2YXRlIHJlYWRvbmx5IGZvcm1hdHM6IHsgW2tleTogc3RyaW5nXTogSUZvcm1hdHRlciB9ID0geyBwbGFpbjogbmV3IFBsYWluRm9ybWF0dGVyKCksIGd6aXA6IG5ldyBHemlwRm9ybWF0dGVyKCkgfTtcblxuICBwdWJsaWMgZW5jb2RlKG1ldGhvZDogc3RyaW5nLCBmb3JtYXQ6IFRFWFRfRk9STUFULCBwYXJhbXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIGNhbGxiYWNrOiAoZXJyOiBFcnJvciwgZW5jb2RlZD86IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICBjYXNlIFwiY29tbWVudFwiOiB7XG4gICAgICAgIGlmICghcGFyYW1zLmtleSB8fCAhcGFyYW1zLnRleHQpIHtcbiAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoXCJNaXNtYXRjaCBwYXJhbXMhXCIpKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBicmVhaztcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKFwiTWlzbWF0Y2ggbWV0aG9kIVwiKSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlOiBzdHJpbmcgPSBbXCIwXCIsIEpTT04uc3RyaW5naWZ5KHBhcmFtcyldLmpvaW4oXCIgXCIpO1xuICAgIGlmICghdGhpcy5mb3JtYXRzW2Zvcm1hdF0pIHtcbiAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcihgRm9ybWF0ICR7Zm9ybWF0fSBub3Qgc3VwcG9ydGVkLmApKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmZvcm1hdHNbZm9ybWF0XS5lbmNvZGUobWVzc2FnZSwgKGVycjogRXJyb3IsIGZvcm1hdHRlZE1lc3NhZ2U6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjYWxsYmFjayhlcnIpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wOiBzdHJpbmcgPSBCdWZmZXIuZnJvbShga29hbGFtZW50IDEgJHtmb3JtYXR9ICR7Zm9ybWF0dGVkTWVzc2FnZX1gKS50b1N0cmluZyhcImhleFwiKTtcbiAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCwgb3ApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRlY29kZShpbnB1dDogc3RyaW5nLCBjYWxsYmFjazogKGVycjogRXJyb3IsIGRlY29kZWQ/OiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgY2FsbGJhY2sobmV3IEVycm9yKGBVbmtub3duIGlucHV0ICR7aW5wdXR9YCkpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpbnB1dCA9PT0gXCJcIikge1xuICAgICAgY2FsbGJhY2sobmV3IEVycm9yKGBFbXB0eSBpbnB1dCAke2lucHV0fWApKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc3BsaXR0ZWQ6IHN0cmluZ1tdID0gaW5wdXQuc3BsaXQoXCIgXCIpO1xuICAgIGNvbnN0IGxheWVyOiBzdHJpbmcgPSBzcGxpdHRlZC5zaGlmdCgpO1xuICAgIGlmIChwYXJzZUludChsYXllciwgMTApID4gdGhpcy5MQVlFUl9OVU1CRVIpIHtcbiAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcihcIkxheWVyIGlzIG5vdCBzdXBwb3J0ZWQuXCIpKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGFyc2VJbnQobGF5ZXIsIDEwKSA8IHRoaXMuTEFZRVJfTlVNQkVSKSB7XG4gICAgICBjYWxsYmFjayhuZXcgRXJyb3IoXCJPb29vb29vcHMhXCIpKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmb3JtYXQ6IHN0cmluZyA9IHNwbGl0dGVkLnNoaWZ0KCk7XG4gICAgaWYgKFtcInBsYWluXCIsIFwiZ3ppcFwiXS5pbmRleE9mKGZvcm1hdCkgPT09IC0xKSB7XG4gICAgICBjYWxsYmFjayhuZXcgRXJyb3IoYFVua25vd24gZm9ybWF0ICR7Zm9ybWF0fWApKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZm9ybWF0c1tmb3JtYXRdLmRlY29kZShzcGxpdHRlZC5wb3AoKSwgKGVycjogRXJyb3IsIGRhdGE6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICBjYWxsYmFjayhlcnIpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNwbGl0dGVkID0gZGF0YS5zcGxpdChcIiBcIik7XG4gICAgICBjb25zdCBtZXRob2Q6IG51bWJlciA9IHBhcnNlSW50KHNwbGl0dGVkLnNoaWZ0KCksIDEwKTtcbiAgICAgIGlmICh0aGlzLlZBTElEX01FVEhPRFMuaW5kZXhPZihtZXRob2QpID09PSAtMSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgVW5rbm93biBtZXRob2QgJHttZXRob2R9YCk7XG4gICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcihgVW5rbm93biBtZXRob2QgJHttZXRob2R9YCkpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGpzb246IElMYXllcjFQYXJhbXMgPSBKU09OLnBhcnNlKHNwbGl0dGVkLmpvaW4oXCIgXCIpKSBhcyBJTGF5ZXIxUGFyYW1zO1xuICAgICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgICAgY2FzZSAwOiB7XG4gICAgICAgICAgaWYgKGpzb24ua2V5ICYmIGpzb24udGV4dCkge1xuICAgICAgICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCB7IC4uLnsgX21ldGhvZDogbWV0aG9kLCBfbGF5ZXI6IHBhcnNlSW50KGxheWVyLCAxMCkgfSwgLi4uanNvbiB9KTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoYE5vIHBhc3MgcmVxdWlyZWQgZGF0YSEgJHtKU09OLnN0cmluZ2lmeShqc29uKX1gKSk7XG4gICAgICAgIH0gYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoYFVua25vd24gbWV0aG9kICR7bWV0aG9kfWApKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRvd25ncmFkZShkYXRhOiBJTGF5ZXIxUGFyYW1zLCBsYXllcjogbnVtYmVyKTogYW55IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9XG59XG4iXX0=