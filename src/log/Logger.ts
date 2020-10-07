import chalk from "chalk";
import logSymbols from "log-symbols";

const chalkClient: chalk.Chalk = chalk.bold.underline.italic;
class Logger {
    public success(m: string) {
        console.log(`${logSymbols.success} ${chalkClient.green(m)}`);
    };
    public info(m: string) {
        console.log(`${logSymbols.info} ${chalkClient.blue(m)}`);
    };
    public warn(m: string) {
        console.log(`${logSymbols.warning} ${chalkClient.yellow(m)}`);
    };
    public error(m: string) {
        console.log(`${logSymbols.error} ${chalkClient.red(m)}`);
    };

};
export default Logger;