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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ExpenseList_1 = __importDefault(require("./../components/ExpenseList"));
const AddExpense_1 = __importDefault(require("./../components/AddExpense"));
const material_1 = require("@mui/material");
const react_calendar_1 = __importDefault(require("react-calendar"));
const Auth_1 = __importDefault(require("./Auth"));
const Home = () => {
    const [expenses, setExpenses] = (0, react_1.useState)([]);
    const [categories, setCategories] = (0, react_1.useState)(['Food', 'Transport', 'Entertainment', 'Utilities', 'Other']);
    const [newCategory, setNewCategory] = (0, react_1.useState)('');
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(null);
    const [selectedMonth, setSelectedMonth] = (0, react_1.useState)(new Date().toISOString().split('T')[0].slice(0, 7));
    const [open, setOpen] = (0, react_1.useState)(false);
    const [userId, setUserId] = (0, react_1.useState)(Number(localStorage.getItem("userId")) || null);
    const dailyExpenses = expenses.filter(expense => expense.date === (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.toISOString().split('T')[0]));
    (0, react_1.useEffect)(() => {
        if (userId) {
            fetchExpenses();
        }
    }, [userId]);
    const fetchExpenses = () => __awaiter(void 0, void 0, void 0, function* () {
        const token = localStorage.getItem("jwt");
        if (!token) {
            console.error("JWT token is missing. Please log in.");
            return;
        }
        try {
            const userId = localStorage.getItem("userId");
            const response = yield fetch(`http://localhost:8080/api/expenses/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error fetching expenses: ${response.status} ${response.statusText}`);
            }
            const data = yield response.json();
            setExpenses(data);
        }
        catch (error) {
            console.error('Error fetching expenses:', error);
        }
    });
    const handleAddExpense = (newExpense) => {
        setExpenses(prevExpenses => [...prevExpenses, newExpense]);
        fetchExpenses();
    };
    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        }
    };
    const handleClickDay = (date) => {
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        setSelectedDate(utcDate);
        setOpen(true);
    };
    const handleActiveStartDateChange = ({ activeStartDate }) => {
        if (activeStartDate) {
            const utcDate = new Date(Date.UTC(activeStartDate.getFullYear(), activeStartDate.getMonth(), activeStartDate.getDate()));
            setSelectedMonth(utcDate.toISOString().split('T')[0].slice(0, 7));
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("userId");
        setUserId(null); // ユーザーIDのリセット
    };
    if (!userId) {
        return react_1.default.createElement(Auth_1.default, { setUserId: setUserId });
    }
    return (react_1.default.createElement(material_1.Container, { maxWidth: "lg", style: { marginTop: '20px' } },
        react_1.default.createElement(material_1.Paper, { elevation: 6, style: { padding: '20px', backgroundColor: '#FFF3E0', borderRadius: '10px', display: 'flex', justifyContent: 'space-between' } },
            react_1.default.createElement("div", { style: { flex: 1, marginRight: '20px' } },
                react_1.default.createElement(material_1.Typography, { variant: "h4", align: "center", gutterBottom: true, style: { color: '#D2691E' } }, "\u5BB6\u8A08\u7C3F"),
                react_1.default.createElement(AddExpense_1.default, { onAddExpense: handleAddExpense, categories: categories }),
                react_1.default.createElement(material_1.TextField, { label: "New Category", value: newCategory, onChange: (e) => setNewCategory(e.target.value), fullWidth: true, margin: "normal" }),
                react_1.default.createElement(material_1.Button, { onClick: handleAddCategory, variant: "contained", style: { marginTop: '10px' } }, "Add Category"),
                react_1.default.createElement("div", { style: { marginTop: '40px' } },
                    react_1.default.createElement(react_calendar_1.default, { onClickDay: handleClickDay, onActiveStartDateChange: handleActiveStartDateChange })),
                react_1.default.createElement(material_1.Dialog, { open: open, onClose: () => setOpen(false) },
                    react_1.default.createElement(material_1.DialogTitle, null, selectedDate === null || selectedDate === void 0 ? void 0 :
                        selectedDate.toISOString().split('T')[0],
                        " \u306E\u652F\u51FA"),
                    react_1.default.createElement(material_1.DialogContent, null, dailyExpenses.length > 0 ? (react_1.default.createElement(material_1.List, null, dailyExpenses.map((expenses) => (react_1.default.createElement(material_1.ListItem, { key: expenses.id },
                        react_1.default.createElement(material_1.ListItemText, { primary: `${expenses.category}: ¥${expenses.amount}` })))))) : (react_1.default.createElement(material_1.Typography, null, "\u652F\u51FA\u306F\u3042\u308A\u307E\u305B\u3093"))))),
            react_1.default.createElement("div", { style: { flex: 1 } },
                react_1.default.createElement(ExpenseList_1.default, { expenses: expenses, setExpenses: setExpenses, categories: categories, selectedMonth: selectedMonth }))),
        react_1.default.createElement(material_1.Button, { onClick: handleLogout, variant: "outlined", style: {
                position: 'absolute',
                top: '20px',
                right: '20px',
            } }, "\u30ED\u30B0\u30A2\u30A6\u30C8")));
};
exports.default = Home;
