export const AUTH_SYMBOL = {
    RegisterUserUseCase: Symbol.for("RegisterUserUseCase"),
    LoginUserUseCase: Symbol.for("LoginUserUseCase"),
    UserRepository: Symbol.for("UserRepository"),
    HashService: Symbol.for("HashService"),
    TokenService: Symbol.for("TokenService"),
    IdService: Symbol.for("IdService"),
    AuthController: Symbol.for("AuthController"),
    GetCurrentAccountUseCase: Symbol.for("GetCurrentAccountUseCase"),
};
