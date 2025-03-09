"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const axios_1 = __importDefault(require("axios"));
const EditExpenseDialog = ({ open, onClose, expense, onUpdate, categories }) => {
    const [category, setCategory] = (0, react_1.useState)((expense === null || expense === void 0 ? void 0 : expense.category) || '');
    const [amount, setAmount] = (0, react_1.useState)((expense === null || expense === void 0 ? void 0 : expense.amount.toString()) || '');
    const [date, setDate] = (0, react_1.useState)((expense === null || expense === void 0 ? void 0 : expense.date) || '');
    react_1.default.useEffect(() => {
        if (expense) {
            setCategory(expense.category);
            setAmount(expense.amount.toString());
            setDate(expense.date);
        }
    }, [expense]);
    const handleSave = () => {
        if (!expense)
            return;
        const updatedExpense = Object.assign(Object.assign({}, expense), { category, amount: parseFloat(amount), date });
        const userId = localStorage.getItem('userId');
        axios_1.default.put(`http://localhost:8080/api/expenses/${userId}/${expense.id}`, updatedExpense)
            .then(() => {
            onUpdate(updatedExpense);
            onClose();
        })
            .catch(error => {
            console.error('Error updating expense:', error);
        });
    };
    return (react_1.default.createElement(material_1.Dialog, { open: open, onClose: onClose },
        react_1.default.createElement(material_1.DialogTitle, null, "\u652F\u51FA\u3092\u7DE8\u96C6"),
        react_1.default.createElement(material_1.DialogContent, null,
            react_1.default.createElement(material_1.FormControl, { fullWidth: true, variant: "outlined", margin: "normal" },
                react_1.default.createElement(material_1.InputLabel, null, "Category"),
                react_1.default.createElement(material_1.Select, { value: category, onChange: (e) => setCategory(e.target.value), label: "Category" }, categories.map((category) => (react_1.default.createElement(material_1.MenuItem, { key: category, value: category }, category))))),
            react_1.default.createElement(material_1.TextField, { label: "Amount", fullWidth: true, margin: "dense", type: "number", value: amount, onChange: (e) => setAmount(e.target.value) }),
            react_1.default.createElement(material_1.TextField, { label: "Date", fullWidth: true, margin: "dense", type: "date", value: date, onChange: (e) => setDate(e.target.value) })),
        react_1.default.createElement(material_1.DialogActions, null,
            react_1.default.createElement(material_1.Button, { onClick: onClose, color: "secondary" }, "\u30AD\u30E3\u30F3\u30BB\u30EB"),
            react_1.default.createElement(material_1.Button, { onClick: handleSave, color: "primary", variant: "contained" }, "\u4FDD\u5B58"))));
};
exports.default = EditExpenseDialog;
