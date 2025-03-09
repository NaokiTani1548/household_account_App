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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const AddExpense = ({ onAddExpense, categories }) => {
    const [category, setCategory] = (0, react_1.useState)('');
    const [amount, setAmount] = (0, react_1.useState)('');
    const [date, setDate] = (0, react_1.useState)('');
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const expense = { category: category, amount: parseFloat(amount), date: date, userId: Number(userId) };
        try {
            const response = yield fetch("http://localhost:8080/api/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                },
                body: JSON.stringify(expense),
            });
            if (!response.ok) {
                throw new Error("Failed to add expense");
            }
            const data = yield response.json();
            console.log("Expense added:", data);
            setCategory('');
            setAmount('');
            setDate('');
            onAddExpense(data);
        }
        catch (error) {
            console.error("Error adding expense:", error);
        }
    });
    return (react_1.default.createElement(material_1.Box, { component: "form", onSubmit: handleSubmit, sx: { display: 'flex', flexDirection: 'column', gap: 2 } },
        react_1.default.createElement(material_1.FormControl, { fullWidth: true, variant: "outlined" },
            react_1.default.createElement(material_1.InputLabel, null, "Category"),
            react_1.default.createElement(material_1.Select, { value: category, onChange: (e) => setCategory(e.target.value), label: "Category" }, categories.map((category) => (react_1.default.createElement(material_1.MenuItem, { key: category, value: category }, category))))),
        react_1.default.createElement(material_1.TextField, { label: "Amount", type: "number", variant: "outlined", value: amount, onChange: (e) => setAmount(e.target.value), fullWidth: true }),
        react_1.default.createElement(material_1.TextField, { label: "Date", type: "date", variant: "outlined", value: date, onChange: (e) => setDate(e.target.value), InputLabelProps: { shrink: true }, fullWidth: true }),
        react_1.default.createElement(material_1.Button, { type: "submit", variant: "contained", style: { backgroundColor: '#FFB74D', color: 'white' } }, "Add Expense")));
};
exports.default = AddExpense;
