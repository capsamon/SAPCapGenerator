const { readFileAsync, writeFileAsync, makeDirectoryAsync } = require("./utils/asyncFSWrapper")
async function asyncWrapper() {
    let params: Array<{paramName: string, paramValue: string}> = [];
    process.argv.forEach((val, index) => {
        if(val.indexOf("--") > -1){
            params.push({paramName: val.replace("--", ""), paramValue: process.argv[index + 1]});
        }
    });
    
    if(!params.find(param => param.paramName === "SERVICENAME") ||
        !params.find(param => param.paramName === "REPOSITORYNAME") || 
        !params.find(param => param.paramName === "DESIREDLOCATION") ||
        !params.find(param => param.paramName === "UAASERVICE")
    ) {
        console.error("Incorrect parameters supplied, please supply SERVICENAME, REPOSITORYNAME, DESIREDLOCATION and UAASERVICE");
        console.error("example: tsx ./Generator.ts --SERVICENAME PRICE_DELTA --REPOSITORYNAME hana_sc_spend --DESIREDLOCATION /test/here --UAASERVICE uaa_pricedelta");
        process.exit();
    };
    
    console.log("\nSupplied parameters: ");
    console.log(params);
    
    console.log("\nStarting file generation...");
    const fileListToCheck: Array<string> = [
        "./templatefiles/server.ts.txt",
        "./templatefiles/package.json",
        "./templatefiles/tsconfig.json",
        "./templatefiles/<SERVICENAME>.cds",
        "./templatefiles/utils/PassportUtils.ts.txt",
        "./templatefiles/utils/GenericProcedureCaller.ts.txt",
        "./templatefiles/utils/DatabaseConnection.ts.txt",
        "./templatefiles/lib/<SERVICENAME>.ts.txt"
    ];

    const desiredLocation = params.find(param => param.paramName === "DESIREDLOCATION")?.paramValue + "/srv";
    const serviceName = params.find(param => param.paramName === "SERVICENAME")?.paramValue;
    const repositoryName = params.find(param => param.paramName === "REPOSITORYNAME")?.paramValue;
    const uaaService = params.find(param => param.paramName === "UAASERVICE")?.paramValue;
    
    const processedList: Array<Promise<{templateLocation: string, desiredLocation: string, fileContent: string}>> = [];
    fileListToCheck.forEach(location => {
        processedList.push(
            new Promise(async (resolve, reject) => {
                console.log(`\nReading file ${location} ...`);
                const fileContent = await readFileAsync(location);
                resolve({ 
                    templateLocation: location, 
                    desiredLocation: location.replaceAll("./templatefiles", desiredLocation).replaceAll("<SERVICENAME>", serviceName).replaceAll("<REPOSITORYNAME>", repositoryName).replaceAll("<UAASERVICE>", uaaService).replace(".txt", ""), 
                    fileContent: fileContent.replaceAll("templatefiles", desiredLocation).replaceAll("<SERVICENAME>", serviceName).replaceAll("<REPOSITORYNAME>", repositoryName).replaceAll("<UAASERVICE>", uaaService) 
                });
            })
        )
    });

    console.log("\nFiles prepared for writing to the desired folder...");
    await Promise.all(processedList);

    console.log("\nCreating directories...");
    await makeDirectoryAsync("/home/user/projects" + desiredLocation);
    await makeDirectoryAsync("/home/user/projects" + desiredLocation + "/lib");
    await makeDirectoryAsync("/home/user/projects" + desiredLocation + "/utils");
    
    const writingPromises: Array<Promise<any>> = [];
    processedList.forEach(promise => promise.then(value => {
        console.log("Starting writing of file: " + value.desiredLocation);
        writingPromises.push(writeFileAsync(value.desiredLocation, value.fileContent));
    }));

    await Promise.all(writingPromises);
    console.log("\nCompleted successfully!");

    console.log("\nWe cannot automate everything, so...");
    console.log("Don't forget to run an npm install, cds build commands and binding of the uaa service.. ;)");
    console.log("There has to be something left for the next innovation sprint, right?");
}

console.log("\nStarting async wrapper...");
asyncWrapper();