'use strict';

/* -------------------------------------------------------------------------------------------------
 * getDisplayName
 * -----------------------------------------------------------------------------------------------*/ /**
 * Retrieves the display name of an admin panel user
 */ const getDisplayName = ({ firstname, lastname, username, email } = {})=>{
    if (username) {
        return username;
    }
    // firstname is not required if the user is created with a username
    if (firstname) {
        return `${firstname} ${lastname ?? ''}`.trim();
    }
    return email ?? '';
};
/* -------------------------------------------------------------------------------------------------
 * hashAdminUserEmail
 * -----------------------------------------------------------------------------------------------*/ const hashAdminUserEmail = async (payload)=>{
    if (!payload || !payload.email) {
        return null;
    }
    try {
        return await digestMessage(payload.email);
    } catch (error) {
        return null;
    }
};
const bufferToHex = (buffer)=>{
    return [
        ...new Uint8Array(buffer)
    ].map((b)=>b.toString(16).padStart(2, '0')).join('');
};
const digestMessage = async (message)=>{
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    return bufferToHex(hashBuffer);
};

exports.getDisplayName = getDisplayName;
exports.hashAdminUserEmail = hashAdminUserEmail;
//# sourceMappingURL=users.js.map
