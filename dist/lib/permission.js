"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_ROLES = exports.ac = void 0;
const access_1 = require("better-auth/plugins/access");
const access_2 = require("better-auth/plugins/admin/access");
const statement = {
    ...access_2.defaultStatements,
    blog: ["create", "read", "share", "update", "delete"],
    user: ["view", "create", "update", "delete"],
    comment: ["view", "create", "update", "delete"]
};
exports.ac = (0, access_1.createAccessControl)(statement);
const admin = exports.ac.newRole({
    ...access_2.adminAc.statements,
    blog: ["create", "read", "share", "update", "delete"],
    user: ["view", "create", "update", "delete"],
    comment: ["view", "create", "update", "delete"]
});
const editor = exports.ac.newRole({
    blog: ["create", "read", "share", "update", "delete"],
    comment: ["view", "create", "update", "delete"]
});
const author = exports.ac.newRole({
    blog: ["create", "read", "share"],
    comment: ["view", "create"]
});
exports.APP_ROLES = {
    admin,
    editor,
    author
};
