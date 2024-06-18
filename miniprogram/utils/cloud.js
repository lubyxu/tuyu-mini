const CALL_FUNCTION_SUCCESS_MSG = 'cloud.callFunction:ok'
const CALL_FUNCTION_ERROR = 'CALL_FUNCTION_ERROR'

const callCloudDataBaseCallback = (data) => {
    const { errMsg, result } = data
    if (errMsg !== CALL_FUNCTION_SUCCESS_MSG) {
        throw new Error(CALL_FUNCTION_ERROR)
    }
    return Promise.resolve(result.data)
}

module.exports = {
    CALL_FUNCTION_SUCCESS_MSG,
    CALL_FUNCTION_ERROR,
    callCloudDataBaseCallback,
}