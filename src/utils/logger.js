

const LOG_LEVELS = {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
};


const LOG_PATH = process.env.REACT_APP_LOG_PATH;
const isDev = process.env.NODE_ENV === 'development';


const sendLogToRemote = async (LOG_LEVELS, message, meta) => {
    if (!LOG_PATH || !isDev) return;


    try {

        await fetch(LOG_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                level,
                message,
                meta,
                timestamp: new Date().toISOString(),
            }),
        });

    } catch (error) {
        console.error('[Logger] failed to send log: ', error);
    }

}

const log = (level, message, meta = {}) => {
    const formattedMessage = `[${level.toUpperCase()}] ${message}`;

    if (isDev) {
        switch (level) {
            case LOG_LEVELS.INFO:
                console.info(formattedMessage, meta);
                break;
            case LOG_LEVELS.WARN:
                console.warn(formattedMessage, meta);
                break;
            case LOG_LEVELS.ERROR:
                console.error(formattedMessage, meta);
                break;
            default:
                console.log(formattedMessage, meta);
        }
    }
    sendLogToRemote(level, message, meta);
};


const logger = {
    info: (msg, meta) => log(LOG_LEVELS.INFO, msg, meta),
    warn: (msg, meta) => log(LOG_LEVELS.WARN, msg, meta),
    error: (msg, meta) => log(LOG_LEVELS.ERROR, msg, meta),
};

export default logger;


