"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_gzip_1 = require("node-gzip");
var GzipFormatter = (function () {
    function GzipFormatter() {
    }
    GzipFormatter.prototype.encode = function (input, callback) {
        node_gzip_1.gzip(Buffer.from(input, "utf-8"))
            .then(function (compressed) {
            callback(undefined, compressed.toString("base64"));
        }).catch(callback);
    };
    GzipFormatter.prototype.decode = function (input, callback) {
        node_gzip_1.ungzip(Buffer.from(input, "base64")).then(function (decompressed) {
            callback(undefined, decompressed.toString("utf8"));
        }).catch(callback);
    };
    return GzipFormatter;
}());
exports.GzipFormatter = GzipFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvTGF5ZXIxL2Zvcm1hdHMvZ3ppcC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUF5QztBQUN6QztJQUFBO0lBWUEsQ0FBQztJQVhRLDhCQUFNLEdBQWIsVUFBYyxLQUFhLEVBQUUsUUFBZ0Q7UUFDM0UsZ0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQzthQUM5QixJQUFJLENBQUMsVUFBQyxVQUFrQjtZQUN2QixRQUFRLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNNLDhCQUFNLEdBQWIsVUFBYyxLQUFhLEVBQUUsUUFBZ0Q7UUFDM0Usa0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFlBQW9CO1lBQzdELFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBlcy9mb3JtYXRzXCI7XG5pbXBvcnQgeyBnemlwLCB1bmd6aXAgfSBmcm9tIFwibm9kZS1nemlwXCI7XG5leHBvcnQgY2xhc3MgR3ppcEZvcm1hdHRlciBpbXBsZW1lbnRzIElGb3JtYXR0ZXIge1xuICBwdWJsaWMgZW5jb2RlKGlucHV0OiBzdHJpbmcsIGNhbGxiYWNrOiAoZXJyOiBFcnJvciwgZW5jb2RlZD86IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xuICAgIGd6aXAoQnVmZmVyLmZyb20oaW5wdXQsIFwidXRmLThcIikpXG4gICAgICAudGhlbigoY29tcHJlc3NlZDogQnVmZmVyKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCwgY29tcHJlc3NlZC50b1N0cmluZyhcImJhc2U2NFwiKSk7XG4gICAgICB9KS5jYXRjaChjYWxsYmFjayk7XG4gIH1cbiAgcHVibGljIGRlY29kZShpbnB1dDogc3RyaW5nLCBjYWxsYmFjazogKGVycjogRXJyb3IsIGRlY29kZWQ/OiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB1bmd6aXAoQnVmZmVyLmZyb20oaW5wdXQsIFwiYmFzZTY0XCIpKS50aGVuKChkZWNvbXByZXNzZWQ6IEJ1ZmZlcikgPT4ge1xuICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCBkZWNvbXByZXNzZWQudG9TdHJpbmcoXCJ1dGY4XCIpKTtcbiAgICB9KS5jYXRjaChjYWxsYmFjayk7XG4gIH1cbn1cbiJdfQ==