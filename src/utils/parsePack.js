const multipleAction = (str) => {
    const dataArray = []
    const regex = /data:\s*({[^}]+})/g;
    let match;

    while ((match = regex.exec(str)) !== null) {
        const dataObject = match[1];
        dataArray.push(JSON.parse(dataObject));
    }

    return dataArray;
};

module.exports = multipleAction;
