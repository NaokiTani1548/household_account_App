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
const Auth = ({ setUserId }) => {
    const [isRegistering, setIsRegistering] = (0, react_1.useState)(false);
    const [username, setUsername] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [userId, setUserIdValue] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const handleRegister = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const response = yield fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, email }),
            });
            if (!response.ok) {
                throw new Error("登録に失敗しました");
            }
            const data = yield response.json();
            alert("登録が完了しました！ログインしてください。\nユーザーIDは{}です。".replace('{}', data.userId));
            setIsRegistering(false); // ログイン画面に戻す
        }
        catch (error) {
            alert("登録に失敗しました");
            console.error(error);
        }
    });
    const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const response = yield fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                },
                credentials: "include",
                body: JSON.stringify({ userId, password }),
            });
            if (!response.ok) {
                throw new Error("ログインに失敗しました");
            }
            const data = yield response.json();
            const token = data.token;
            localStorage.setItem("jwt", token);
            const id = userId;
            localStorage.setItem("userId", String(id)); // ユーザーIDを保存
            alert("ログインに成功しました");
            window.location.reload();
        }
        catch (error) {
            alert("ログインに失敗しました");
            console.error(error);
        }
    });
    return (react_1.default.createElement(material_1.Container, { maxWidth: "lg", style: { marginTop: '20px' } },
        react_1.default.createElement(material_1.Paper, { elevation: 6, style: { padding: '20px', backgroundColor: '#FFF3E0', borderRadius: '10px', display: 'flex', justifyContent: 'space-between' } },
            react_1.default.createElement("div", { style: { flex: 1, marginRight: '20px' } },
                react_1.default.createElement(material_1.Typography, { variant: "h4", align: "center", gutterBottom: true, style: { color: '#D2691E' } }, isRegistering ? "ユーザー登録" : "ログイン"),
                isRegistering ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(material_1.Box, { component: "form", onSubmit: handleRegister, sx: { display: 'flex', flexDirection: 'column', gap: 2 } },
                        react_1.default.createElement(material_1.TextField, { label: "UserName", type: "text", variant: "outlined", value: username, onChange: (e) => setUsername(e.target.value), fullWidth: true }),
                        react_1.default.createElement(material_1.TextField, { label: "EmailAdress", type: "text", variant: "outlined", value: email, onChange: (e) => setEmail(e.target.value), fullWidth: true }),
                        react_1.default.createElement(material_1.TextField, { label: "Password", type: "password", variant: "outlined", value: password, onChange: (e) => setPassword(e.target.value), fullWidth: true }),
                        react_1.default.createElement(material_1.Button, { type: "submit", variant: "contained", style: { backgroundColor: '#FFB74D', color: 'white' } }, "Account Register"),
                        react_1.default.createElement(material_1.Button, { onClick: () => {
                                setIsRegistering(false);
                            }, variant: "contained", style: { backgroundColor: '#FFB74D', color: 'white' } }, "Existes Account...")))) : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(material_1.Box, { component: "form", onSubmit: handleLogin, sx: { display: 'flex', flexDirection: 'column', gap: 2 } },
                        react_1.default.createElement(material_1.TextField, { label: "UserId", type: "number", variant: "outlined", value: userId, onChange: (e) => setUserIdValue(e.target.value), fullWidth: true }),
                        react_1.default.createElement(material_1.TextField, { label: "Password", type: "password", variant: "outlined", value: password, onChange: (e) => setPassword(e.target.value), fullWidth: true }),
                        react_1.default.createElement(material_1.Button, { type: "submit", variant: "contained", style: { backgroundColor: '#FFB74D', color: 'white' } }, "Login"),
                        react_1.default.createElement(material_1.Button, { onClick: () => {
                                setIsRegistering(true);
                            }, variant: "contained", style: { backgroundColor: '#FFB74D', color: 'white' } }, "Register Account..."))))))));
};
exports.default = Auth;
