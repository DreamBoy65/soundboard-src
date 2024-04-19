const { All } = require("./src");
const { writeFile, readFile } = require("fs/promises");

(async () => {
    let readme = await readFile("./.readme.test.md");
    readme = readme.toString();
    let all = await All();

    let array = [];
    for (const cat of all) {
        array.push("# " + cat.cat);

        for (const s of cat.sounds) {
            array.push("+ " + s.name);
        }
    }

    readme = readme
        .replace("{{sounds}}", array.join("\n"))
        .replace("{{date}}", new Date())
        .replace(
            "{{cats}}",
            all
                .map(e => `+ [${e.cat}](#${e.cat}) (${e.sounds.length})`)
                .join("\n")
        )
        .replace(
            "{{sl}}",
            all.map(e => e.sounds.length).reduce((a, b) => a + b)
        );

    await writeFile("./README.md", readme);
})();
