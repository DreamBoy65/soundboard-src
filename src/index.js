const { join } = require("path");
const { readdirSync } = require("fs");

module.exports.Get = async function (cat, sound) {
    let sounds = await readdirSync(join(__dirname, `../files/${cat}/`));

    return {
        path: join(
            __dirname,
            `../files/${cat}/${sounds.find(c => c.split(".")[0] === sound)}`
        )
    };
};

module.exports.All = async function () {
    let res = [];
    let cats = await readdirSync(join(__dirname, `../files/`));

    for (const cat of cats) {
        let catSounds = [];
        let sounds = await readdirSync(join(__dirname, `../files/${cat}`));
        for (const sound of sounds.filter(c => c.split(".")[1] === "mp3")) {
            catSounds.push({
                path: join(__dirname, `../files/${cat}/${sound}`),
                name: sound
            });
        }

        res.push({
            cat: cat,
            sounds: catSounds
        });
    }

    console.log(res);
    return res;
};
