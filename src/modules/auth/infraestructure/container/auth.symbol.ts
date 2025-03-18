export const AUTH_SYMBOL = {
    RegisterUser: Symbol.for("RegisterUser"),
    LoginUser: Symbol.for("LoginUser"),
    CheckEmailExists: Symbol.for("CheckEmailExists"),
    GetCurrentAccount: Symbol.for("GetCurrentAccount"),
    UserRepository: Symbol.for("UserRepository"),
    HashService: Symbol.for("HashService"),
    TokenService: Symbol.for("TokenService"),
    IdService: Symbol.for("IdService"),
    AuthController: Symbol.for("AuthController"),
};
