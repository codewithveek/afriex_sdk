export var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "pending";
    TransactionStatus["PROCESSING"] = "processing";
    TransactionStatus["COMPLETED"] = "completed";
    TransactionStatus["FAILED"] = "failed";
    TransactionStatus["CANCELLED"] = "cancelled";
})(TransactionStatus || (TransactionStatus = {}));
export var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["BANK_ACCOUNT"] = "bank_account";
    PaymentMethod["DEBIT_CARD"] = "debit_card";
    PaymentMethod["WALLET"] = "wallet";
    PaymentMethod["MOBILE_MONEY"] = "mobile_money";
})(PaymentMethod || (PaymentMethod = {}));
//# sourceMappingURL=common.js.map