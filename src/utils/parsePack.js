const parsePack = (str) => {
    const pattern = /data:\s*({.*?})\s*\n/g;
    const result = [];
    let match;
    while ((match = pattern.exec(str)) !== null) {
        const jsonStr = match[1];
        try {
            const json = JSON.parse(jsonStr);
            result.push(json);
        } catch (e) {
            console.log(e);
        }
    }
    return result;
};

module.exports = parsePack;
