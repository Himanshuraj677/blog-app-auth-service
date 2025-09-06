import { createAccessControl } from "better-auth/plugins/access";
 import {defaultStatements, adminAc} from "better-auth/plugins/admin/access"

const statement = { 
    ...defaultStatements,
    blog: ["create", "read", "share", "update", "delete"],
    user: ["view", "create", "update", "delete"],
    comment: ["view", "create", "update", "delete"]

} as const; 
 
export const ac = createAccessControl(statement); 


const admin = ac.newRole({
    ...adminAc.statements, 
    blog: ["create", "read", "share", "update", "delete"],
    user: ["view", "create", "update", "delete"],
    comment: ["view", "create", "update", "delete"]
})

const editor = ac.newRole({
    blog: ["create", "read", "share", "update", "delete"],
    comment: ["view", "create", "update", "delete"]
})

const author = ac.newRole({
    blog: ["create", "read", "share"],
    comment: ["view", "create"]
})

export const APP_ROLES = {
    admin,
    editor,
    author
}

