import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

import dotenv from "dotenv";
dotenv.config();

const bundleDrop = sdk.getBundleDropModule(
    process.env.APP_BUNDLE_MODULE_ADDRESS,
);

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "Rocket Engine",
                description: "This NFT will give you access to SpaceDAO!",
                image: readFileSync("scripts/assets/RocketEngine.jpg"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
})()