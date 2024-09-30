import { exec } from 'child_process';
export default {
    executeTerminalCommandAsync(command: string): Promise<string>{
        return new Promise((resolve, reject) => {
            console.log(`Executing terminal command: ${command}`);
            exec(command, (err, stdout, stderr) => {
                if (err) {
                    console.error(`Executing terminal command ${command} failed with error: ${err}`);
                    reject(err);
                }
                resolve(stdout);
            });
        });
    }
}


