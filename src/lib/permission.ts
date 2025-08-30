import { createAccessControl } from "better-auth/plugins/access";
 import {defaultStatements, adminAc} from "better-auth/plugins/admin/access"

const statement = { 
    ...defaultStatements,
    blog: ["create", "read", "share", "update", "delete"],
    user: ["view", "update"]

} as const; 
 
export const ac = createAccessControl(statement); 


const admin = ac.newRole({
    ...adminAc.statements, 
    blog: ["create", "read", "share", "update", "delete"],
    user: ["view", "update"]
})

const editor = ac.newRole({
    blog: ["create", "read", "share", "update", "delete"],
})

const author = ac.newRole({
    blog: ["create", "read", "share"]
})

export const APP_ROLES = {
    admin,
    editor,
    author
}

