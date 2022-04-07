import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

import dotenv from "dotenv";
dotenv.config();

const editionDrop = sdk.getEditionDrop(process.env.EDITION_DROP_ADDRESS);

(async () => {
    try {
        await editionDrop.createBatch([
            {
                name: "Calculus NFT",
                description: "This NFT is a credential earned by knowing some calculus.",
                image: readFileSync("scripts/assets/CalculusNFT.png"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
})();





