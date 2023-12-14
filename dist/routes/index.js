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
const express_1 = __importDefault(require("express"));
const node_1 = __importStar(require("@workos-inc/node"));
const workos = new node_1.default(process.env.WORKOS_API_KEY);
const router = express_1.default.Router();
let organization;
router.get('/', (req, res) => {
    res.render('index.ejs', {
        title: 'Home',
    });
});
router.post('/provision_enterprise', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const organizationName = req.body.org ? req.body.org : '';
    const domains = req.body.domain ? req.body.domain.split(' ') : [];
    const organizations = yield workos.organizations.listOrganizations({
        domains: domains,
    });
    if (organizations.data.length === 0) {
        organization = yield workos.organizations.createOrganization({
            name: organizationName,
            domains: domains,
        });
        res.render('logged_in.ejs');
    }
    else {
        organization = organizations.data[0];
        res.render('logged_in.ejs');
    }
}));
router.get('/launch_admin_portal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const organizationID = organization.id;
    let intent;
    if (typeof req.query.intent === 'string' &&
        Object.values(node_1.GeneratePortalLinkIntent)
            .map(String)
            .includes(req.query.intent)) {
        intent = req.query.intent;
    }
    else {
        intent = node_1.GeneratePortalLinkIntent.SSO;
    }
    const { link } = yield workos.portal.generateLink({
        organization: organizationID,
        intent: intent,
    });
    res.redirect(link);
}));
exports.default = router;
