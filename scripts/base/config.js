var CONFIG = {
    // mode : 'release',
    mode : 'develop',
    root : {
        site : 'm.kgcrm.net',
        api  : 'api.kgcrm.net',
        cdn : '7ximo5.com1.z0.glb.clouddn.com',
        cdnAvatar : '7xj1dh.com1.z0.glb.clouddn.com'
    },
    appId : 'wxb52a82ef7899c308',
    version : '1.2'
};

if (CONFIG.mode === 'develop') {
    CONFIG.version = new Date().getTime();
}