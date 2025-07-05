class BadRequest extends Error {
    constructor(message, options) {
        super(message, options);
        this.status = 400;
    }
}
exports.BadRequest = BadRequest;

class NotFoundHTML extends Error {
    constructor(message, options) {
        super(message, options);
        this.status = 404;
    }
}
exports.NotFoundHTML = NotFoundHTML;