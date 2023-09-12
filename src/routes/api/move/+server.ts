import { error, json } from '@sveltejs/kit';
import path from 'path';
import fse from "fs-extra";

export async function POST(event) {
    const body = await event.request.json();
    const from = path.join(process.cwd(), "/files", body.from);
    const to = path.join(process.cwd(), "/files", body.to);
    console.log({ from, to });

    try {
        console.log("Moving it.")
        await fse.move(from, to, {overwrite: true});
    } catch (err) {
        console.error({err});
        throw error(500, "Something went wrong");
    }
    // fs.rename(from, to, function (err) {
    //     if (err) throw err
    //     console.log('Successfully renamed - AKA moved!')
    //   })
    return json({ error: false });
}