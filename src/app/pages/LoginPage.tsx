import { useState } from "react";

interface LoginForm {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
}

interface LoginPageProps {
    onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = (): FormErrors => {
        const errs: FormErrors = {};
        if (!form.email.trim()) {
            errs.email = "E-mail é obrigatório.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errs.email = "Informe um e-mail válido.";
        }
        if (!form.password) {
            errs.password = "Senha é obrigatória.";
        } else if (form.password.length < 6) {
            errs.password = "A senha deve ter pelo menos 6 caracteres.";
        }
        return errs;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Botão Entrar clicado")
        const errs = validate();
        console.log("Erros:", errs);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        console.log("Passou da validação");
        setLoading(true);
        // setErrors({});
        // try {
        //     const response = await fetch("/api/admin/login", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ email: form.email, password: form.password }),
        //     });
        //     if (!response.ok) {
        //         const data = await response.json().catch(() => ({}));
        //         setErrors({
        //             general: data.message || "E-mail ou senha incorretos. Tente novamente.",
        //         });
        //     } else {
        //         const data = await response.json();
        //         localStorage.setItem("admin_token", data.token);
        //         onLoginSuccess();
        //     }
        // } catch {
        //     setErrors({
        //         general: "Erro de conexão. Verifique sua internet e tente novamente.",
        //     });
        // } finally {
        //     setLoading(false);
        // }

        setErrors({});

        console.log("Vou chamar a API");

        try {
            const response = await fetch("${API_URL}/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: form.email,
                    senha: form.password,
                }),
            });

            console.log("Status:", response.status);

            const data = await response.json();
            console.log("RESPOSTA LOGIN:", data);

            if (!response.ok) {
                setErrors({
                    general: data.error || "E-mail ou senha incorretos.",
                });
                return;
            }

            localStorage.setItem("token", data.token);

            onLoginSuccess();
        } catch {
            setErrors({
                general: "Erro de conexão com o servidor",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-64px)]">
            {/* Faixa lateral — visível apenas em desktop */}
            <div className="hidden lg:flex flex-col justify-between w-96 xl:w-[440px] bg-gradient-to-b from-[#1B5E20] to-[#2E7D32] p-12 flex-shrink-0 self-stretch">
                <div className="flex flex-col gap-5">
                    {/* Logo igual ao Header */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo-ifnmg.png"
                            alt="Logo IFNMG"
                            className="h-12 w-auto object-contain"
                        />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-2xl leading-snug">
                            Área Administrativa
                        </h2>
                        <p className="text-green-200 text-sm font-medium tracking-wide mt-1">
                            Guia do Ingressante
                        </p>
                    </div>
                    <div className="w-10 h-0.5 bg-green-400 rounded-full" />
                    <p className="text-white/80 text-sm leading-relaxed">
                        Acesse para gerenciar cursos, editais, horários, bolsas e demais
                        informações do portal do ingressante.
                    </p>
                </div>
                <p className="text-white/40 text-xs">
                    Portal do Ingressante IFNMG - Almenara
                </p>
            </div>

            {/* Painel de login */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-lg">

                    {/* Header mobile */}
                    <div className="flex lg:hidden items-center gap-3 mb-6">
                        <img
                            src="/logo-ifnmg.png"
                            alt="Logo IFNMG"
                            className="h-9 w-auto object-contain"
                        />
                        <div>
                            <p className="font-bold text-[#1B5E20] text-sm leading-none">
                                Guia do Ingressante
                            </p>
                            <p className="text-gray-400 text-xs mt-0.5">IFNMG — Campus Almenara</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1B5E20]">Acesso administrativo</h2>
                    <p className="text-gray-500 text-sm mt-1 mb-6">
                        Entre com suas credenciais para continuar.
                    </p>

                    {/* Erro geral */}
                    {errors.general && (
                        <div
                            className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5 leading-relaxed"
                            role="alert"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="flex-shrink-0 mt-0.5"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                        {/* Campo e-mail */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                E-mail
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "email-error" : undefined}
                                className={`h-11 px-3.5 rounded-xl border text-sm outline-none transition-colors w-full
                  ${errors.email
                                        ? "border-red-400 focus:border-red-500"
                                        : "border-gray-200 focus:border-[#2E7D32]"
                                    }`}
                            />
                            {errors.email && (
                                <p id="email-error" className="text-xs text-red-500" role="alert">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Campo senha */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    aria-invalid={!!errors.password}
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                    className={`h-11 px-3.5 pr-11 rounded-xl border text-sm outline-none transition-colors w-full
                    ${errors.password
                                            ? "border-red-400 focus:border-red-500"
                                            : "border-gray-200 focus:border-[#2E7D32]"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                >
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p id="password-error" className="text-xs text-red-500" role="alert">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`h-11 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 mt-1 transition-colors
                ${loading
                                    ? "bg-[#52b788] cursor-not-allowed"
                                    : "bg-[#2E7D32] hover:bg-[#1B5E20] active:scale-[0.98]"
                                }`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                    </svg>
                                    Entrando...
                                </>
                            ) : (
                                "Entrar"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}