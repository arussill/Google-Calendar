"use strict";
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
const fastify_1 = __importDefault(require("fastify"));
const auth_user_1 = require("./auth-user");
const server = (0, fastify_1.default)({});
server.get('/auth', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    reply.send((0, auth_user_1.botsUserAuth)());
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen({ port: 3000 });
        const address = server.server.address();
        const port = typeof address === 'string' ? address : address === null || address === void 0 ? void 0 : address.port;
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
// .then(async (auth) => {
//   console.log(
//     await findEventsUsers(
//       auth,
//       [//"aura.russill@sofka.com.co",],
//       "juliancamiloalvarez77@gmail.com"],
//       subHours(new Date(), 100),
//       addHours(new Date(), 10).toISOString()
//       // "2022-12-09T12:00:00-05:00",
//       // "2022-12-09T20:00:00-05:00"
//     )
//   )
//   return auth
//     }
// ).then(
//   createEvent 
// )
// .catch(console.error); // then(createEvent)
