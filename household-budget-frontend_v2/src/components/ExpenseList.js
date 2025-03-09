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
require("react-calendar/dist/Calendar.css");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const axios_1 = __importDefault(require("axios"));
const EditExpenseDialog_1 = __importDefault(require("./EditExpenseDialog"));
const ExpenseList = ({ expenses, setExpenses, categories, selectedMonth }) => {
    const [totalAmount, setTotalAmount] = (0, react_1.useState)(0);
    const [editOpen, setEditOpen] = (0, react_1.useState)(false);
    const [selectedExpense, setSelectedExpense] = (0, react_1.useState)(null);
    // カテゴリごとの支出合計を計算
    const calculateCategoryTotals = (expenses) => {
        const categoryTotals = categories.reduce((acc, category) => {
            acc[category] = 0;
            return acc;
        }, {}); // 明示的な型アノテーションを追加
        expenses.forEach(expense => {
            if (categoryTotals[expense.category] !== undefined) {
                categoryTotals[expense.category] += expense.amount;
            }
        });
        return categoryTotals;
    };
    (0, react_1.useEffect)(() => {
        const monthlyExpenses = expenses.filter(expense => expense.date.startsWith(selectedMonth));
        const newTotalAmount = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalAmount(newTotalAmount);
        const categoryTotals = calculateCategoryTotals(monthlyExpenses);
        setCategoryTotals(categoryTotals);
    }, [selectedMonth, expenses]);
    const [categoryTotals, setCategoryTotals] = (0, react_1.useState)({});
    const handleDelete = (id) => {
        const userId = Number(localStorage.getItem("userId"));
        axios_1.default.delete(`http://localhost:8080/api/expenses/${userId}/${id}`)
            .then(() => {
            setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
        })
            .catch(error => {
            console.error('Error deleting expense:', error);
        });
    };
    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setEditOpen(true);
    };
    const handleUpdate = (updatedExpense) => {
        setExpenses(prevExpenses => prevExpenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp));
    };
    return (react_1.default.createElement("div", { style: { textAlign: 'center', marginTop: '20px' } },
        react_1.default.createElement(EditExpenseDialog_1.default, { open: editOpen, onClose: () => setEditOpen(false), expense: selectedExpense, onUpdate: handleUpdate, categories: categories }),
        react_1.default.createElement(material_1.Card, { sx: { margin: '20px auto', padding: '10px', maxWidth: 400, backgroundColor: '#FFF3E0' } },
            react_1.default.createElement(material_1.CardContent, null,
                react_1.default.createElement(material_1.Typography, { variant: "h6", sx: { color: '#D2691E' } },
                    selectedMonth,
                    " \u306E\u5408\u8A08\u652F\u51FA: \u00A5",
                    totalAmount),
                Object.entries(categoryTotals).map(([category, total]) => (react_1.default.createElement(material_1.Typography, { key: category, variant: "body1" },
                    category,
                    ": \u00A5",
                    total))))),
        react_1.default.createElement(material_1.List, { sx: { maxWidth: 400, margin: 'auto', backgroundColor: '#FFF8E1', borderRadius: '10px', padding: '10px' } }, expenses.filter(expense => expense.date.startsWith(selectedMonth)).map((expense) => (react_1.default.createElement(material_1.ListItem, { key: expense.id, secondaryAction: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(material_1.IconButton, { edge: "end", "aria-label": "edit", onClick: () => handleEdit(expense) },
                    react_1.default.createElement(icons_material_1.Edit, null)),
                react_1.default.createElement(material_1.IconButton, { edge: "end", "aria-label": "delete", onClick: () => handleDelete(expense.id) },
                    react_1.default.createElement(icons_material_1.Delete, null))) },
            react_1.default.createElement(material_1.ListItemText, { primary: `${expense.category}: ¥${expense.amount} (${expense.date})` })))))));
};
exports.default = ExpenseList;
