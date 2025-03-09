import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Box, Button, Container, FormControl, Paper, TextField, Typography } from "@mui/material";

interface AuthProps {
    setUserId: (id: number) => void;
}

const Auth: React.FC<AuthProps> = ({ setUserId }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserIdValue] = useState("");
    const [email, setEmail] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, email}),
            });

            if (!response.ok) {
                throw new Error("登録に失敗しました");
            }
            const data = await response.json();
            alert("登録が完了しました！ログインしてください。\nユーザーIDは{}です。".replace('{}', data.userId));
            setIsRegistering(false); // ログイン画面に戻す
        } catch (error) {
            alert("登録に失敗しました");
            console.error(error);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
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

            const data = await response.json();
            const token = data.token;
            localStorage.setItem("jwt", token);
            const id = userId;
            localStorage.setItem("userId", String(id)); // ユーザーIDを保存
            alert("ログインに成功しました");
            window.location.reload();
        } catch (error) {
            alert("ログインに失敗しました");
            console.error(error);
        }
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Paper elevation={6} style={{ padding: '20px', backgroundColor: '#FFF3E0', borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, marginRight: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom style={{ color: '#D2691E' }}>
                        {isRegistering ? "ユーザー登録" : "ログイン"}
                    </Typography>
                    {isRegistering ? (
                        <>
                        <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="UserName"
                                type="text"
                                variant="outlined" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="EmailAdress"
                                type="text"
                                variant="outlined" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                style={{ backgroundColor: '#FFB74D', color: 'white' }}
                            >
                                Account Register
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsRegistering(false);
                                }}
                                variant="contained" 
                                style={{ backgroundColor: '#FFB74D', color: 'white' }}
                            >
                                Existes Account...
                            </Button>
                        </Box>
                        </>
                    ) : (
                        <>
                        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="UserId"
                                type="number"
                                variant="outlined" 
                                value={userId}
                                onChange={(e) => setUserIdValue(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                style={{ backgroundColor: '#FFB74D', color: 'white' }}
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsRegistering(true);
                                }}
                                variant="contained" 
                                style={{ backgroundColor: '#FFB74D', color: 'white' }}
                            >
                                Register Account...
                            </Button>
                        </Box>
                        </>
                    )}
                </div>    
            </Paper>
        </Container>
    );
};
export default Auth;