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
        '0xd41fdb03ba84762dd66a0af1a6c8540ff1ba5dfb',
        '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        10,
        pools
    )
    console.log(result);

    endTime = new Date();
    console.log(endTime - startTime);
};

main();