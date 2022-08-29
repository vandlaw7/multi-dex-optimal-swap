import { fetchNowPools } from "./fetchPoolInfos";
import { findOptimalPath } from "./findOptimalPath";

const main = async () => {
    let startTime, middleTime, endTime;
    startTime = new Date();
    const pools = await fetchNowPools();
    // console.log(pools);

    middleTime = new Date();
    console.log(middleTime - startTime);

    const result = await findOptimalPath(
        '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        10,
        pools
    )
    console.log(result);

    endTime = new Date();
    console.log(endTime - startTime);
};

main();